"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Laptop2, Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

type ModeToggleProps = {
    className?: string;
};

export function ModeToggle(props: ModeToggleProps) {
    const { theme, setTheme } = useTheme();
    return (
        <TooltipProvider>
            <ClientOnly fallback={<Skeleton className={cn("h-9 w-2/3", props.className)} />}>
                <div className={cn("flex w-2/3", props.className)}>
                    <Tooltip>
                        <TooltipTrigger onClick={() => setTheme("light")} asChild>
                            <Button
                                className={cn({
                                    "w-full rounded-none rounded-l-md text-zinc-200": true,
                                    "bg-zinc-700/80 hover:bg-zinc-700": theme === "light",
                                    "bg-zinc-800 hover:bg-zinc-700": theme !== "light",
                                })}
                                aria-label="Set color scheme to light mode"
                            >
                                <Sun size={14} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Light mode</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger
                            onClick={() => setTheme("dark")}
                            className="flex justify-center"
                            asChild
                        >
                            <Button
                                className={cn({
                                    "w-full rounded-none text-zinc-200": true,
                                    "bg-zinc-700/80 hover:bg-zinc-700": theme === "dark",
                                    "bg-zinc-800 hover:bg-zinc-700": theme !== "dark",
                                })}
                                aria-label="Set color scheme to dark mode"
                            >
                                <Moon size={14} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Dark mode</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger
                            onClick={() => setTheme("system")}
                            className="flex justify-center"
                            asChild
                        >
                            <Button
                                className={cn({
                                    "w-full rounded-none rounded-r-md text-zinc-200": true,
                                    "bg-zinc-700/80 hover:bg-zinc-700": theme === "system",
                                    "bg-zinc-800 hover:bg-zinc-700": theme !== "system",
                                })}
                                aria-label="Set color scheme to system theme"
                            >
                                <Laptop2 size={15} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>System theme</TooltipContent>
                    </Tooltip>
                </div>
            </ClientOnly>
        </TooltipProvider>
    );
}
