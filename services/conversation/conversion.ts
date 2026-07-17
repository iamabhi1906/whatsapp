import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  ConversationListItem,
  ConversationType,
} from "@/features/conversion/conversion.types";

import { mapUserSnapshot } from "@/features/users/user.helper";

import { mapConversationSnapshot } from "@/features/conversion/conversion.helper";

export const CONVERSATIONS_COLLECTION = "conversations";

export const getConversations = async (
  currentUserId: string,
): Promise<ConversationListItem[]> => {
  const conversationsQuery = query(
    collection(db, CONVERSATIONS_COLLECTION),
    where("participantIds", "array-contains", currentUserId),
  );

  const [conversationsSnapshot, usersSnapshot] = await Promise.all([
    getDocs(conversationsQuery),
    getDocs(collection(db, "users")),
  ]);
  const conversations = conversationsSnapshot.docs.map(mapConversationSnapshot);
  const users = usersSnapshot.docs.map(mapUserSnapshot);
  const usersMap = new Map(users.map((user) => [user.id, user]));
  const existingParticipantIds = new Set(
    conversations.flatMap((conversation) =>
      conversation.participantIds.filter((id) => id !== currentUserId),
    ),
  );
  const realConversations: ConversationListItem[] = conversations.flatMap(
    (conversation) => {
      const participantId = conversation.participantIds.find(
        (id) => id !== currentUserId,
      );
      if (!participantId) {
        return [];
      }
      const participant = usersMap.get(participantId);
      if (!participant) {
        return [];
      }
      return [
        {
          id: conversation.id,
          type: conversation.type,
          name: participant.displayName,
          avatar: participant.avatar,
          participant,
          participants: [participant],
          lastMessage: conversation.lastMessage,
          isMock: false,
        },
      ];
    },
  );

  const mockConversations: ConversationListItem[] = users
    .filter(
      (user) =>
        user.id !== currentUserId && !existingParticipantIds.has(user.id),
    )
    .map((user) => ({
      id: null,
      type: ConversationType.DIRECT,
      name: user.displayName,
      avatar: user.avatar,
      participant: user,
      participants: [user],
      lastMessage: null,
      isMock: true,
    }));

  return [...realConversations, ...mockConversations];
};
