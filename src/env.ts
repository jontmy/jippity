import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_HOST: z.string().min(1),
        DATABASE_USERNAME: z.string().min(1),
        DATABASE_PASSWORD: z.string().min(1),
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
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG,
        NEXT_PUBLIC_OPENAI_GPT_MODELS: process.env.NEXT_PUBLIC_OPENAI_GPT_MODELS,
    },
});
