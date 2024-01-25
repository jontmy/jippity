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
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Home() {
    const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
    const [gptModel, setGptModel] = useLocalStorage(
        "openai-gpt-model",
        env.NEXT_PUBLIC_OPENAI_GPT_MODELS[0]?.model,
    );
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey,
            model: gptModel,
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
                            {m.role === "user"
                                ? "You"
                                : m.name ??
                                  env.NEXT_PUBLIC_OPENAI_GPT_MODELS.find(
                                      (m) => m.model === gptModel,
                                  )?.name}
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
                                <DialogTitle>Settings</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-8 py-3">
                                <div className="flex flex-col">
                                    <Label className="pb-2.5 pl-0.5">OpenAI API Key</Label>
                                    <Input
                                        placeholder="Paste your API key here"
                                        value={apiKey}
                                        onChange={(e) => {
                                            setApiKey(e.target.value);
                                            toast.success("Changes saved.");
                                        }}
                                    />
                                    <DialogDescription className="pl-0.5 pt-2.5 text-xs font-medium">
                                        We will never store your API key on our servers.
                                    </DialogDescription>
                                    <DialogDescription className="pl-0.5 pt-1 text-xs">
                                        Your API key is saved in your browser and only used to send
                                        your messages to the OpenAI GPT model.
                                    </DialogDescription>
                                </div>
                                <div className="flex flex-col">
                                    <Label className="pb-2.5 pl-0.5">GPT Model</Label>
                                    <Select
                                        defaultValue={gptModel}
                                        onValueChange={(v) => {
                                            setGptModel(v);
                                            toast.success("Changes saved.");
                                        }}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Choose a model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {env.NEXT_PUBLIC_OPENAI_GPT_MODELS.map(
                                                ({ name, model }) => {
                                                    return (
                                                        <SelectItem value={model} key={model}>
                                                            {name}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <DialogDescription
                                        className="pl-0.5 pt-2.5 text-xs"
                                        rel="noreferrer"
                                    >
                                        Your choice will be saved for all new and future chats.
                                        <br />
                                        {gptModel?.includes("3.5") && (
                                            <span>
                                                GPT-3.5 Turbo is free to use on on{" "}
                                                <a
                                                    href="https://chat.openai.com"
                                                    target="_blank"
                                                    className="underline"
                                                >
                                                    chat.openai.com
                                                </a>
                                                .
                                            </span>
                                        )}
                                    </DialogDescription>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button>Close</Button>
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
