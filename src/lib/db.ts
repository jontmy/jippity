import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/env";
import {
    char,
    datetime,
    mysqlEnum,
    mysqlTableCreator,
    text,
    varchar,
} from "drizzle-orm/mysql-core";
import { generateId as internal_generateId } from "lucia";
import { relations, sql } from "drizzle-orm";

const connection = connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
});

export const mysqlTable = mysqlTableCreator((name) => `jippity_${name}`);

export const generateId = () => internal_generateId(16);

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
        .references(() => userTable.id),
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

export type TChat = typeof chatTable.$inferSelect;
export type TNewChat = typeof chatTable.$inferInsert;

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

export const sessionTable = mysqlTable("session", {
    id: varchar("id", {
        length: 40,
    }).primaryKey(),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id),
    expiresAt: datetime("expires_at").notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable),
}));

export type TSession = typeof sessionTable.$inferSelect;
export type TNewSession = typeof sessionTable.$inferInsert;

export const db = drizzle(connection, {
    schema: {
        chatTable,
        chatRelations,
        messageTable,
        messageRelations,
        userTable,
        userRelations,
        sessionTable,
        sessionRelations,
    },
});
