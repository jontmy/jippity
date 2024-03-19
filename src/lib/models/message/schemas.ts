import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { text } from "drizzle-orm/sqlite-core";
import { userTable } from "@/lib/models/user/schemas";
import { generateId, sqliteTable } from "@/lib/models/utils";

export const messageTable = sqliteTable("message", {
    id: text("id").primaryKey().$defaultFn(generateId),
    chatId: text("chat_id")
        .notNull()
        .references(() => chatTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    content: text("content").notNull(),
    role: text("message_role", { enum: ["user", "assistant"] }).notNull(),
    createdAt: text("created_at")
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
