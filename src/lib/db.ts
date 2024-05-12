import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";
import { Client } from "pg";
import * as chat from "@/lib/models/chat/schemas";
import * as message from "@/lib/models/message/schemas";
import * as user from "@/lib/models/user/schemas";
import * as account from "@/lib/models/account/schemas";
import * as session from "@/lib/models/session/schemas";

const client = new Client({
    connectionString: env.DATABASE_URL,
});
await client.connect();

export const db = drizzle(client, {
    schema: {
        ...chat,
        ...message,
        ...user,
        ...account,
        ...session,
    },
});
