"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { useMediaQuery } from "usehooks-ts";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();
    const matches = useMediaQuery("(min-width: 768px)");

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            position={matches ? "bottom-right" : "top-center"}
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:font-sans",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
