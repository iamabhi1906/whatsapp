"use client";

import { AppDispatch, RootState } from "@/app/store";
import { getUserChats } from "@/features/chats/chats.action";
import { Chat } from "@/features/chats/chats.types";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./chat-list.module.css";
import Image from "next/image";
import moment from "moment";
import { selectChat } from "@/features/chats/chats.slice";

export default function ChatList() {
  const { chats, loading } = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserChats({ userId: "unknown" }));
  }, [dispatch]);

  return (
    <Box className={styles.chatList}>
      {loading && <Typography>Loading</Typography>}
      {chats.map((chat) => (
        <ChatListCard key={chat.name} chat={chat} />
      ))}
    </Box>
  );
}

function ChatListCard({ chat }: { chat: Chat }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      className={styles.chatListCard}
      onClick={() => dispatch(selectChat({ chat }))}
    >
      <Box className={styles.chatListAvatarBox}>
        <Image
          src={chat.avatar}
          alt={`${chat.name}`}
          width={48}
          height={48}
          className={styles.chatListAvatar}
        />
      </Box>
      <Box className={styles.chatInfo}>
        <Stack>
          <Typography className={styles.chatName}>{chat.name}</Typography>
          <Typography className={styles.chatMessage}>
            {chat.lastMessage.text}
          </Typography>
        </Stack>
        <Stack className={styles.chatLeftInfo} spacing={1}>
          <Typography
            className={styles.chatTime}
            sx={{
              color: chat.unreadMessageCount > 0 ? "#1daa61" : "#00000099",
              fontWeight: chat.unreadMessageCount > 0 ? "545" : "400",
            }}
          >
            {moment(chat.lastMessage.createdAt).format("hh:mm A")}
          </Typography>
          {chat.unreadMessageCount > 0 && (
            <Box className={styles.unReadBadge}>{chat.unreadMessageCount}</Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
