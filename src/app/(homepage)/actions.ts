"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { AES } from "crypto-js";
import { env } from "@/env";
import { chatTable } from "@/lib/models/chat/schemas";
import { messageTable } from "@/lib/models/message/schemas";
import { generateId } from "@/lib/models/utils";

const CreateMessageSchema = z.object({
    chatId: z.string().optional().default(generateId),
    content: z.string(),
    role: z.enum(["user", "assistant"]),
});

type CreateMessageInput = z.input<typeof CreateMessageSchema>;

export async function createMessage(input: CreateMessageInput) {
    const { chatId, content, role } = CreateMessageSchema.parse(input);
    const { user } = await auth();
    if (!user) {
        return chatId;
    }
    const ciphertext = AES.encrypt(content, env.DATABASE_ENCRYPTION_KEY).toString();
    await db.transaction(async (trx) => {
        await trx.insert(chatTable).values({
            id: chatId,
            userId: user.id,
            createdAt: new Date(),
        }).onConflictDoNothing();
        await trx.insert(messageTable).values({
            chatId,
            userId: user.id,
            content: ciphertext,
            role,
            createdAt: new Date(),
        });
    });
    revalidatePath("/");
    return chatId;
}
