import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { auth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { type PropsWithChildren } from "react";

const ApiKeyInput = dynamic(async () => await import("@/app/settings/api-key-input"), {
    loading: () => <Skeleton className="h-10 w-full sm:h-9" />,
    ssr: false,
});

const GptModelSelect = dynamic(() => import("@/app/settings/gpt-model-select"), {
    loading: () => <Skeleton className="h-10 w-48 sm:h-9" />,
    ssr: false,
});

export default async function Page() {
    const { user, session } = await auth();
    return (
        <div className="flex w-full max-w-prose flex-col gap-4 sm:gap-6">
            <h1 className="font-brand text-xl font-bold">Settings</h1>
            <Section>
                <div className="flex flex-col gap-1.5 py-5">
                    <Label className="pb-2.5 pl-0.5">OpenAI API Key</Label>
                    <ApiKeyInput />
                    <div className="pl-0.5 ">
                        <p className="pt-2.5 text-xs font-medium text-foreground/80">
                            We will never store your API key on our servers.
                        </p>
                        <p className="pt-1 text-xs text-muted-foreground">
                            Your API key is saved in your browser and only used to send your
                            messages to the OpenAI GPT model.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <Label className="pb-2.5 pl-0.5">GPT Model</Label>
                    <GptModelSelect />
                </div>
            </Section>
            {user && (
                <Section>
                    <div className="flex flex-col gap-1.5 py-5">
                        <Label className="pb-2.5 pl-0.5">Username</Label>
                        <Input
                            value={user.username}
                            className="pointer-events-none max-w-48 bg-muted text-muted-foreground dark:bg-zinc-700"
                            readOnly
                        />
                        <div className="pl-0.5 ">
                            <p className="pt-2.5 text-xs font-medium text-foreground/80">
                                Your username is based on your {session.provider} account and can't
                                be changed at the moment.
                            </p>
                            <p className="pt-1 text-xs text-muted-foreground">
                                In future, you will be able to change your username.
                            </p>
                        </div>
                    </div>
                </Section>
            )}
        </div>
    );
}

function Section(props: PropsWithChildren) {
    return (
        <div className="w-full rounded-xl bg-zinc-200/50 px-6 py-2 shadow-inner dark:bg-zinc-700/50 sm:py-3">
            {props.children}
        </div>
    );
}
