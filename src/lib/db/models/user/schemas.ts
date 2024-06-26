import { relations } from "drizzle-orm";
import { chatTable } from "@/lib/db/models/chat/schemas";
import { messageTable } from "@/lib/db/models/message/schemas";
import { sessionTable } from "@/lib/db/models/session/schemas";
import { table } from "@/lib/db/models/utils";
import { accountTable } from "@/lib/db/models/account/schemas";
import { char, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = table("user", {
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
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(userTable, ({ many }) => ({
    chats: many(chatTable),
    messages: many(messageTable),
    sessions: many(sessionTable),
    accounts: many(accountTable),
}));

export type TUser = typeof userTable.$inferSelect;
export type TNewUser = typeof userTable.$inferInsert;
