import "server-only";

import { Lucia, type Session, type User } from "lucia";
import { GitHub } from "arctic";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/lib/db";
import { env } from "@/env";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { userTable } from "@/lib/models/user/schemas";
import { sessionTable } from "@/lib/models/session/schemas";

declare module "lucia" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

type DatabaseUserAttributes = {
    github_id: number;
    username: string;
};

const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            githubId: attributes.github_id,
            username: attributes.username,
        };
    },
});

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET);

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
            if (result.session && result.session.fresh) {
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
    revalidatePath("/");
    return redirect("/");
}
