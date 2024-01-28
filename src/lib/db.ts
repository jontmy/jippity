import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/env";
import { char, datetime, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core";
import { generateId as internal_generateId } from "lucia";

const connection = connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
});

export const mysqlTable = mysqlTableCreator((name) => `jippity_${name}`);

export const generateId = () => internal_generateId(16);

export const userTable = mysqlTable("user", {
    id: char("id", {
        length: 16,
    }).primaryKey(),
    githubId: varchar("github_id", {
        length: 40,
    }).notNull(),
    username: varchar("username", {
        length: 32,
    }).notNull(),
});

export type TUser = typeof userTable.$inferSelect;
export type TNewUser = typeof userTable.$inferInsert;

export const sessionTable = mysqlTable("session", {
    id: varchar("id", {
        length: 40,
    }).primaryKey(),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id),
    expiresAt: datetime("expires_at").notNull(),
});

export type TSession = typeof sessionTable.$inferSelect;
export type TNewSession = typeof sessionTable.$inferInsert;

export const db = drizzle(connection, {
    schema: {
        ...userTable,
        ...sessionTable,
    },
});
