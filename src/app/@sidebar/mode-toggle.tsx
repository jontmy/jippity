"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Laptop2, Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <TooltipProvider>
            <div className="flex">
                <Tooltip>
                    <TooltipTrigger onClick={() => setTheme("light")} asChild>
                        <Button
                            className={cn({
                                "rounded-none rounded-l-md text-zinc-200": true,
                                "bg-zinc-700/80 hover:bg-zinc-700": theme === "light",
                                "bg-zinc-800 hover:bg-zinc-700": theme !== "light",
                            })}
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
                                "rounded-none text-zinc-200": true,
                                "bg-zinc-700/80 hover:bg-zinc-700": theme === "dark",
                                "bg-zinc-800 hover:bg-zinc-700": theme !== "dark",
                            })}
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
                                "rounded-none rounded-r-md text-zinc-200": true,
                                "bg-zinc-700/80 hover:bg-zinc-700": theme === "system",
                                "bg-zinc-800 hover:bg-zinc-700": theme !== "system",
                            })}
                        >
                            <Laptop2 size={15} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>System theme</TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}
