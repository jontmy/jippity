import "dotenv/config";
import { resolve } from "node:path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "../db";

async function main() {
    try {
        await migrate(db, { migrationsFolder: resolve(__dirname, "./migrations") });
        console.log("Migration successful!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

void main();
