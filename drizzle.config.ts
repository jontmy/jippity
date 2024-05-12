import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/models/**/schemas.ts",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["jippity_*"],
});
