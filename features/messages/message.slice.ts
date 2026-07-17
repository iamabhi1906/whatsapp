import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./messages.types";
import { asyncGetMessages, asyncSendMessages } from "./message.actions";

const initialState: MessageState = {
  chat: null,
  loading: false,
  error: null,
  messages: [],
  sendingMessage: null,
};

const messageSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(asyncGetMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    });
    builder.addCase(asyncGetMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Some thing went wrong";
    });

    builder.addCase(asyncSendMessages.pending, (state, action) => {
      state.sendingMessage = action.meta.arg;
    });
  },
});

export const { setMessages } = messageSlice.actions;
const messageReducer = messageSlice.reducer;

export default messageReducer;
