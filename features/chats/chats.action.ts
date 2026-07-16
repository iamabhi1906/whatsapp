import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat } from "./chats.types";

const users = [
  { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Liam Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Sophia Brown", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Noah Davis", avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Olivia Miller", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "James Anderson", avatar: "https://i.pravatar.cc/150?img=6" },
  { name: "Ava Thomas", avatar: "https://i.pravatar.cc/150?img=7" },
  { name: "Benjamin White", avatar: "https://i.pravatar.cc/150?img=8" },
  { name: "Isabella Martin", avatar: "https://i.pravatar.cc/150?img=9" },
  { name: "Lucas Taylor", avatar: "https://i.pravatar.cc/150?img=10" },
  { name: "Mia Harris", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Ethan Clark", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Charlotte Lewis", avatar: "https://i.pravatar.cc/150?img=13" },
  { name: "Henry Walker", avatar: "https://i.pravatar.cc/150?img=14" },
  { name: "Amelia Hall", avatar: "https://i.pravatar.cc/150?img=15" },
];

const messages = [
  "Hey! Are we still meeting today?",
  "I'll send you the files in a few minutes.",
  "Thanks for your help yesterday",
  "Can you call me when you're free?",
  "That sounds like a great idea!",
  "I'm almost there.",
  "Let's catch up this weekend.",
  "Don't forget the meeting at 3 PM.",
  "I'll let you know once it's done.",
  "Did you check the latest update?",
  "Happy Birthday!",
  "See you tomorrow!",
  "No worries, take your time.",
  "The photos turned out amazing!",
  "Good morning! Have a great day",
];

export const getUserChats = createAsyncThunk<
  Chat[],
  { userId: string },
  { rejectValue: string }
>("get/user/chats", async ({ userId }) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const chats: Chat[] = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    avatar: user.avatar,
    lastMessage: {
      id: (index + 1).toString(),
      text: messages[index % messages.length],
      createdAt: new Date(Date.now() - index * 1000 * 60 * 18).toISOString(),
      updatedAt: new Date(Date.now() - index * 1000 * 60 * 18).toISOString(),
      senderId: index % 2 === 0 ? userId : `user-${index + 1}`,
      readBy: index % 3 === 0 ? [userId] : [],
    },
    unreadMessageCount: Math.floor(Math.random() * 6),
  }));

  return chats;
});
