import { get, orderByChild, query, ref } from "firebase/database";
import { Message } from "@/features/messages/messages.types";
import { mapMessage } from "@/features/messages/messages.helper";
import { realTimeDB } from "@/lib/firebase";

const MESSAGES_ROOT = "messages";

export const getMessageById = async (
  conversationId: string,
  messageId: string,
): Promise<Message | null> => {
  const messageRef = ref(
    realTimeDB,
    `${MESSAGES_ROOT}/${conversationId}/${messageId}`,
  );
  const snapshot = await get(messageRef);
  if (!snapshot.exists()) {
    return null;
  }
  return mapMessage(snapshot.key!, snapshot.val());
};

export const getConversationMessages = async (
  conversationId: string,
): Promise<Message[]> => {
  const messagesQuery = query(
    ref(realTimeDB, `${MESSAGES_ROOT}/${conversationId}`),
    orderByChild("createdAt"),
  );
  const snapshot = await get(messagesQuery);
  if (!snapshot.exists()) {
    return [];
  }
  const messages: Message[] = [];
  snapshot.forEach((childSnapshot) => {
    messages.push(mapMessage(childSnapshot.key!, childSnapshot.val()));
  });
  return messages;
};
