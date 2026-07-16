import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSelectInput, ChatsState } from "./chats.types";
import { getUserChats } from "./chats.action";

const initialState: ChatsState = {
  chats: [],
  chat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<ChatSelectInput>) => {
      state.chat = action.payload.chat;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserChats.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    });
  },
});

export const { selectChat } = chatSlice.actions;
const chatsReducer = chatSlice.reducer;

export default chatsReducer;
