import { Grid } from "@mui/material";
import styles from "./chats-section.module.css";
import ChatSectionsHeader from "./header/header";
import ChatSearch from "./search/search";
import ChatShortcuts from "./shortcuts/shortcuts";
import ChatList from "./chat-list/chats-list";

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
