"use client";

import { Grid } from "@mui/material";
import styles from "./message-section.module.css";
import MessageNotSelected from "./message-section/not-selected";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import MessageArea from "./message-section/message-area";
import { useEffect } from "react";
import { getChatMessages } from "@/features/messages/message.actions";

export default function MessageSection() {
  const { chat } = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (chat) dispatch(getChatMessages({ chatId: chat.id }));
  }, [dispatch, chat]);

  return (
    <Grid size={8.274} className={styles.layout}>
      {chat ? <MessageArea /> : <MessageNotSelected />}
    </Grid>
  );
}
