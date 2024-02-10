import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Message } from "@/components/message";
import { AES, enc } from "crypto-js";
import { env } from "@/env";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageProps = {
    params: {
        id: string;
    };
};

export default async function Page({ params }: PageProps) {
    const { user } = await auth();
    if (!user) {
        notFound();
    }
    const messages = await db.query.messageTable.findMany({
        where: (messages, { eq, and }) =>
            and(eq(messages.chatId, params.id), eq(messages.userId, user.id)),
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
    });
    if (messages.length === 0) {
        notFound();
    }
    const decrypted = messages.map((m) => ({
        ...m,
        content: AES.decrypt(m.content, env.ENCRYPTION_KEY).toString(enc.Utf8),
    }));
    return (
        <div className="flex w-full max-w-prose flex-col gap-6">
            <ul className="flex w-full flex-col gap-6 overflow-x-auto">
                {decrypted.map((m) => (
                    <Message key={m.id} {...m} as="li" />
                ))}
            </ul>
            <Separator className="dark:bg-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Chat continuation coming soon.</p>
            <Button asChild>
                <Link href="/" className="w-fit px-16 sm:px-32">
                    New chat
                </Link>
            </Button>
        </div>
    );
}
