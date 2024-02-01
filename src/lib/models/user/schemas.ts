import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { messageTable } from "@/lib/models/message/schemas";
import { char, datetime, varchar } from "drizzle-orm/mysql-core";
import { sessionTable } from "@/lib/models/session/schemas";
import { mysqlTable } from "@/lib/models/utils";

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
    createdAt: datetime("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(userTable, ({ many }) => ({
    chats: many(chatTable),
    messages: many(messageTable),
    sessions: many(sessionTable),
}));

export type TUser = typeof userTable.$inferSelect;
export type TNewUser = typeof userTable.$inferInsert;
