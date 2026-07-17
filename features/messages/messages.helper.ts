import { Message, MessageTypes } from "./messages.types";

export const mapMessage = (
  id: string,
  data: Record<string, unknown>,
): Message => {
  const createdAt =
    typeof data.createdAt === "number"
      ? new Date(data.createdAt).toISOString()
      : "";

  const updatedAt =
    typeof data.updatedAt === "number"
      ? new Date(data.updatedAt).toISOString()
      : "";

  const readBy = (data.readBy as Record<string, boolean>) ?? {};

  return {
    id,
    senderId: data.senderId as string,
    type: data.type as MessageTypes,
    content: data.content as string,
    createdAt,
    updatedAt,
    readBy,
  };
};
