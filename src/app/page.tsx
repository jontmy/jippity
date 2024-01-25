"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, GearIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
    const [apiKeyInput, setApiKeyInput] = useState(apiKey);
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey,
        },
    });
    return (
        <div className="relative flex w-full max-w-prose grow flex-col justify-between">
            <div className="flex flex-col gap-6 pb-16">
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
                            {m.role === "user" ? "You" : "GPT-4"}
                        </div>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="fixed bottom-6 left-0 flex w-full items-center justify-center px-6 sm:px-8"
            >
                <div className="flex w-full max-w-prose grow gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="relative" aria-label="Set API key">
                                <GearIcon />
                                <ClientOnly>
                                    {!apiKey && (
                                        <>
                                            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75" />
                                            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-sky-500" />
                                        </>
                                    )}
                                </ClientOnly>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Set your OpenAI API key</DialogTitle>
                                <DialogDescription>
                                    Your API key will be stored on your browser and only used to
                                    send your messages to OpenAI's GPT. We will never store your API
                                    key on our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <Input
                                placeholder="Paste your API key here"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                            />
                            <DialogFooter>
                                <DialogClose>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose>
                                    <Button onClick={() => setApiKey(apiKeyInput)}>Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <ClientOnly fallback={<Skeleton className="h-9 w-full" />}>
                        <Input
                            value={input}
                            placeholder="Say something..."
                            onChange={handleInputChange}
                            className="bg-white"
                            disabled={!apiKey}
                        />
                    </ClientOnly>
                    <Button
                        type="submit"
                        disabled={!input || !apiKey}
                        className="shrink-0"
                        aria-label="Send message"
                    >
                        <ArrowUpIcon />
                    </Button>
                </div>
            </form>
        </div>
    );
}
