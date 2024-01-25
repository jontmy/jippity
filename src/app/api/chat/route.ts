import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages, apiKey } = (await req.json()) as {
        messages: Array<ChatCompletionMessageParam>;
        apiKey: string;
    };
    const openai = new OpenAI({
        apiKey,
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        stream: true,
        messages,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
