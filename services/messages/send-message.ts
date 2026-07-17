import { MessageTypes } from "@/features/messages/messages.types";
import { realTimeDB } from "@/lib/firebase";
import { MESSAGES_ROOT } from "./message";
import { push, ref, serverTimestamp, set } from "firebase/database";

export interface sendMessageArg {
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageTypes;
}

export const sendMessage = async (payload: sendMessageArg): Promise<string> => {
  const db = realTimeDB;
  const messagesRef = ref(db, `${MESSAGES_ROOT}/${payload.conversationId}`);
  const messageRef = push(messagesRef);
  if (!messageRef.key) {
    throw new Error("Failed to generate message ID");
  }
  const messageId = messageRef.key;

  await set(messageRef, {
    id: messageId,
    senderId: payload.senderId,
    type: payload.type || MessageTypes.TEXT,
    content: payload.content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    readBy: { [payload.senderId]: true },
  });

  return messageId;
};
