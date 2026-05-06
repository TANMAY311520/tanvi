"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, Volume2 } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicContext";

export const FloatingMusicIcon: React.FC = () => {
  const { showPlayer, togglePlayerVisibility, isPlaying } = useMusicPlayer();

  return (
    <motion.button
      onClick={togglePlayerVisibility}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`fixed left-4 top-20 z-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        isPlaying
          ? "bg-gradient-to-br from-pink-500 to-pink-600 shadow-pink-500/50"
          : "bg-gradient-to-br from-lavender-600 to-lavender-700 shadow-lavender-600/30"
      }`}
      title={isPlaying ? "Music is playing 🎵" : "Music is paused 💤"}
    >
      {isPlaying ? (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Volume2 size={20} className="text-white" />
        </motion.div>
      ) : (
        <Music size={20} className="text-white" />
      )}
    </motion.button>
  );
};
