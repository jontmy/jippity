"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export function BackButton() {
    const router = useRouter();
    const segment = useSelectedLayoutSegment();

    if (segment === "(homepage)") {
        return null;
    }

    return (
        <Button
            variant="ghost"
            className="mb-2 w-fit -translate-x-5 -translate-y-2 place-self-start text-muted-foreground"
            onClick={() => router.back()}
        >
            <ChevronLeftIcon size={18} className="mr-2 translate-y-px" />
            Back
        </Button>
    );
}
