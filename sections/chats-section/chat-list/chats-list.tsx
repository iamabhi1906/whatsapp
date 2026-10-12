"use client";

import { AppDispatch, RootState } from "@/app/store";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./chat-list.module.css";
import Image from "next/image";
import moment from "moment";
import { fetchConversations } from "@/features/conversion/conversion.action";
import { ConversationListItem } from "@/features/conversion/conversion.types";
import { selectConversation } from "@/features/conversion/conversion.slice";
import { User } from "@/features/users/users.types";

export default function ChatList() {
  const { conversations } = useSelector((state: RootState) => state.conversion);
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(fetchConversations(user.id));
    }
  }, [dispatch, user]);
  if (!user) return;

  return (
    <Box className={styles.chatList}>
      {/* {loading && <Typography>Loading</Typography>} */}
      {conversations.map((conversation, index) => (
        <ChatListCard
          key={conversation.id || `c-${index}`}
          conversation={conversation}
          user={user}
        />
      ))}
    </Box>
  );
}

function ChatListCard({
  conversation,
  user,
}: {
  conversation: ConversationListItem;
  user: User;
}) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      className={styles.chatListCard}
      onClick={() => dispatch(selectConversation(conversation))}
    >
      <Box className={styles.chatListAvatarBox}>
        <Image
          src={conversation.avatar}
          alt={`${conversation.name}`}
          width={48}
          height={48}
          className={styles.chatListAvatar}
        />
      </Box>
      <Box className={styles.chatInfo}>
        <Stack>
          <Typography className={styles.chatName + " " + styles.singleLineClip}>
            {conversation.name}
          </Typography>
          <Typography
            className={styles.chatMessage + " " + styles.singleLineClip}
          >
            {conversation.lastMessage
              ? conversation.lastMessage.content
              : "No message yet"}
          </Typography>
        </Stack>
        {conversation.lastMessage && (
          <Stack className={styles.chatLeftInfo} spacing={1}>
            <Typography
              className={styles.chatTime + " " + styles.singleLineClip}
              sx={{
                color: conversation.lastMessage.readBy[user.id]
                  ? "#1daa61"
                  : "#00000099",
                fontWeight: conversation.lastMessage.readBy[user.id]
                  ? "545"
                  : "400",
              }}
            >
              {moment(conversation.lastMessage.createdAt).format("hh:mm A")}
            </Typography>
            {conversation.lastMessage.readBy[user.id] && (
              <Box className={styles.unReadBadge}>
                {conversation.lastMessage.readBy.length}
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
