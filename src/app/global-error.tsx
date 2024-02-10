"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-full w-full max-w-prose flex-col items-center justify-center gap-1">
            <h1 className="font-semibold text-foreground">500</h1>
            <p className="pb-6 text-muted-foreground">Oops! Something went wrong.</p>
            <Button asChild>
                <Link href="/">Back to homepage</Link>
            </Button>
        </div>
    );
}
