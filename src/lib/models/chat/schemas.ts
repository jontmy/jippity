import { relations, sql } from "drizzle-orm";
import { messageTable } from "@/lib/models/message/schemas";
import { userTable } from "@/lib/models/user/schemas";
import { generateId, sqliteTable } from "@/lib/models/utils";
import { text } from "drizzle-orm/sqlite-core";

export const chatTable = sqliteTable("chat", {
    id: text("id").primaryKey().$defaultFn(generateId),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    createdAt: text("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const chatRelations = relations(chatTable, ({ one, many }) => ({
    messages: many(messageTable),
    user: one(userTable, {
        fields: [chatTable.userId],
        references: [userTable.id],
    }),
}));

export type TChat = typeof chatTable.$inferSelect;
export type TNewChat = typeof chatTable.$inferInsert;
