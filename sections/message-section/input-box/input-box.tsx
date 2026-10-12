"use state";
import { Box, IconButton, InputBase, SvgIcon } from "@mui/material";
import styles from "./input-box.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { asyncSendMessages } from "@/features/messages/message.actions";
import { sendMessageArg } from "@/services/messages/send-message";
import { MessageTypes } from "@/features/messages/messages.types";
import EmojiPick from "../input-methods/emoji-picker";

interface MessageInputPros {
  conversationId: string;
  userId: string;
}

export default function MessageInput({
  conversationId,
  userId,
}: MessageInputPros) {
  const [value, setValue] = useState<string>("");
  const [emojiPopup, setEmojiPopup] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onSend = () => {
    console.log("Message sent", value);
    const payload: sendMessageArg = {
      type: MessageTypes.TEXT,
      content: value,
      conversationId,
      senderId: userId,
    };
    dispatch(asyncSendMessages(payload));
    setValue("");
  };
  const handleEmojiToggle = () => {
    console.log("I am clicked");
    setEmojiPopup((prev) => !prev);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box className={styles.container}>
      <IconButton size="small">
        <SvgIcon
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <title>plus-rounded</title>
          <path
            fill="currentColor"
            d="M11 13H5.5a1 1 0 1 1 0-2H11V5.5a1 1 0 1 1 2 0V11h5.5a1 1 0 1 1 0 2H13v5.5a1 1 0 1 1-2 0V13Z"
          ></path>
        </SvgIcon>
      </IconButton>

      <IconButton size="small" onClick={handleEmojiToggle}>
        <SvgIcon
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          fill="currentColor"
        >
          <title>wds-ic-sticker-smiley</title>
          <path
            fill="currentColor"
            d="M8.5 10.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          ></path>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M16.82 19.98A6.97 6.97 0 0 1 12 22H9.27A7.27 7.27 0 0 1 2 14.73V9.27A7.27 7.27 0 0 1 9.27 2h5.46A7.27 7.27 0 0 1 22 9.27v2.54c0 1.94-.77 3.8-2.15 5.17l-3.03 3ZM14.72 4H9.28A5.27 5.27 0 0 0 4 9.27v5.46A5.27 5.27 0 0 0 9.27 20h2.06a.9.9 0 0 0 .68-.88l-.02-2.26v-.11a5.5 5.5 0 0 1-4.65-2.6.6.6 0 0 1 .03-.6c.12-.2.3-.3.53-.3h5.7a4.8 4.8 0 0 1 3.22-1.23l2.26.01c.5 0 .9-.4.9-.9V9.07H20A5.27 5.27 0 0 0 14.73 4Zm-.71 15.11c0 .15-.01.3-.04.44a4.96 4.96 0 0 0 1.44-.99l3.03-3c.46-.46.83-.99 1.09-1.56-.15.02-.3.03-.46.03h-2.26A2.8 2.8 0 0 0 14 16.84l.02 2.26Z"
            clipRule="evenodd"
          ></path>
        </SvgIcon>
      </IconButton>

      <InputBase
        value={value}
        onChange={onChange}
        placeholder="Type a message"
        onKeyDown={handleKeyDown}
        className={styles.input}
        multiline
        maxRows={5}
      />

      <IconButton className={styles.sendButton} onClick={onSend}>
        {value.trim() ? (
          <SvgIcon
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <title>wds-ic-send-filled</title>
            <path
              fill="currentColor"
              d="M5.4 19.43a.99.99 0 0 1-.95-.1.93.93 0 0 1-.45-.83V14l8-2-8-2V5.5c0-.37.15-.65.45-.84a1 1 0 0 1 .95-.09l15.4 6.5c.42.19.63.5.63.93 0 .43-.21.74-.63.93l-15.4 6.5Z"
            ></path>
          </SvgIcon>
        ) : (
          <SvgIcon
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
          >
            <title>mic-outlined</title>
            <path
              fill="currentColor"
              d="M12 14a2.9 2.9 0 0 1-2.13-.88A2.9 2.9 0 0 1 9 11V5c0-.83.3-1.54.88-2.13A2.9 2.9 0 0 1 12 2c.83 0 1.54.3 2.13.88.58.58.87 1.29.87 2.12v6c0 .83-.3 1.54-.88 2.13A2.9 2.9 0 0 1 12 14Zm0 7a1 1 0 0 1-1-1v-2.07a6.66 6.66 0 0 1-4.3-2.33A6.79 6.79 0 0 1 5.06 12c-.07-.55.39-1 .94-1 .55 0 .99.45 1.09 1a4.8 4.8 0 0 0 1.37 2.54A4.82 4.82 0 0 0 12 16c1.38 0 2.56-.49 3.54-1.46a4.8 4.8 0 0 0 1.37-2.55c.1-.54.54-.99 1.09-.99s1 .45.94 1a6.8 6.8 0 0 1-1.64 3.6 6.66 6.66 0 0 1-4.3 2.33V20a1 1 0 0 1-1 1Zm0-9c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71V5c0-.28-.1-.52-.29-.71A.97.97 0 0 0 12 4c-.28 0-.52.1-.71.29A.94.94 0 0 0 11 5v6c0 .28.1.52.29.71.19.2.43.29.71.29Z"
            ></path>
          </SvgIcon>
        )}
      </IconButton>

      {emojiPopup && (
        <Box className={styles.emojiPicker}>
          <EmojiPick
            open={emojiPopup}
            onClick={(emojiData) => setValue((prev) => prev + emojiData.emoji)}
          />
        </Box>
      )}
    </Box>
  );
}
