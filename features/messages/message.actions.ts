import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "./messages.types";
import { sendMessage, sendMessageArg } from "@/services/messages/send-message";
import {
  getConversationMessages,
  getMessageById,
} from "@/services/messages/get-message";
import { updateConversationLastMessage } from "@/services/conversation/create-get";

export const asyncSendMessages = createAsyncThunk<
  Message,
  sendMessageArg,
  { rejectValue: string }
>(
  "send/chat/messages",
  async (payload: sendMessageArg, { rejectWithValue }) => {
    try {
      const messageId = await sendMessage(payload);
      const message = await getMessageById(payload.conversationId, messageId);
      if (!message) {
        throw new Error("Message could not be retrieved after sending.");
      }
      await updateConversationLastMessage(payload.conversationId, message);
      return message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  },
);

export const asyncGetMessages = createAsyncThunk<
  Message[],
  string,
  { rejectValue: string }
>("get/chat/messages", async (conversationId: string, { rejectWithValue }) => {
  try {
    const messages = await getConversationMessages(conversationId);
    return messages;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to send message",
    );
  }
});
