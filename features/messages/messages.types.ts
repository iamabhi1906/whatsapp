import { Chat } from "../chats/chats.types";

export enum MessageTypes {
  TEXT = "text",
  IMAGE = "image",
}

export interface Message {
  id: string;
  senderId: string;
  type: MessageTypes;
  content: string;
  createdAt: string;
  updatedAt: string;
  readBy: Record<string, boolean>;
}

export interface MessageState {
  chat: Chat | null;
  loading: boolean;
  error: string | null;
  messages: Message[];
  sendingMessage: Omit<
    Message,
    "id" | "createdAt" | "updatedAt" | "readBy"
  > | null;
}
