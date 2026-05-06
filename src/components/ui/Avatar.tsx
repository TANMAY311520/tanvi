"use client";

import React from "react";
import { motion } from "framer-motion";

export const Avatar: React.FC<{
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
}> = ({ src, alt, size = "md", online = false }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-lavender-600 to-lavender-800 flex items-center justify-center border-2 border-lavender-400 overflow-hidden`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-bold">{alt[0]}</span>
        )}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
      )}
    </motion.div>
  );
};
