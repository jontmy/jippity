import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
    schema: "./src/lib/models/**/schemas.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["jippity_*"],
});
