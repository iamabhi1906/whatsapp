"use client";

import { Grid } from "@mui/material";
import styles from "./message-section.module.css";
import MessageNotSelected from "./message-section/not-selected";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import MessageArea from "./message-section/message-area";
import { useEffect } from "react";
import { fetchConversation } from "@/features/conversion/conversion.action";

export default function MessageSection() {
  const { conversation } = useSelector((state: RootState) => state.conversion);
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (conversation && user)
      dispatch(
        fetchConversation({
          currentUserId: user.id,
          targetUserId: conversation.participant.id,
        }),
      );
  }, [dispatch, conversation, user]);

  return (
    <Grid size={8.274} className={styles.layout}>
      {conversation ? <MessageArea /> : <MessageNotSelected />}
    </Grid>
  );
}
