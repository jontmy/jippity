import { sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { generateId as internal_generateId } from "lucia";

export const sqliteTable = sqliteTableCreator((name) => `jippity_${name}`);

export const generateId = () => internal_generateId(16);
