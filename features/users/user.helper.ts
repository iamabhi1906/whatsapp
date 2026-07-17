import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";

import { User } from "./users.types";

export const mapUserSnapshot = (
  snapshot: DocumentSnapshot<DocumentData>,
): User => {
  if (!snapshot.exists()) {
    throw new Error("snapshot required");
  }
  const data = snapshot.data();
  return {
    id: snapshot.id,
    email: data.email,
    userName: data.userName,
    displayName: data.displayName,
    avatar: data.avatar ?? null,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,

    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt,
  };
};
