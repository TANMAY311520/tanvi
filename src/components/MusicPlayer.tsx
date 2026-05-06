"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { loveConfig } from "@/config/love.config";
import { useMusicPlayer } from "@/context/MusicContext";

export const MusicPlayer: React.FC = () => {
  const {
    isPlaying,
    currentTrack,
    isMuted,
    showPlayer,
    audioRef,
    togglePlayPause,
    nextTrack,
    prevTrack,
    toggleMute,
    togglePlayerVisibility,
  } = useMusicPlayer();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = loveConfig.musicPlaylist[currentTrack]?.src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          console.log("Playback failed - audio file may not exist");
        });
      }
    }
  }, [currentTrack, audioRef, isPlaying]);

  const currentSong = loveConfig.musicPlaylist[currentTrack];

  return (
    <>
      {/* Player Modal */}
      <AnimatePresence>
        {showPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePlayerVisibility}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 rounded-t-3xl p-6 max-w-2xl mx-auto border-t border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={togglePlayerVisibility}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Current Song Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    isPlaying
                      ? { duration: 8, repeat: Infinity, ease: "linear" }
                      : { duration: 0 }
                  }
                  className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-lavender-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-lavender-500/50"
                >
                  <div className="text-6xl">🎵</div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentSong?.title || "Song"}
                </h2>
                <p className="text-purple-400 text-xs mt-2">
                  Track {currentTrack + 1} of {loveConfig.musicPlaylist.length}
                </p>
              </motion.div>

              {/* Player Controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-full p-4 w-fit mx-auto shadow-lg mb-6"
              >
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={prevTrack}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-lavender-600/30 rounded-full transition-colors"
                    title="Previous"
                  >
                    <SkipBack size={20} className="text-lavender-300" />
                  </motion.button>

                  <motion.button
                    onClick={togglePlayPause}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-lavender-600 to-pink-600 rounded-full hover:shadow-glow-lavender transition-all"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause size={24} className="text-white" />
                    ) : (
                      <Play size={24} className="text-white ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={nextTrack}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-lavender-600/30 rounded-full transition-colors"
                    title="Next"
                  >
                    <SkipForward size={20} className="text-lavender-300" />
                  </motion.button>

                  <motion.button
                    onClick={toggleMute}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-lavender-600/30 rounded-full transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX size={20} className="text-lavender-300" />
                    ) : (
                      <Volume2 size={20} className="text-lavender-300" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Playlist Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-sm text-purple-300"
              >
                <p>Playing from {loveConfig.musicPlaylist.length} songs 🎶</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
