"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MoreVertical } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface ChatMessageProps {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  isCurrentUser: boolean;
  reactions?: Reaction[];
  onAddReaction: (emoji: string) => void;
  onReply?: () => void;
  currentUser: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  sender,
  text,
  timestamp,
  isCurrentUser,
  reactions = [],
  onAddReaction,
  onReply,
  currentUser,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const hasHeart = reactions.some((r) => r.emoji === "❤️");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} gap-2 group`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          isCurrentUser ? "order-2" : "order-1"
        }`}
      >
        <div
          className={`relative inline-block px-4 py-2 rounded-xl shadow-md transition-all ${
            isCurrentUser
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-none"
              : "bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-bl-none"
          }`}
        >
          <p className="break-words text-sm md:text-base leading-relaxed">
            {text}
          </p>

          {/* Reaction bubbles below message */}
          {reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/20">
              {reactions.map((reaction, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddReaction(reaction.emoji)}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full text-xs transition-all"
                  title={`Reacted by: ${reaction.users.join(", ")}`}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <p
          className={`text-xs mt-1 opacity-60 ${
            isCurrentUser ? "text-right text-purple-300" : "text-pink-300"
          }`}
        >
          {formatTime(timestamp)}
        </p>
      </div>

      {/* Action buttons - visible on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showActions ? 1 : 0,
          scale: showActions ? 1 : 0.8,
        }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={`${isCurrentUser ? "order-1" : "order-2"} flex gap-1 items-start pt-1`}
      >
        {/* Heart reaction quick button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onAddReaction("❤️");
            setShowActions(false);
          }}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            hasHeart
              ? "bg-pink-500/80 text-white"
              : "bg-slate-700/60 hover:bg-slate-600 text-pink-300"
          }`}
          title="React with ❤️"
        >
          <Heart size={16} fill={hasHeart ? "currentColor" : "none"} />
        </motion.button>

        {/* More emoji reactions */}
        <div
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <EmojiPicker
            onEmojiSelect={onAddReaction}
            onClose={() => setShowActions(false)}
          />
        </div>

        {/* More options */}
        {onReply && (
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReply}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/60 hover:bg-slate-600 transition-all text-purple-300"
            title="Reply"
          >
            <MoreVertical size={16} />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};
