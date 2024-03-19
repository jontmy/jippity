import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { messageTable } from "@/lib/models/message/schemas";
import { sessionTable } from "@/lib/models/session/schemas";
import { sqliteTable } from "@/lib/models/utils";
import { accountTable } from "@/lib/models/account/schemas";
import { text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email"),
    picture: text("picture"),
    createdAt: text("created_at")
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
