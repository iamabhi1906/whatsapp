import { Chat } from "../chats/chats.types";

export interface Message {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  readBy: string[];
}

export interface MessageState {
  chat: Chat | null;
  loading: boolean;
  error: string | null;
  messages: Message[];
}
