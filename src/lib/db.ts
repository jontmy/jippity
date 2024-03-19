import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as chat from "@/lib/models/chat/schemas";
import * as message from "@/lib/models/message/schemas";
import * as user from "@/lib/models/user/schemas";
import * as account from "@/lib/models/account/schemas";
import * as session from "@/lib/models/session/schemas";

const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
});

export const db = drizzle(client, {
    schema: {
        ...chat,
        ...message,
        ...user,
        ...account,
        ...session,
    },
});
