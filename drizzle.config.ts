import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
    schema: "./src/lib/models/**/schemas.ts",
    driver: "mysql2",
    dbCredentials: {
        uri: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["jippity_*"],
});
