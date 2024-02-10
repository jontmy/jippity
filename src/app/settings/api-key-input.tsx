"use client";

import { useLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ApiKeyInput() {
    const [apiKey, setApiKey] = useLocalStorage("openai-api-key", "");
    return (
        <Input
            placeholder="Paste your API key here"
            value={apiKey}
            onChange={(e) => {
                setApiKey(e.target.value);
                toast.success("Changes saved.");
            }}
            className="bg-muted dark:bg-zinc-700"
        />
    );
}
