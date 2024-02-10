import { relations, sql } from "drizzle-orm";
import { char, datetime, mysqlEnum, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "@/lib/models/utils";
import { userTable } from "@/lib/models/user/schemas";

export const accountTable = mysqlTable(
    "account",
    {
        provider: mysqlEnum("account_provider", ["GitHub", "Google"]).notNull(),
        providerUserId: varchar("github_id", {
            length: 40,
        }).notNull(),
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
    },
    (table) => {
        return {
            primaryKey: primaryKey({
                columns: [table.provider, table.providerUserId],
            }),
        };
    },
);

export const accountRelations = relations(accountTable, ({ one }) => ({
    user: one(userTable, {
        fields: [accountTable.userId],
        references: [userTable.id],
    }),
}));

export type TAccount = typeof accountTable.$inferSelect;
export type TNewAccount = typeof accountTable.$inferInsert;
