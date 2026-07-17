import { createAsyncThunk } from "@reduxjs/toolkit";
import { ConversationListItem } from "./conversion.types";
import { getConversations } from "@/services/conversation/conversion";
import { getConversation } from "@/services/conversation/create-get";

export const fetchConversations = createAsyncThunk<
  ConversationListItem[],
  string,
  { rejectValue: string }
>("conversations/get", async (currentUserId, { rejectWithValue }) => {
  try {
    const conversations = await getConversations(currentUserId);
    return conversations;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch conversations",
    );
  }
});

interface FetchConversationArgs {
  currentUserId: string;
  targetUserId: string;
}

export const fetchConversation = createAsyncThunk<
  ConversationListItem,
  FetchConversationArgs,
  { rejectValue: string }
>(
  "conversation/get",
  async ({ currentUserId, targetUserId }, { rejectWithValue }) => {
    try {
      const conversations = await getConversation(currentUserId, targetUserId);
      return conversations;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch conversations",
      );
    }
  },
);
