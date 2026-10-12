import { Box, Typography } from "@mui/material";
import styles from "./not-selected.module.css";
import aiLogo from "@/public/ai-logo.webp";
import Image from "next/image";

export default function MessageNotSelected() {
  return (
    <Box className={styles.layout}>
      <Box className={styles.iconBox}>
        <Box className={styles.icon}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-description</title>
            <path
              fill="currentColor"
              d="M9 18h6c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71 0-.28-.1-.52-.29-.71A.97.97 0 0 0 15 16H9c-.28 0-.52.1-.71.29A.94.94 0 0 0 8 17c0 .28.1.52.29.71.19.2.43.29.71.29Zm0-4h6c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71 0-.28-.1-.52-.29-.71A.97.97 0 0 0 15 12H9c-.28 0-.52.1-.71.29A.94.94 0 0 0 8 13c0 .28.1.52.29.71.19.2.43.29.71.29Zm-3 8c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V4c0-.55.2-1.02.59-1.41C4.98 2.19 5.45 2 6 2h7.18a1.97 1.97 0 0 1 1.4.58l4.85 4.84a1.94 1.94 0 0 1 .57 1.4V20c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H6Zm7-14V4H6v16h12V9h-4a.97.97 0 0 1-.71-.29A.97.97 0 0 1 13 8Z"
            ></path>
          </svg>
        </Box>
        <Typography className={styles.iconText}>Send document</Typography>
      </Box>
      <Box className={styles.iconBox}>
        <Box className={styles.icon}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-person-add</title>
            <path
              fill="currentColor"
              d="M18 11h-2a.97.97 0 0 1-.71-.29A.97.97 0 0 1 15 10c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h2V7c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.19.29.43.29.71v2h2c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 22 11h-2v2c0 .28-.1.52-.29.71A.94.94 0 0 1 19 14a.97.97 0 0 1-.71-.29A.97.97 0 0 1 18 13v-2Zm-9 1a3.9 3.9 0 0 1-2.83-1.18A3.85 3.85 0 0 1 5 8c0-1.1.4-2.04 1.17-2.83A3.85 3.85 0 0 1 9 4c1.1 0 2.04.4 2.82 1.17A3.85 3.85 0 0 1 13 8c0 1.1-.4 2.04-1.18 2.82A3.85 3.85 0 0 1 9 12Zm-8 6v-.8c0-.57.15-1.09.44-1.56a2.9 2.9 0 0 1 1.16-1.09 13.76 13.76 0 0 1 9.65-1.16c1.07.26 2.12.64 3.15 1.16.48.25.87.61 1.16 1.09.3.47.44 1 .44 1.56v.8c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H3c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41Zm2 0h12v-.8a.97.97 0 0 0-.5-.85c-.9-.45-1.8-.79-2.72-1.01a11.6 11.6 0 0 0-5.55 0c-.92.22-1.83.56-2.73 1.01a.97.97 0 0 0-.5.85v.8Zm6-8c.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41C10.02 6.19 9.55 6 9 6c-.55 0-1.02.2-1.41.59C7.19 6.98 7 7.45 7 8c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59Z"
            ></path>
          </svg>
        </Box>
        <Typography className={styles.iconText}>Add contact</Typography>
      </Box>
      <Box className={styles.iconBox}>
        <Box className={styles.icon}>
          <Image alt="" src={aiLogo} width={24} height={24} />
        </Box>
        <Typography className={styles.iconText}>Send document</Typography>
      </Box>
    </Box>
  );
}
