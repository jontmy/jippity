import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
    schema: "./src/lib/models/**/schemas.ts",
    driver: "turso",
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_TOKEN,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["jippity_*"],
});
