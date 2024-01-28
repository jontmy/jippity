"use client";

import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { env } from "@/env";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ClientOnly } from "@/components/client-only";

export default function Page() {
    const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
    const [gptModel, setGptModel] = useLocalStorage(
        "openai-gpt-model",
        env.NEXT_PUBLIC_OPENAI_GPT_MODELS[0]?.model,
    );
    const router = useRouter();
    const matches = useMediaQuery("(min-width: 768px)");

    const Modal = matches ? Dialog : Drawer;
    const ModalContent = matches ? DialogContent : DrawerContent;
    const ModalHeader = matches ? DialogHeader : DrawerHeader;
    const ModalTitle = matches ? DialogTitle : DrawerTitle;
    const ModalDescription = matches ? DialogDescription : DrawerDescription;
    const ModalFooter = matches ? DialogFooter : DrawerFooter;
    const ModalClose = matches ? DialogClose : DrawerClose;

    return (
        <ClientOnly>
            <Modal defaultOpen onOpenChange={() => router.back()}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Settings</ModalTitle>
                    </ModalHeader>
                    <div className="flex flex-col gap-8 px-4 py-3 md:px-0">
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
                            <ModalDescription className="pl-0.5 pt-2.5 text-xs font-medium">
                                We will never store your API key on our servers.
                            </ModalDescription>
                            <ModalDescription className="pl-0.5 pt-1 text-xs">
                                Your API key is saved in your browser and only used to send your
                                messages to the OpenAI GPT model.
                            </ModalDescription>
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
                                    {env.NEXT_PUBLIC_OPENAI_GPT_MODELS.map(({ name, model }) => {
                                        return (
                                            <SelectItem value={model} key={model}>
                                                {name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <ModalDescription className="pl-0.5 pt-2.5 text-xs" rel="noreferrer">
                                Your choice will be saved for all new and future chats.
                                <br />
                                {gptModel?.includes("3.5") && (
                                    <span>
                                        GPT-3.5 Turbo is free to use on{" "}
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
                            </ModalDescription>
                        </div>
                    </div>
                    <ModalFooter>
                        <ModalClose asChild>
                            <Button>Close</Button>
                        </ModalClose>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ClientOnly>
    );
}
