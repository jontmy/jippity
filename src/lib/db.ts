import * as chat from "@/lib/models/chat/schemas";
import * as message from "@/lib/models/message/schemas";
import * as user from "@/lib/models/user/schemas";
import * as account from "@/lib/models/account/schemas";
import * as session from "@/lib/models/session/schemas";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "@/env";

const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(pool, {
    schema: {
        ...chat,
        ...message,
        ...user,
        ...account,
        ...session,
    },
});
