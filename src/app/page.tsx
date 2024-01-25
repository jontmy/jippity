"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [apiKey, setApiKey] = useState("");
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey,
        },
    });
    return (
        <div className="relative flex w-full max-w-prose grow flex-col justify-between">
            <div className="flex flex-col gap-6">
                {messages.map((m) => (
                    <div className="flex flex-col gap-2" key={m.id}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                            {m.role === "user" ? "You" : "GPT"}
                        </div>
                        <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="fixed bottom-6 left-0 flex w-full items-center justify-center px-6 sm:px-8"
            >
                <div className="grid w-full max-w-prose grow grid-cols-[1fr,auto] gap-2">
                    <Input
                        value={apiKey}
                        type="password"
                        placeholder="OpenAI API key"
                        onChange={(e) => setApiKey(e.target.value)}
                        className="col-span-full w-1/2 bg-white text-xs placeholder:text-sm"
                    />
                    <Input
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                        className="bg-white"
                    />
                    <Button type="submit" disabled={!input || !apiKey} className="shrink-0">
                        <ArrowUpIcon />
                    </Button>
                </div>
            </form>
        </div>
    );
}
