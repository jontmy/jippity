import { relations } from "drizzle-orm";
import { userTable } from "@/lib/models/user/schemas";
import { char, datetime, varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "@/lib/models/utils";

export const sessionTable = mysqlTable("session", {
    id: varchar("id", {
        length: 40,
    }).primaryKey(),
    userId: char("user_id", {
        length: 16,
    })
        .notNull()
        .references(() => userTable.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    expiresAt: datetime("expires_at").notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id],
    }),
}));

export type TSession = typeof sessionTable.$inferSelect;
export type TNewSession = typeof sessionTable.$inferInsert;
