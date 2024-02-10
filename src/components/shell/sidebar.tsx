import { ModeToggle } from "@/components/mode-toggle";
import { auth, signOut } from "@/lib/auth";
import { Show } from "@/components/show";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { GearIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { db } from "@/lib/db";
import { formatDistanceToNow, getYear } from "date-fns";
import { AES, enc } from "crypto-js";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarProps = {
    contentOnly?: boolean;
};

export function Sidebar(props: SidebarProps) {
    return (
        <aside
            className={cn({
                "flex-col sm:flex": true,
                "fixed left-0 top-0 hidden h-screen w-72 bg-zinc-900 p-4 pb-6 pt-[72px] sm:p-6 sm:pb-8 sm:pt-20":
                    !props.contentOnly,
                "flex h-full": props.contentOnly,
            })}
        >
            <Suspense>
                <SidebarContent />
            </Suspense>
        </aside>
    );
}

async function SidebarContent() {
    const { session, user } = await auth();
    const chats = !user
        ? []
        : await db.query.chatTable.findMany({
              where: (chats, { eq }) => eq(chats.userId, user.id),
              orderBy: (chats, { desc }) => [desc(chats.createdAt)],
              with: {
                  messages: {
                      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
                  },
              },
          });
    const decrypted = chats.map((c) => ({
        ...c,
        messages: c.messages.map((m) => ({
            ...m,
            content: AES.decrypt(m.content, env.ENCRYPTION_KEY).toString(enc.Utf8),
        })),
    }));

    return (
        <>
            <p className="text-sm font-medium text-zinc-400">
                {user ? "Recent chats" : "Sign in to see your chat history."}
            </p>
            {!user && (
                <p className="mt-3 text-xs text-zinc-400">
                    Good to know: All of your messages with Jippity are encrypted at rest.
                </p>
            )}
            <ul className="flex w-[calc(100%+theme(width.4))] -translate-x-4 flex-col gap-3 overflow-x-auto overflow-y-auto pt-3">
                {decrypted.map((chat) => {
                    return (
                        <li key={chat.id}>
                            <Button
                                variant="ghost"
                                className="flex h-fit flex-col items-start gap-1.5 hover:bg-zinc-700/80"
                                asChild
                            >
                                <Link href={`/chats/${chat.id}`}>
                                    <p className="line-clamp-2 whitespace-normal text-start text-sm text-zinc-200">
                                        {chat.messages[0]?.content}
                                    </p>
                                    <p className="text-xs text-zinc-400/80">
                                        {formatDistanceToNow(chat.createdAt, { addSuffix: true })}
                                    </p>
                                </Link>
                            </Button>
                        </li>
                    );
                })}
            </ul>
            {user && <div className="grow" />}
            <Show when={user && session} as="div" className="flex items-center gap-4">
                <UserAvatar user={user!} className="size-12 text-zinc-200 *:bg-zinc-700" />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-zinc-50">{user?.username}</p>
                    <p className="text-xs font-medium text-zinc-500">
                        Signed in with {session?.provider}
                    </p>
                </div>
            </Show>
            <Show
                when={user}
                fallback={
                    <div className="flex flex-col gap-3 pt-4 text-center">
                        <Button
                            className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90"
                            asChild
                        >
                            <a href="/api/auth/github">
                                <GitHubLogoIcon className="mr-2 inline-block" />
                                Sign in with GitHub
                            </a>
                        </Button>
                        <Button
                            className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90"
                            disabled
                        >
                            {/*<a href="/api/auth/google">*/}
                            <GoogleLogoIcon />
                            Sign in with Google (soon)
                            {/*</a>*/}
                        </Button>
                    </div>
                }
            >
                <form action={signOut} className="pt-6">
                    <Button
                        variant="secondary"
                        className="w-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                    >
                        Sign out
                        <LogOut size={12} className="ml-2 inline-block text-zinc-200" />
                    </Button>
                </form>
            </Show>
            {!user && <div className="grow" />}
            <Separator className="mt-6 bg-zinc-700" />
            <div className="mt-6 flex justify-between">
                <ModeToggle />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-10 w-12 shrink-0 border-none bg-zinc-700/50 text-zinc-200 hover:bg-zinc-700 dark:text-zinc-200 md:h-9"
                                aria-label="Set API key"
                                asChild
                            >
                                <Link href="/settings">
                                    <GearIcon />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <nav className="flex flex-col gap-1 pt-6 text-xs text-zinc-400">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-of-service">Terms of Service</Link>
            </nav>
            <p className="pt-3 text-xs text-zinc-500">Copyright © {getYear(new Date())} Jippity</p>
        </>
    );
}

function GoogleLogoIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14.5"
            height="24"
            className="mr-2"
        >
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
        </svg>
    );
}
