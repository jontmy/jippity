import { pgTableCreator } from "drizzle-orm/pg-core";
import { generateId as internal_generateId } from "lucia";

export const table = pgTableCreator((name) => `jippity_${name}`);

export const generateId = () => internal_generateId(16);
