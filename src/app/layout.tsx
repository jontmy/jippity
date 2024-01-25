import type { Metadata } from "next";
import { type ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
    title: "Jippity",
    description: "Chat with GPT-4. Supply your own API key.",
};

type RootLayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={cn("overflow-x-clip bg-muted", satoshi.className)}>
                <main className="flex min-h-screen flex-col items-center gap-6 p-6 sm:p-8">
                    {props.children}
                </main>
            </body>
        </html>
    );
}
