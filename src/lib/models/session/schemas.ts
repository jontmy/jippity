import { relations } from "drizzle-orm";
import { userTable } from "@/lib/models/user/schemas";
import { sqliteTable } from "@/lib/models/utils";
import { integer, text } from "drizzle-orm/sqlite-core";

export const sessionTable = sqliteTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    provider: text("provider", { enum: ["GitHub", "Google"] }).notNull(),
    expiresAt: integer("expires_at").notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id],
    }),
}));

export type TSession = typeof sessionTable.$inferSelect;
export type TNewSession = typeof sessionTable.$inferInsert;
