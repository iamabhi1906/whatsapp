"use client";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import styles from "./header.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { logout } from "@/features/users/user.slice";

export default function ChatSectionsHeader() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box className={styles.header}>
      <Box>
        <svg
          viewBox="0 0 104 28"
          height="28"
          width="104"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <title>wa-wordmark-refreshed</title>
          <path
            fill="#1daa61"
            d="m69.56 15.13 2.05-6.26 2.07 6.26h-4.12Zm28.8 3.94c-1.49 0-2.33-1.04-2.33-3.16v-.54c0-1.92.89-3.09 2.42-3.09 1.25 0 2.27.89 2.27 3.35s-.93 3.44-2.36 3.44Zm-5.55 6.43h3.2v-5.36a3.82 3.82 0 0 0 3.15 1.52c2.98 0 4.84-2.34 4.84-6.12 0-3.77-1.6-5.85-4.62-5.85-1.5 0-2.61.54-3.46 1.67v-1.32h-3.1V25.5Zm-7.04-6.43c-1.49 0-2.33-1.04-2.33-3.16v-.54c0-1.92.89-3.09 2.42-3.09 1.25 0 2.27.89 2.27 3.35s-.93 3.44-2.36 3.44Zm-5.55 6.43h3.2v-5.36a3.82 3.82 0 0 0 3.15 1.52c2.98 0 4.84-2.34 4.84-6.12 0-3.77-1.6-5.85-4.62-5.85-1.5 0-2.61.54-3.46 1.67v-1.32h-3.1V25.5Zm-16.06-4.19h3.41l1.14-3.41h5.81l1.15 3.41h3.52L73.69 5.9h-4l-5.53 15.42Zm-5.42.35c3.26 0 4.92-1.34 4.92-3.54S62.62 15 59.64 14.5l-1.4-.24c-1.2-.2-1.58-.58-1.58-1.2 0-.63.48-1.13 1.84-1.13 1.27 0 1.8.47 2 1.68h2.99c-.17-2.57-1.82-3.93-4.99-3.93-2.96 0-4.86 1.28-4.86 3.46 0 2.18 1.27 3.02 4.13 3.5l1.3.21c1.18.2 1.46.63 1.46 1.28 0 .75-.5 1.23-1.86 1.23s-2.14-.52-2.26-1.7h-3.05c.1 2.8 2.16 3.99 5.38 3.99Zm-8.86-.09c1 0 2.01-.28 2.62-.7v-2.41c-.6.34-1.2.52-1.73.52-.93 0-1.43-.39-1.43-1.58v-4.86h3.16v-2.5h-3.16V6.93H46.5v1.73c0 .97-.23 1.38-1.2 1.38h-.85v2.5h1.7v4.97c0 2.61 1 4.06 3.74 4.06Zm-11.96-2.16c-1.04 0-1.62-.45-1.62-1.25 0-.9.67-1.34 2.22-1.6a4.98 4.98 0 0 0 2.06-.7v1.11c0 1.49-1.06 2.44-2.66 2.44Zm-.82 2.25c1.66 0 2.83-.7 3.74-1.7.1.53.3.98.56 1.35h3.02c-.54-.84-.78-2.1-.78-3.76v-3.6c0-2.68-1.42-4.26-4.8-4.26-2.97 0-4.72 1.23-5.07 3.93h2.92c.17-1.03.8-1.64 2.05-1.64 1.17 0 1.84.48 1.84 1.3 0 .82-.5 1.1-2.7 1.42-2.4.35-4.6 1.21-4.6 3.63 0 2.16 1.53 3.33 3.82 3.33Zm-15.61-.35h3.2v-6.6c0-.79.19-1.15.66-1.63a2.5 2.5 0 0 1 1.77-.73c1.06 0 1.62.58 1.62 2v6.96h3.2v-7.56c0-2.61-1.3-4.06-3.74-4.06-1.25 0-2.42.4-3.52 1.69V5.89h-3.2v15.42Zm-17.34 0h3.52l2.55-11.12 2.59 11.12h3.56L20.45 5.9h-3.54l-2.42 11.38-2.59-11.3H8.7L6.07 17.33 3.65 5.89H0l4.15 15.42Z"
          ></path>
        </svg>
      </Box>
      <Stack direction={"row"} spacing={2}>
        <IconButton className={styles.headerIcon}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="#070604"
          >
            <title>new-chat-outline</title>
            <path
              fill="#070604"
              d="M9.53 13h1.98v1.97c0 .43.25.85.67.98a1 1 0 0 0 1.31-.94v-2.02h1.98c.43 0 .85-.25.98-.67a1 1 0 0 0-.94-1.31h-2.02V9.03c0-.43-.25-.85-.67-.98a1 1 0 0 0-1.31.94v2.02H9.49a1 1 0 0 0-.94 1.31c.13.42.55.67.98.67Z"
            ></path>
            <path
              fill="#070604"
              fillRule="evenodd"
              d="M.94 5.53 3 8.85v8.48C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53ZM5 8.28v9.05c0 .37.3.67.67.67h13.66c.37 0 .67-.3.67-.67V6.67c0-.37-.3-.67-.67-.67H3.6L5 8.28Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </IconButton>
        <IconButton
          aria-describedby={id}
          className={styles.headerIcon}
          onClick={handleClick}
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="#070604"
          >
            <title>ic-more-vert</title>
            <path
              fill="#070604"
              d="M12 20c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41 0-.55.2-1.02.59-1.41.39-.4.86-.59 1.41-.59.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41 0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59Zm0-6c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41 0-.55.2-1.02.59-1.41.39-.4.86-.59 1.41-.59.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41 0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59Zm0-6c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41 0-.55.2-1.02.59-1.41.39-.4.86-.59 1.41-.59.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41 0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59Z"
            ></path>
          </svg>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className={styles.popoverBox}
          slotProps={{
            paper: {
              elevation: 2,
              sx: {
                width: "177px",
                borderRadius: "16px",
                padding: "4px",
                gap: "4px",
                fontSize: "16px",
              },
            },
          }}
        >
          {/* Group */}
          <Button variant="text" fullWidth className={styles.popoverButton}>
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-group-add</title>
              <path
                fill="currentColor"
                d="M12.5 11.95a5.96 5.96 0 0 0 0-7.9c1 .13 1.83.57 2.5 1.32.67.75 1 1.63 1 2.63s-.33 1.88-1 2.63a3.97 3.97 0 0 1-2.5 1.32ZM17.45 20a3.65 3.65 0 0 0 .55-2v-1c0-.6-.13-1.17-.4-1.71a5.11 5.11 0 0 0-1.05-1.44c.85.3 1.64.69 2.36 1.16A2.25 2.25 0 0 1 20 17v1c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59h-.55ZM20 11h-1a.97.97 0 0 1-.71-.29A.97.97 0 0 1 18 10c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h1V8c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.19.29.43.29.71v1h1c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 23 11h-1v1c0 .28-.1.52-.29.71A.94.94 0 0 1 21 13a.97.97 0 0 1-.71-.29A.97.97 0 0 1 20 12v-1ZM8 12a3.9 3.9 0 0 1-2.83-1.18A3.85 3.85 0 0 1 4 8c0-1.1.4-2.04 1.17-2.83A3.85 3.85 0 0 1 8 4c1.1 0 2.04.4 2.82 1.17A3.85 3.85 0 0 1 12 8c0 1.1-.4 2.04-1.18 2.82A3.85 3.85 0 0 1 8 12Zm-8 6v-.8c0-.57.15-1.09.44-1.56a2.9 2.9 0 0 1 1.16-1.09 13.76 13.76 0 0 1 9.65-1.16c1.07.26 2.12.64 3.15 1.16.48.25.87.61 1.16 1.09.3.47.44 1 .44 1.56v.8c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H2c-.55 0-1.02-.2-1.41-.59C.19 19.02 0 18.55 0 18Zm8-8c.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41C9.02 6.19 8.55 6 8 6c-.55 0-1.02.2-1.41.59C6.19 6.98 6 7.45 6 8c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59Zm-6 8h12v-.8a.97.97 0 0 0-.5-.85c-.9-.45-1.8-.79-2.72-1.01a11.6 11.6 0 0 0-5.55 0c-.92.22-1.83.56-2.73 1.01a.97.97 0 0 0-.5.85v.8Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              Add Group
            </Typography>
          </Button>

          {/* StarredMessages */}
          <Button variant="text" fullWidth className={styles.popoverButton}>
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-grade</title>
              <path
                fill="currentColor"
                d="m8.85 16.82 3.15-1.9 3.15 1.93-.83-3.6 2.78-2.4-3.65-.32L12 7.13l-1.45 3.37-3.65.32 2.78 2.43-.83 3.57Zm3.15.45-4.15 2.5a.9.9 0 0 1-.57.15.97.97 0 0 1-.53-.2 1.2 1.2 0 0 1-.35-.43.87.87 0 0 1-.05-.59l1.1-4.72-3.67-3.18a.96.96 0 0 1-.28-1.08c.07-.18.17-.33.3-.45.13-.11.32-.19.55-.22l4.85-.43 1.88-4.45a.9.9 0 0 1 .38-.45c.18-.1.36-.15.54-.15.18 0 .36.05.54.15.17.1.3.25.39.45l1.87 4.45 4.85.43c.23.03.42.1.55.22a1.07 1.07 0 0 1 .34 1.02.96.96 0 0 1-.31.51l-3.68 3.17 1.1 4.73a.9.9 0 0 1-.05.59c-.08.17-.2.32-.35.44a.97.97 0 0 1-.52.2.9.9 0 0 1-.58-.16L12 17.27Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              Starred messages
            </Typography>
          </Button>

          {/* Select Chat */}
          <Button variant="text" fullWidth className={styles.popoverButton}>
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-check-box</title>
              <path
                fill="currentColor"
                d="m10.6 13.4-2.15-2.15a.95.95 0 0 0-.7-.28.95.95 0 0 0-.97.97c0 .3.09.53.27.71L9.9 15.5a.96.96 0 0 0 1.4 0l5.65-5.65a.95.95 0 0 0 .28-.7.95.95 0 0 0-.98-.97.96.96 0 0 0-.7.27L10.6 13.4ZM5 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41C3.98 3.19 4.45 3 5 3h14c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v14c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H5Zm0-2h14V5H5v14Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              Select chats
            </Typography>
          </Button>

          {/* mark all as read */}
          <Button variant="text" fullWidth className={styles.popoverButton}>
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>wds-ic-chat</title>
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 9 .94 5.53A1 1 0 0 1 1.79 4h17.54C20.81 4 22 5.2 22 6.67v10.66c0 1.48-1.2 2.67-2.67 2.67H5.67A2.67 2.67 0 0 1 3 17.33V9Zm2-.55L3.53 6h15.8c.37 0 .67.3.67.67v10.66c0 .37-.3.67-.67.67H5.67a.67.67 0 0 1-.67-.67V8.45Z"
                clipRule="evenodd"
              ></path>
              <path
                fill="currentColor"
                d="M7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              Mark all as read
            </Typography>
          </Button>

          <Divider />

          {/* App lock */}
          <Button variant="text" fullWidth className={styles.popoverButton}>
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-lock</title>
              <path
                fill="currentColor"
                d="M6 22c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V10c0-.55.2-1.02.59-1.41C4.98 8.19 5.45 8 6 8h1V6c0-1.38.49-2.56 1.46-3.54A4.82 4.82 0 0 1 12 1c1.38 0 2.56.49 3.54 1.46A4.82 4.82 0 0 1 17 6v2h1c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v10c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H6Zm0-2h12V10H6v10Zm6-3c.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41-.39-.4-.86-.59-1.41-.59-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41 0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59ZM9 8h6V6c0-.83-.3-1.54-.88-2.13A2.9 2.9 0 0 0 12 3c-.83 0-1.54.3-2.13.88A2.9 2.9 0 0 0 9 6v2Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              App lock
            </Typography>
          </Button>

          {/* Logout */}
          <Button
            variant="text"
            fullWidth
            className={styles.popoverButton}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <SvgIcon
              sx={{
                height: 18,
                width: 18,
              }}
              viewBox="0 0 24 24"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-logout</title>
              <path
                fill="currentColor"
                d="M5 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41C3.98 3.19 4.45 3 5 3h6c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 11 5H5v14h6c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 11 21H5Zm12.18-8H10a.97.97 0 0 1-.71-.29A.97.97 0 0 1 9 12c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h7.18L15.3 9.12a1 1 0 0 1 .7-1.69c.28 0 .52.1.73.3l3.57 3.57a.96.96 0 0 1 0 1.4l-3.57 3.57c-.2.2-.44.3-.72.3a1.08 1.08 0 0 1-.71-.32.97.97 0 0 1-.26-.71c0-.28.1-.5.29-.69L17.18 13Z"
              ></path>
            </SvgIcon>
            <Typography className={styles.popoverButtonText}>
              Log out
            </Typography>
          </Button>
        </Popover>
      </Stack>
    </Box>
  );
}
