import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/shell/sidebar";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { env } from "@/env";

export function Navbar() {
    return (
        <header className="sticky left-0 top-0 z-50 flex h-14 w-screen items-center gap-4 bg-zinc-900/90 px-6 shadow-lg backdrop-blur sm:bg-zinc-950/90">
            <Sheet>
                <SheetTrigger className="block sm:hidden">
                    <MenuIcon size={22} className="text-white" />
                </SheetTrigger>
                <Suspense>
                    <SheetContent side="left" className="flex flex-col gap-6 bg-zinc-900">
                        <Link
                            href="/"
                            className="font-brand text-xl font-black tracking-tight text-white sm:text-2xl"
                        >
                            Jippity.
                        </Link>
                        <Sidebar contentOnly />
                    </SheetContent>
                </Suspense>
            </Sheet>
            <Link
                href="/"
                className="font-brand text-xl font-black tracking-tight text-white sm:text-2xl"
            >
                Jippity.
            </Link>
            <span className="grow" />
            <Button
                size="icon"
                asChild
                variant="ghost"
                className="cursor-pointer hover:bg-zinc-800"
            >
                <a
                    href={env.NEXT_PUBLIC_JIPPITY_REPO_URL}
                    target="_blank"
                    aria-label="View Jippity's source code on GitHub"
                >
                    <GitHubLogoIcon className="size-5 text-zinc-100" />
                </a>
            </Button>
        </header>
    );
}
