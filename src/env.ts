import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_NAME: z.string().min(1),
        DATABASE_HOST: z.string().min(1),
        DATABASE_USERNAME: z.string().min(1),
        DATABASE_PASSWORD: z.string().min(1),
        DATABASE_URL: z.string().min(1),
        ENCRYPTION_KEY: z.string().length(128),
        GITHUB_CLIENT_ID: z.string().min(1),
        GITHUB_CLIENT_SECRET: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG: z.string().min(1),
        NEXT_PUBLIC_OPENAI_GPT_MODELS: z
            .string()
            .min(1)
            .transform((s) => JSON.parse(s) as unknown)
            .transform((s) =>
                z
                    .object({
                        name: z.string().min(1),
                        model: z.string().min(1),
                    })
                    .array()
                    .parse(s),
            ),
    },
    runtimeEnv: {
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_URL: process.env.DATABASE_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG,
        NEXT_PUBLIC_OPENAI_GPT_MODELS: process.env.NEXT_PUBLIC_OPENAI_GPT_MODELS,
    },
});
