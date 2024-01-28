"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, GearIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
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
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey,
            model: gptModel,
        },
    });
    return (
        <div className="flex w-full max-w-prose grow flex-col justify-between gap-4">
            <div className="scroller flex flex-col gap-6">
                <ClientOnly>
                    {!apiKey && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <Bot size={20} />
                                System
                            </div>
                            <p className="whitespace-pre-wrap">Please set an API key.</p>
                        </div>
                    )}
                </ClientOnly>
                {messages.map((m) => (
                    <div className="flex flex-col gap-2" key={m.id}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                            {m.role === "user"
                                ? "You"
                                : m.name ??
                                  env.NEXT_PUBLIC_OPENAI_GPT_MODELS.find(
                                      (m) => m.model === gptModel,
                                  )?.name}
                        </div>
                        <Markdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
                            className="space-y-4 *:space-y-4"
                        >
                            {m.content
                                .replaceAll("\\(", "$$")
                                .replaceAll("\\)", "$$")
                                .replaceAll("\\[", "\n$$")
                                .replaceAll("\\]", "$$\n")
                                .replaceAll("\\begin{align}", "\\begin{aligned}")
                                .replaceAll("\\end{align}", "\\end{aligned}")}
                        </Markdown>
                    </div>
                ))}
                <div className="scroller-anchor" />
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-center justify-center px-6 sm:px-8"
            >
                <div className="flex w-full max-w-prose grow gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="relative h-10 w-12 shrink-0 dark:bg-zinc-700/50 hover:dark:bg-zinc-700 md:h-9"
                                    aria-label="Set API key"
                                    asChild
                                >
                                    <Link href="/settings">
                                        <GearIcon />
                                        <ClientOnly>
                                            {!apiKey && (
                                                <>
                                                    <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75" />
                                                    <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-sky-500" />
                                                </>
                                            )}
                                        </ClientOnly>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
