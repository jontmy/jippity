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

    // const messages = [
    //     {
    //         content: "What is a differential equation?",
    //         role: "user",
    //         createdAt: "2024-01-28T12:36:50.487Z",
    //         id: "FdWh2KD",
    //     },
    //     {
    //         id: "Pdxx11v",
    //         createdAt: "2024-01-28T12:36:51.659Z",
    //         content:
    //             "A differential equation is a mathematical equation that relates a function with one or more of its derivatives. The derivatives represent the rates of change of the function with respect to one or more variables. Differential equations are fundamental in describing various phenomena in fields like physics, engineering, biology, economics, and many more, essentially anywhere a deterministic relationship between variables exists that involves rates of change.\n\nThere are several types of differential equations, primarily categorized based on their characteristics, such as:\n\n1. **Ordinary Differential Equations (ODEs)**: These involve functions of a single variable and their derivatives. The order of a differential equation is determined by the highest derivative it contains. An example is \\( \\frac{dy}{dx} = y \\), representing exponential growth or decay, depending on the initial condition.\n\n2. **Partial Differential Equations (PDEs)**: These involve functions of multiple variables and their partial derivatives. An example is the heat equation, \\( \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2} \\), which describes how the distribution of heat (\\( u \\)) in a given region changes over time (\\( t \\)).\n\nDifferential equations can also be classified based on their linearity:\n- **Linear Differential Equations**: The dependent variable and all its derivatives appear to the power of one (linearly) and are not multiplied together.\n- **Nonlinear Differential Equations**: These include equations where the dependent variable or its derivatives appear to a power greater than one or are multiplied together, making their behavior more complex to analyze.\n\nThe solutions to differential equations can take various forms and are often functions themselves. The solutions might be explicit, where the dependent variable is given directly in terms of the independent variable(s), or implicit, where the solution is given in a form that relates the dependent variable and the independent variable(s) without providing a direct formula. Some differential equations may require numerical methods for their solutions, especially when exact analytic solutions are not feasible or available.\n\nIn essence, the study and application of differential equations are central to understanding and modeling natural systems and phenomena, where the quantification of how things change is crucial.",
    //         role: "assistant",
    //     },
    // ];

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
                    <Message key={m.id} {...m} />
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
