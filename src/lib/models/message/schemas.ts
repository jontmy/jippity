import { relations, sql } from "drizzle-orm";
import { chatTable } from "@/lib/models/chat/schemas";
import { userTable } from "@/lib/models/user/schemas";
import { generateId, table } from "@/lib/models/utils";
import { char, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messageTable = table("message", {
    id: char("id", {
        length: 16,
    })
        .primaryKey()
        .$defaultFn(generateId),
    chatId: char("chat_id", {
        length: 16,
    })
        .notNull()
        .references(() => chatTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    content: text("content").notNull(),
    role: varchar("message_role", {
        enum: ["user", "assistant"],
    }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
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
