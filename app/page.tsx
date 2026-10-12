"use client";
import { Box, Grid } from "@mui/material";
import styles from "./page.module.css";
import ToolBar from "@/sections/tool-bar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import GoogleLogin from "@/pages/google-login";
import ChatsSection from "@/sections/chats-section/chats-section";
import MessageSection from "@/sections/message-section/message-section";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.users);

  if (!user) return <GoogleLogin />;
  return (
    <Box className={styles.page}>
      <ToolBar />
      <Grid container className={styles.chatsAndMessageSection}>
        <ChatsSection />
        <MessageSection />
      </Grid>
    </Box>
  );
}
