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
import { Sidebar } from "@/components/sidebar";

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

const sora = localFont({
    src: [
        {
            path: "../../public/fonts/Sora-Variable.ttf",
            style: "normal",
        },
    ],
    variable: "--font-brand",
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
    metadataBase: new URL(env.NEXT_PUBLIC_FRONTEND_URL),
    title: {
        template: "%s | Jippity",
        default: "Jippity",
    },
    description: "Chat with GPT-4. Bring your own API key.",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Jippity",
        description: "Chat with GPT-4. Bring your own API key.",
        url: env.NEXT_PUBLIC_FRONTEND_URL,
        siteName: "Jippity",
    },
};

type RootLayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "h-screen overflow-x-clip bg-muted",
                    satoshi.className,
                    satoshi.variable,
                    sora.variable,
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
                        <Sidebar />
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
