import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";

import * as chat from "@/lib/models/chat/schemas";
import * as message from "@/lib/models/message/schemas";
import * as user from "@/lib/models/user/schemas";
import * as account from "@/lib/models/account/schemas";
import * as session from "@/lib/models/session/schemas";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
    schema: {
        ...chat,
        ...message,
        ...user,
        ...account,
        ...session,
    },
});
