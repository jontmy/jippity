import { char, datetime } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { messageTable } from "@/lib/models/message/schemas";
import { userTable } from "@/lib/models/user/schemas";
import { generateId, mysqlTable } from "@/lib/models/utils";

export const chatTable = mysqlTable("chat", {
    id: char("id", {
        length: 16,
    })
        .primaryKey()
        .$defaultFn(generateId),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    createdAt: datetime("created_at")
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
