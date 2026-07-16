import { Box, Grid } from "@mui/material";
import styles from "./page.module.css";
import ToolBar from "@/sections/tool-bar";
import ChatsSection from "@/sections/chats-section";
import MessageSection from "@/sections/message-section";

export default function Home() {
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
