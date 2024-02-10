"use client";

import { useLocalStorage } from "usehooks-ts";
import { env } from "@/env";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function GptModelSelect() {
    const [gptModel, setGptModel] = useLocalStorage(
        "openai-gpt-model",
        env.NEXT_PUBLIC_OPENAI_GPT_MODELS[0]?.model,
    );
    return (
        <Select
            defaultValue={gptModel}
            onValueChange={(v) => {
                setGptModel(v);
                toast.success("Changes saved.");
            }}
        >
            <SelectTrigger className="w-48 bg-muted dark:bg-zinc-700">
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
    );
}
