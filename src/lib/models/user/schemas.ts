import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { messageTable } from "@/lib/models/message/schemas";
import { char, datetime, varchar } from "drizzle-orm/mysql-core";
import { sessionTable } from "@/lib/models/session/schemas";
import { mysqlTable } from "@/lib/models/utils";
import { accountTable } from "@/lib/models/account/schemas";

export const userTable = mysqlTable("user", {
    id: char("id", {
        length: 16,
    }).primaryKey(),
    username: varchar("username", {
        length: 32,
    }).notNull(),
    email: varchar("email", {
        length: 255,
    }),
    picture: varchar("picture", {
        length: 255,
    }),
    createdAt: datetime("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(userTable, ({ many }) => ({
    chats: many(chatTable),
    messages: many(messageTable),
    sessions: many(sessionTable),
    accounts: many(accountTable),
}));

export type TUser = typeof userTable.$inferSelect;
export type TNewUser = typeof userTable.$inferInsert;
