import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/env";
import * as chat from "@/lib/models/chat/schemas";
import * as message from "@/lib/models/message/schemas";
import * as user from "@/lib/models/user/schemas";
import * as session from "@/lib/models/session/schemas";

const connection = connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, {
    schema: {
        ...chat,
        ...message,
        ...user,
        ...session,
    },
});
