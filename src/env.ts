import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        DATABASE_ENCRYPTION_KEY: z.string().length(128),
        GITHUB_CLIENT_ID: z.string().min(1),
        GITHUB_CLIENT_SECRET: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_FRONTEND_URL: z.string().min(1).url(),
        NEXT_PUBLIC_JIPPITY_REPO_URL: z.string().min(1).url(),
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
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_ENCRYPTION_KEY: process.env.DATABASE_ENCRYPTION_KEY,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
        NEXT_PUBLIC_JIPPITY_REPO_URL: process.env.NEXT_PUBLIC_JIPPITY_REPO_URL,
        NEXT_PUBLIC_OPENAI_GPT_MODELS: process.env.NEXT_PUBLIC_OPENAI_GPT_MODELS,
    },
});
