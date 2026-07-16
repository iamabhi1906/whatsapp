import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "./messages.types";
import { getChatMessages } from "./message.actions";

const initialState: MessageState = {
  chat: null,
  loading: false,
  error: null,
  messages: [],
};

const messageSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    // selectChat: (state, action: PayloadAction<ChatSelectInput>) => {
    //   state.chat = action.payload.chat;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Some thing went wrong";
    });
  },
});

// export const { selectChat } = messageSlice.actions;
const messageReducer = messageSlice.reducer;

export default messageReducer;
