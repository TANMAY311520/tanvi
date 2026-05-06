"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { loveConfig } from "@/config/love.config";

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: number;
  isMuted: boolean;
  showPlayer: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;

  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMute: () => void;
  togglePlayerVisibility: () => void;
  setTrack: (index: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Playback failed - audio file may not exist");
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % loveConfig.musicPlaylist.length);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack(
      (prev) =>
        (prev - 1 + loveConfig.musicPlaylist.length) %
        loveConfig.musicPlaylist.length,
    );
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const togglePlayerVisibility = useCallback(() => {
    // Just toggle the modal visibility - don't stop the music
    setShowPlayer(!showPlayer);
  }, [showPlayer]);

  const setTrack = useCallback((index: number) => {
    setCurrentTrack(index);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = loveConfig.musicPlaylist[currentTrack]?.src || "";
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          console.log("Playback failed - audio file may not exist");
        });
      }
    }
  }, [currentTrack, isPlaying]);

  return (
    <MusicContext.Provider
      value={{
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
        setTrack,
      }}
    >
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicProvider");
  }
  return context;
};
