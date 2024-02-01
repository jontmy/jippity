import type { Metadata } from "next";
import { type ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "@/env";
import { Providers } from "@/app/providers";

export const runtime = "edge";

const satoshi = localFont({
    src: [
        {
            path: "../../public/fonts/Satoshi-Variable.ttf",
            style: "normal",
        },
        {
            path: "../../public/fonts/Satoshi-VariableItalic.ttf",
            style: "italic",
        },
    ],
    variable: "--font-satoshi",
});

const mono = localFont({
    src: [
        {
            path: "../../public/fonts/JetBrainsMono-Variable.ttf",
            style: "normal",
        },
        {
            path: "../../public/fonts/JetBrainsMono-VariableItalic.ttf",
            style: "italic",
        },
    ],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Jippity",
    description: "Chat with GPT-4. Bring your own API key.",
    verification: {
        google: env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_TAG,
    },
};

type RootLayoutProps = Readonly<{
    children: ReactNode;
    sidebar: ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "h-screen overflow-x-clip bg-muted",
                    satoshi.className,
                    satoshi.variable,
                    mono.variable,
                )}
            >
                <Providers
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="grid h-full grid-cols-1 justify-center font-sans md:grid-cols-[theme(width.72),1fr]">
                        <aside className="hidden h-screen flex-col gap-6 bg-zinc-900 p-4 pb-6 sm:p-6 sm:pb-8 md:flex">
                            {props.sidebar}
                        </aside>
                        <main className="relative flex w-full flex-col items-center gap-6 overflow-y-auto bg-zinc-50 p-6 dark:bg-zinc-800 sm:p-8">
                            {props.children}
                            <Toaster />
                        </main>
                    </div>
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
