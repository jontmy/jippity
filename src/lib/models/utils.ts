import { mysqlTableCreator } from "drizzle-orm/mysql-core";
import { generateId as internal_generateId } from "lucia";

export const mysqlTable = mysqlTableCreator((name) => `jippity_${name}`);

export const generateId = () => internal_generateId(16);
