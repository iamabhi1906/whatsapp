"use client";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, RootState } from "@/app/store";
import { fetchConversation } from "@/features/conversion/conversion.action";

import styles from "./message-section.module.css";
import MessageArea from "./message-area/message-area";
import MessageNotSelected from "./not-selected/not-selected";

export default function MessageSection() {
  const { conversation } = useSelector((state: RootState) => state.conversion);

  const { user } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  const currentUserId = user?.id;
  const targetUserId = conversation?.participant.id;

  useEffect(() => {
    if (!currentUserId || !targetUserId) {
      return;
    }

    dispatch(
      fetchConversation({
        currentUserId,
        targetUserId,
      }),
    );
  }, [dispatch, currentUserId, targetUserId]);

  return (
    <Grid size={8.274} className={styles.layout}>
      {conversation ? <MessageArea /> : <MessageNotSelected />}
    </Grid>
  );
}
