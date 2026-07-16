"use client";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import { Chat } from "@/features/chats/chats.types";

export default function MessageAreaHeader({ chat }: { chat: Chat }) {
  return (
    <Box className={styles.box}>
      <Stack direction={"row"} className={styles.chatAvatarAndNameBox}>
        <Image
          src={chat.avatar}
          alt="Chat Image"
          width={40}
          height={40}
          className={styles.chatAvatar}
        />
        <Typography className={styles.chatName}>{chat.name}</Typography>
      </Stack>
      
    </Box>
  );
}
