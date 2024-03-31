import { relations, sql } from "drizzle-orm";
import { char, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { table } from "@/lib/models/utils";
import { userTable } from "@/lib/models/user/schemas";

export const accountTable = table(
    "account",
    {
        provider: varchar("account_provider", { enum: ["github", "google"] }).notNull(),
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
        createdAt: timestamp("created_at")
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
