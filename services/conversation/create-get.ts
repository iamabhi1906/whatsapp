import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  Conversation,
  ConversationListItem,
  ConversationType,
} from "@/features/conversion/conversion.types";

import { mapConversationSnapshot } from "@/features/conversion/conversion.helper";
import { mapUserSnapshot } from "@/features/users/user.helper";
import { USERS_COLLECTION } from "../user";
import { Message } from "@/features/messages/messages.types";

const CONVERSATIONS_COLLECTION = "conversations";

export const getConversationById = async (
  conversationId: string,
): Promise<Conversation | null> => {
  const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  const snapshot = await getDoc(conversationRef);
  if (!snapshot.exists()) {
    return null;
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Conversation;
};

export const findDirectConversation = async (
  currentUserId: string,
  targetUserId: string,
): Promise<Conversation | null> => {
  const q = query(
    collection(db, CONVERSATIONS_COLLECTION),
    where("participantIds", "array-contains", currentUserId),
    where("type", "==", ConversationType.DIRECT),
  );
  const snapshot = await getDocs(q);
  const conversationDoc = snapshot.docs.find((doc) => {
    const participantIds = doc.data().participantIds as string[];
    return participantIds.length === 2 && participantIds.includes(targetUserId);
  });
  if (!conversationDoc) {
    return null;
  }
  return mapConversationSnapshot(conversationDoc);
};

export const getConversation = async (
  currentUserId: string,
  targetUserId: string,
): Promise<ConversationListItem> => {
  let conversation = await findDirectConversation(currentUserId, targetUserId);
  const userRef = doc(db, USERS_COLLECTION, targetUserId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    throw new Error("User not found");
  }
  const participant = mapUserSnapshot(userSnapshot);
  if (!conversation) {
    const conversationRef = await addDoc(
      collection(db, CONVERSATIONS_COLLECTION),
      {
        type: ConversationType.DIRECT,
        participantIds: [currentUserId, targetUserId],
        createdBy: currentUserId,
        lastMessage: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
    );
    const snapshot = await getDoc(conversationRef);
    if (!snapshot.exists()) {
      throw new Error("Failed to create conversation");
    }
    conversation = mapConversationSnapshot(snapshot);
  }
  return {
    id: conversation.id,
    type: conversation.type,
    name: participant.displayName,
    avatar: participant.avatar,
    participant,
    participants: [participant],
    lastMessage: conversation.lastMessage,
    isMock: false,
  };
};

export const getUserConversations = async (
  userId: string,
): Promise<Conversation[]> => {
  const q = query(
    collection(db, CONVERSATIONS_COLLECTION),
    where("participantIds", "array-contains", userId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapConversationSnapshot);
};

export const updateConversationLastMessage = async (
  conversationId: string,
  lastMessage: Message,
): Promise<void> => {
  const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  await updateDoc(conversationRef, {
    lastMessage,
    updatedAt: serverTimestamp(),
  });
};
