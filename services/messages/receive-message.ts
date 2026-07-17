import { Message } from "@/features/messages/messages.types";
import { realTimeDB } from "@/lib/firebase";
import {
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  Unsubscribe,
} from "firebase/database";
import { MESSAGES_ROOT } from "./message";
import { mapMessage } from "@/features/messages/messages.helper";

export const subscribeToMessages = (
  conversationId: string,
  callback: (messages: Message[]) => void,
): Unsubscribe => {
  const messagesQuery = query(
    ref(realTimeDB, `${MESSAGES_ROOT}/${conversationId}`),
    orderByChild("createdAt"),
    limitToLast(50),
  );

  return onValue(messagesQuery, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const messages: Message[] = [];

    snapshot.forEach((childSnapshot) => {
      messages.push(mapMessage(childSnapshot.key!, childSnapshot.val()));
    });

    callback(messages);
  });
};

export const markMessageAsRead = async (
  conversationId: string,
  messageId: string,
  userId: string,
): Promise<void> => {
  const readRef = ref(
    realTimeDB,
    `${MESSAGES_ROOT}/${conversationId}/${messageId}/readBy/${userId}`,
  );
  await set(readRef, true);
};
