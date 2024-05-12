import { relations } from "drizzle-orm";
import { messageTable } from "@/lib/db/models/message/schemas";
import { userTable } from "@/lib/db/models/user/schemas";
import { generateId, table } from "@/lib/db/models/utils";
import { char, timestamp } from "drizzle-orm/pg-core";

export const chatTable = table("chat", {
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
    createdAt: timestamp("created_at").notNull().defaultNow(),
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
