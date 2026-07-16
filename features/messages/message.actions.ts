import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "./messages.types";

const CURRENT_USER_ID = "current-user";

const conversation = [
  "Hey!",
  "Hi! How are you?",
  "Doing great. What about you?",
  "Pretty good! Working on the chat screen.",
  "Nice! Is everything working?",
  "Almost. Just mocking the API for now.",
  "Sounds good.",
  "Redux Toolkit makes it pretty easy.",
  "Yep",
  "Let's test sending messages next.",
  "Sure, I'll work on that.",
  "Awesome, thanks!",
];

export const getChatMessages = createAsyncThunk<
  Message[],
  { chatId: number },
  { rejectValue: string }
>("get/chat/messages", async ({ chatId }) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  const otherUserId = `user-${chatId}`;
  const now = Date.now();

  const messages: Message[] = conversation.map((text, index) => {
    const fromCurrentUser = index % 2 === 0;

    return {
      id: (index + 1).toString(),
      text,
      senderId: fromCurrentUser ? CURRENT_USER_ID : otherUserId,
      readBy: fromCurrentUser
        ? [CURRENT_USER_ID, otherUserId]
        : index < conversation.length - 2
          ? [CURRENT_USER_ID, otherUserId]
          : [CURRENT_USER_ID],
      createdAt: new Date(
        now - (conversation.length - index) * 60 * 1000,
      ).toISOString(),
      updatedAt: new Date(
        now - (conversation.length - index) * 60 * 1000,
      ).toISOString(),
    };
  });

  return messages;
});
