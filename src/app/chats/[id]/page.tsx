import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Message } from "@/components/message";
import { AES, enc } from "crypto-js";
import { env } from "@/env";

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
        <ul className="flex w-full max-w-prose flex-col gap-6">
            {decrypted.map((m) => (
                <Message key={m.id} {...m} as="li" />
            ))}
        </ul>
    );
}
