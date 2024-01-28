import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createMessage } from "@/app/(homepage)/actions";
import { z } from "zod";

export const runtime = "edge";

const RequestSchema = z.object({
    messages: z
        .object({
            content: z.string(),
            role: z.enum(["user", "assistant"]),
        })
        .array()
        .min(1),
    chatId: z.string(),
    apiKey: z.string(),
    model: z.string(),
});

export async function POST(req: Request) {
    const { messages, apiKey, model, chatId } = RequestSchema.parse(await req.json());
    const openai = new OpenAI({
        apiKey,
    });
    const response = await openai.chat.completions.create({
        model,
        stream: true,
        messages,
    });
    const stream = OpenAIStream(response, {
        onCompletion: async (s) => {
            await createMessage({
                chatId,
                content: s,
                role: "assistant",
            });
        },
    });
    return new StreamingTextResponse(stream);
}
