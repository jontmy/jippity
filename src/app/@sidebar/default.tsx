import { ModeToggle } from "@/app/@sidebar/mode-toggle";
import { auth, signOut } from "@/lib/auth";
import { Show } from "@/components/show";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export default async function Default() {
    const { user } = await auth();
    const chats = !user
        ? []
        : await db.query.chatTable.findMany({
              where: (posts, { eq }) => eq(posts.userId, user.id),
              orderBy: (chats, { desc }) => [desc(chats.createdAt)],
              with: {
                  messages: {
                      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
                  },
              },
          });
    return (
        <>
            <Link href="/" className="text-2xl font-black tracking-tight text-white">
                Jippity.
            </Link>
            <p className="text-sm font-medium text-zinc-400">
                {user ? "Recent chats" : "Sign in to see your chat history."}
            </p>
            <ul className="-mt-4 flex w-[calc(100%+theme(width.4))] -translate-x-4 flex-col gap-3 overflow-x-auto overflow-y-auto">
                {chats.map((chat) => {
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
            <Show when={user} as="div" className="flex items-center gap-4">
                <UserAvatar user={user!} className="size-12 text-zinc-200 *:bg-zinc-700" />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-zinc-50">{user?.username}</p>
                    <p className="text-xs font-medium text-zinc-500">Signed in with GitHub</p>
                </div>
            </Show>
            <Show
                when={user}
                fallback={
                    <div className="flex flex-col gap-3 text-center">
                        <Button
                            className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90"
                            asChild
                        >
                            <Link href="/api/auth/github">
                                <GitHubLogoIcon className="mr-2 inline-block" />
                                Sign in with GitHub
                            </Link>
                        </Button>
                        <p className="text-xs font-medium text-zinc-400">
                            More sign-in options coming soon.
                        </p>
                    </div>
                }
            >
                <form action={signOut}>
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
            <Separator className="bg-zinc-700" />
            <ModeToggle />
        </>
    );
}
