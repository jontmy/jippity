"use server";

import { auth } from "@/lib/auth";
import { chatTable, db, generateId, messageTable } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    await db.transaction(async (trx) => {
        await trx.insert(chatTable).ignore().values({
            id: chatId,
            userId: user.id,
            createdAt: new Date(),
        });
        await trx.insert(messageTable).values({
            chatId,
            userId: user.id,
            content,
            role,
            createdAt: new Date(),
        });
    });
    revalidatePath("/");
    return chatId;
}
