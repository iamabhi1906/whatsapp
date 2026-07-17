import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationListItem, ConversationState } from "./conversion.types";
import { fetchConversation, fetchConversations } from "./conversion.action";

const initialState: ConversationState = {
  conversations: [],
  conversation: null,
  loading: false,
  error: "",
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    selectConversation(state, action: PayloadAction<ConversationListItem>) {
      state.conversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    });

    builder.addCase(fetchConversation.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.loading = false;
      state.conversation = action.payload;
    });
    builder.addCase(fetchConversation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    });
  },
});

export const { selectConversation } = conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
