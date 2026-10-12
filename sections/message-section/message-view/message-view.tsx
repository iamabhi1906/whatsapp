"use client";
import { Box, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./message-view.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { User } from "@/features/users/users.types";
import { useEffect } from "react";
import {
  markMessageAsRead,
  subscribeToMessages,
} from "@/services/messages/receive-message";
import { asyncGetMessages } from "@/features/messages/message.actions";
import { setMessages } from "@/features/messages/message.slice";
import { Message } from "@/features/messages/messages.types";
import { ConversationListItem } from "@/features/conversion/conversion.types";

interface MessageViewProps {
  user: User;
  conversationId: string;
  conversation: ConversationListItem;
}

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function MessageView({
  user,
  conversationId,
  conversation,
}: MessageViewProps) {
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!conversationId) {
      return;
    }
    const unsubscribe = subscribeToMessages(conversationId, (messages) => {
      dispatch(setMessages(messages));
    });
    return () => {
      unsubscribe();
    };
  }, [conversationId, dispatch]);

  useEffect(() => {
    if (conversationId) {
      console.log(conversationId);
      dispatch(asyncGetMessages(conversationId));
    }
  }, [conversationId, dispatch]);

  return (
    <Box className={styles.chatContainer}>
      {messages.map((message) => (
        <MessageBox
          message={message}
          key={message.id}
          user={user}
          conversationId={conversationId}
          conversation={conversation}
        />
      ))}
    </Box>
  );
}

function MessageBox({
  message,
  user,
  conversationId,
  conversation,
}: {
  message: Message;
  user: User;
  conversationId: string;
  conversation: ConversationListItem;
}) {
  const isMine = message.senderId === user.id;
  const isRead = message.readBy[conversation.participant.id];

  useEffect(() => {
    console.log("Seen", conversationId);
    markMessageAsRead(conversationId, message.id, user.id);
  }, [conversationId, message.id, user.id]);

  return (
    <Box
      key={message.id}
      className={`${styles.messageRow} ${isMine ? styles.right : styles.left}`}
    >
      <Box
        className={`${styles.bubble} ${
          isMine ? styles.myBubble : styles.otherBubble
        }`}
      >
        <Typography className={styles.messageText}>
          {message.content}
        </Typography>

        <Box className={styles.meta}>
          <Typography className={styles.time}>
            {formatTime(message.createdAt)}
          </Typography>

          {isMine &&
            (isRead ? (
              <DoneAllIcon
                sx={{
                  fontSize: 18,
                  color: "rgb(0, 123, 252)",
                }}
              />
            ) : (
              <DoneIcon
                sx={{
                  fontSize: 17,
                  color: "#8696a0",
                }}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}
