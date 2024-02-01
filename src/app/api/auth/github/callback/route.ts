import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { userTable } from "@/lib/models/user/schemas";
import { generateId } from "@/lib/models/utils";
import { accountTable } from "@/lib/models/account/schemas";

type GitHubUser = {
    id: string;
    login: string;
};

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser = (await githubUserResponse.json()) as GitHubUser;
        const [existingAccount] = await db
            .select()
            .from(accountTable)
            .where(
                and(
                    eq(accountTable.provider, "github"),
                    eq(accountTable.providerUserId, githubUser.id),
                ),
            )
            .limit(1);

        if (existingAccount) {
            const session = await lucia.createSession(existingAccount.userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        const userId = generateId();
        await db.transaction(async (trx) => {
            await trx.insert(userTable).values({
                id: userId,
                username: githubUser.login,
            });
            await trx.insert(accountTable).values({
                provider: "github",
                providerUserId: githubUser.id,
                userId,
            });
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}
