import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { char, datetime, mysqlEnum, text } from "drizzle-orm/mysql-core";
import { userTable } from "@/lib/models/user/schemas";
import { generateId, mysqlTable } from "@/lib/models/utils";

export const messageTable = mysqlTable("message", {
    id: char("id", {
        length: 16,
    })
        .primaryKey()
        .$defaultFn(generateId),
    chatId: char("chat_id", {
        length: 16,
    })
        .notNull()
        .references(() => chatTable.id),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id),
    content: text("content").notNull(),
    role: mysqlEnum("message_role", ["user", "assistant"]).notNull(),
    createdAt: datetime("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const messageRelations = relations(messageTable, ({ one }) => ({
    chat: one(chatTable, {
        fields: [messageTable.chatId],
        references: [chatTable.id],
    }),
    user: one(userTable, {
        fields: [messageTable.userId],
        references: [userTable.id],
    }),
}));

export type TMessage = typeof messageTable.$inferSelect;
export type TNewMessage = typeof messageTable.$inferInsert;
