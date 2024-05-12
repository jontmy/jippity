import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "@/env";
import { Providers } from "@/app/providers";
import { Sidebar } from "@/components/shell/sidebar";
import { Navbar } from "@/components/shell/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Main } from "@/components/shell/main";
import NextTopLoader from "nextjs-toploader";

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
    appleWebApp: {
        title: "Jippity",
        statusBarStyle: "black-translucent",
        // https://appsco.pe/developer/splash-screens
        startupImage: "/splashes/iphonexsmax_splash.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#09090b",
};

export default function RootLayout(props: Readonly<PropsWithChildren>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "h-screen w-screen overflow-x-clip bg-muted",
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
                    <NextTopLoader
                        color="#ffffff"
                        height={2}
                        showSpinner={false}
                        initialPosition={0.2}
                        shadow="0 0 10px #ffffff,0 0 5px #ffffff"
                    />
                    <Navbar />
                    <Sidebar />
                    <Main>{props.children}</Main>
                    <Toaster />
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
