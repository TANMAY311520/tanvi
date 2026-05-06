"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";

const commonEmojis = [
  "😊",
  "😂",
  "😍",
  "😘",
  "😢",
  "😡",
  "😱",
  "😎",
  "🥰",
  "😌",
  "😭",
  "🤔",
  "👀",
  "✨",
  "💫",
  "🌟",
  "❤️",
  "💕",
  "💖",
  "💝",
  "💞",
  "💓",
  "💗",
  "💘",
  "🔥",
  "⭐",
  "👍",
  "👌",
  "🙏",
  "🤝",
  "💪",
  "🎉",
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose?: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  onClose,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setShowPicker(false);
    onClose?.();
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition-colors"
        title="Add emoji"
      >
        <Smile size={18} />
      </motion.button>

      {showPicker && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute bottom-full right-0 mb-2 bg-slate-800 border border-purple-500/30 rounded-2xl p-3 grid grid-cols-8 gap-2 w-80 shadow-xl backdrop-blur-xl"
        >
          {commonEmojis.map((emoji, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(emoji)}
              className="text-xl hover:bg-purple-600/30 p-1 rounded transition-all"
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
