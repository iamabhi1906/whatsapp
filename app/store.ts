import chatsReducer from "@/features/chats/chats.slice";
import messageReducer from "@/features/messages/message.slice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messageReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
