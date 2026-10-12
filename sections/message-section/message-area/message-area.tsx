"use client";
import { RootState } from "@/app/store";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./message-area.module.css";
import MessageAreaHeader from "../header/header";
import MessageView from "../message-view/message-view";
import MessageInput from "../input-box/input-box";

export default function MessageArea() {
  const { conversation } = useSelector((state: RootState) => state.conversion);
  const { user } = useSelector((state: RootState) => state.users);

  if (!conversation || !conversation.id || !user) return;
  return (
    <Box className={styles.layout}>
      <MessageAreaHeader conversation={conversation} />
      <MessageView
        user={user}
        conversationId={conversation.id}
        conversation={conversation}
      />
      <MessageInput conversationId={conversation.id} userId={user.id} />
    </Box>
  );
}
