import { Chip, Stack } from "@mui/material";
import styles from "./shortcuts.module.css";
// import AddIcon from "@mui/icons-material/Add";

export default function ChatShortcuts() {
  const unreadCount = 4;
  const numberOfGroups = 3;
  return (
    <Stack className={styles.layout} direction={"row"}>
      <Chip label="All" variant="outlined" className={styles.chips} />
      <Chip
        label={`Unread ${unreadCount}`}
        variant="outlined"
        className={styles.chips}
      />
      <Chip label="Favorites" variant="outlined" className={styles.chips} />
      <Chip
        label={`Groups ${numberOfGroups}`}
        variant="outlined"
        className={styles.chips}
      />
      <Chip label={`Communities`} variant="outlined" className={styles.chips} />
      {/* <Chip icon={<AddIcon />} variant="outlined" label="" /> */}
    </Stack>
  );
}
