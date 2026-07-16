import { Grid } from "@mui/material";
import styles from "./chats-section.module.css";
import ChatSectionsHeader from "./chats-section/header";
import ChatSearch from "./chats-section/search";
import ChatShortcuts from "./chats-section/shortcuts";
import ChatList from "./chats-section/chats-list";

export default function ChatsSection() {
  return (
    <Grid size={3.726} className={styles.layout}>
      <ChatSectionsHeader />
      <ChatSearch />
      <ChatShortcuts />
      <ChatList />
    </Grid>
  );
}
