import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

import { Conversation, ConversationType } from "./conversion.types";

import { Message, MessageTypes } from "../messages/messages.types";

const toISOString = (value: unknown): string => {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
};

const mapLastMessage = (
  data: DocumentData | null | undefined,
): Message | null => {
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    senderId: data.senderId,
    type: data.type as MessageTypes,
    content: data.content,
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
    readBy: data.readBy ?? [],
  };
};

export const mapConversationSnapshot = (
  snapshot: QueryDocumentSnapshot<DocumentData>,
): Conversation => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    type: data.type as ConversationType,
    participantIds: data.participantIds ?? [],
    createdBy: data.createdBy,
    lastMessage: mapLastMessage(data.lastMessage),
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
    group: data.group,
  };
};
