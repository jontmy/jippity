import { relations } from "drizzle-orm";
import { userTable } from "@/lib/db/models/user/schemas";
import { table } from "@/lib/db/models/utils";
import { char, timestamp, varchar } from "drizzle-orm/pg-core";

export const sessionTable = table("session", {
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
    provider: varchar("provider", {
        enum: ["GitHub", "Google"],
    }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id],
    }),
}));

export type TSession = typeof sessionTable.$inferSelect;
export type TNewSession = typeof sessionTable.$inferInsert;
