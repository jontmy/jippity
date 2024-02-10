import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { userTable } from "@/lib/models/user/schemas";
import { generateId } from "@/lib/models/utils";
import { accountTable } from "@/lib/models/account/schemas";

type GoogleUser = {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
};

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const storedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;
    const storedRefreshToken = cookies().get("google_oauth_refresh_token")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = storedRefreshToken
            ? await google.refreshAccessToken(storedRefreshToken)
            : await google.validateAuthorizationCode(code, storedCodeVerifier);

        if ("refreshToken" in tokens && !!tokens.refreshToken) {
            cookies().set("google_oauth_refresh_token", tokens.refreshToken as string, {
                path: "/",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365, // 1 year
            });
        }

        const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const googleUser = (await googleUserResponse.json()) as GoogleUser;
        const [existingAccount] = await db
            .select()
            .from(accountTable)
            .where(
                and(
                    eq(accountTable.provider, "Google"),
                    eq(accountTable.providerUserId, googleUser.sub),
                ),
            )
            .limit(1);

        if (existingAccount) {
            const session = await lucia.createSession(existingAccount.userId, {
                provider: "Google",
            });
            const sessionCookie = lucia.createSessionCookie(session.id);
            console.log(session);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        if (!googleUser.name) {
            return new Response(null, {
                status: 400,
            });
        }

        const userId = generateId();
        await db.transaction(async (trx) => {
            await trx.insert(userTable).values({
                id: userId,
                username: googleUser.name!,
                email: googleUser.email,
                picture: googleUser.picture,
            });
            await trx.insert(accountTable).values({
                provider: "Google",
                providerUserId: googleUser.sub,
                userId,
            });
        });

        const session = await lucia.createSession(userId, {
            provider: "Google",
        });
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
