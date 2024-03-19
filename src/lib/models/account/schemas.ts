import { relations, sql } from "drizzle-orm";
import { sqliteTable } from "@/lib/models/utils";
import { userTable } from "@/lib/models/user/schemas";
import { primaryKey, text } from "drizzle-orm/sqlite-core";

export const accountTable = sqliteTable(
    "account",
    {
        provider: text("account_provider", { enum: ["github", "google"] }).notNull(),
        providerUserId: text("github_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => userTable.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
        createdAt: text("created_at")
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
