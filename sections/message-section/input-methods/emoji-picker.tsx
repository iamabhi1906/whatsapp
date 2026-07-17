import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";

interface EmojiPickProps {
  open: boolean;
  onClick: (emojiObject: EmojiClickData) => void;
}

export default function EmojiPick({ open, onClick }: EmojiPickProps) {
  return (
    <EmojiPicker
      onEmojiClick={(emojiObject) => onClick(emojiObject)}
      open={open}
      theme={Theme.AUTO}
      emojiStyle={EmojiStyle.FACEBOOK}
      lazyLoadEmojis={true}
      autoFocusSearch={true}
    />
  );
}
