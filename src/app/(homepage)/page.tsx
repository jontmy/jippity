"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, GearIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Bot } from "lucide-react";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createMessage } from "@/app/(homepage)/actions";
import { flushSync } from "react-dom";
import { Message } from "@/components/message";

export default function Home() {
    const [chatId, setChatId] = useState<string>();
    const [apiKey] = useLocalStorage("openai-api-key", "");
    const [gptModel, setGptModel] = useLocalStorage(
        "openai-gpt-model",
        env.NEXT_PUBLIC_OPENAI_GPT_MODELS[0]?.model,
    );
    useEffect(() => {
        if (
            !gptModel ||
            !env.NEXT_PUBLIC_OPENAI_GPT_MODELS.map((m) => m.model).includes(gptModel)
        ) {
            setGptModel(env.NEXT_PUBLIC_OPENAI_GPT_MODELS[0]?.model);
        }
    }, [gptModel, setGptModel]);
    const {
        messages: messages,
        input,
        handleInputChange,
        handleSubmit: handleChatSubmit,
    } = useChat({
        body: {
            chatId,
            apiKey,
            model: gptModel,
        },
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!chatId) {
            const newChatId = await createMessage({
                content: input,
                role: "user",
            });
            flushSync(() => {
                setChatId(newChatId);
            });
        } else {
            void createMessage({
                chatId,
                content: input,
                role: "user",
            });
        }
        handleChatSubmit(e);
    }

    return (
        <div className="relative flex w-full max-w-prose grow flex-col justify-between gap-4">
            <div className="scroller flex flex-col gap-6 overflow-x-auto">
                <ClientOnly>
                    {!apiKey && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <Bot size={20} />
                                System
                            </div>
                            <p className="whitespace-pre-wrap">Please set an API key.</p>
                            <Button
                                className="my-2 flex max-w-64 items-center gap-2 bg-zinc-800 hover:bg-zinc-700"
                                asChild
                            >
                                <Link href="/settings">
                                    <GearIcon />
                                    Go to settings
                                </Link>
                            </Button>
                        </div>
                    )}
                </ClientOnly>
                {messages.map((m) => (
                    <Message key={m.id} {...m} />
                ))}
                <div className="scroller-anchor" />
            </div>
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 flex w-full items-center justify-center px-6 sm:relative sm:px-8"
            >
                <div className="flex w-full max-w-prose grow gap-2">
                    <ClientOnly fallback={<Skeleton className="h-10 w-full md:h-9" />}>
                        <Input
                            value={input}
                            placeholder="Say something..."
                            onChange={handleInputChange}
                            className="bg-white dark:bg-zinc-700"
                            disabled={!apiKey}
                        />
                    </ClientOnly>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="submit"
                                    disabled={!input || !apiKey}
                                    className="h-10 shrink-0 bg-zinc-900 text-zinc-50 transition-all dark:bg-zinc-100 dark:text-zinc-950 md:h-9"
                                    aria-label="Send message"
                                >
                                    <ArrowUpIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send message</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </form>
        </div>
    );
}
