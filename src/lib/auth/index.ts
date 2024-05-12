import "server-only";

import { Lucia, type Session, type User } from "lucia";
import { GitHub, Google } from "arctic";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/lib/db";
import { env } from "@/env";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { userTable } from "@/lib/db/models/user/schemas";
import { sessionTable } from "@/lib/db/models/session/schemas";

declare module "lucia" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: {
            provider: string;
        };
        DatabaseUserAttributes: {
            username: string;
        };
    }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getSessionAttributes: (attributes) => {
        return {
            provider: attributes.provider,
        };
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
        };
    },
});

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET);

export const google = new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    `${env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/google/callback`,
);

export const auth = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);
        // Next.js throws when you attempt to set cookie when rendering a page
        try {
            if (result.session?.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch {}
        return result;
    },
);

export async function signOut() {
    "use server";
    const { session } = await auth();
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    cookies().delete("github_oauth_state");
    cookies().delete("google_oauth_state");
    cookies().delete("google_oauth_code_verifier");
    cookies().delete("google_oauth_refresh_token");

    revalidatePath("/");
    return redirect("/");
}
