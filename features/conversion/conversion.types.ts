import { Message } from "../messages/messages.types";
import { User } from "../users/users.types";

export enum ConversationType {
  GROUP = "group",
  DIRECT = "direct",
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participantIds: string[];
  createdBy: string;
  lastMessage: Message | null;
  createdAt: string;
  updatedAt: string;
  group?: {
    name: string;
    avatar: string;
  };
}

export interface ConversationListItem {
  id: string | null;
  type: ConversationType;
  name: string;
  avatar: string;
  participant: User;
  participants: User[];
  lastMessage: Message | null;
  isMock: boolean;
}

export interface ConversationState {
  conversations: ConversationListItem[];
  conversation: ConversationListItem | null;
  loading: boolean;
  error: string;
}
