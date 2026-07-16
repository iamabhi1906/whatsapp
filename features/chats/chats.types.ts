import { Message } from "../messages/messages.types";

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: Message;
  unreadMessageCount: number;
}

export interface ChatsState {
  chats: Chat[];
  chat: Chat | null;
  loading: boolean;
  error: string | null;
}

export interface ChatSelectInput {
  chat: Chat;
}
