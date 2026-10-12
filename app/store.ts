// import chatsReducer from "@/features/chats/chats.slice";
import conversationReducer from "@/features/conversion/conversion.slice";
import messageReducer from "@/features/messages/message.slice";
import userReducer from "@/features/users/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";

const persistedUserReducer = persistReducer(
  {
    key: "auth",
    storage,
  },
  userReducer,
);

const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    conversion: conversationReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
