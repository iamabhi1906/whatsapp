import { RootState } from "@/app/store";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./message-area.module.css";
import MessageAreaHeader from "./header";
import MessageTextInput from "./input-box";

export default function MessageArea() {
  const { messages } = useSelector((state: RootState) => state.messages);
  const { chat } = useSelector((state: RootState) => state.chats);
  if (!chat) return;
  return (
    <Box className={styles.layout}>
      <MessageAreaHeader chat={chat} />
      <Box className={styles.messageViewArea}>{JSON.stringify(messages)}</Box>
      <MessageTextInput />
    </Box>
  );
}
