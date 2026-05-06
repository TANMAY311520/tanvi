"use client";

import React from "react";
import { motion } from "framer-motion";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  hover?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = "",
  glowing = false,
  hover = false,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={
        hover ? { y: -8, boxShadow: "0 0 30px rgba(155, 114, 170, 0.6)" } : {}
      }
      onClick={onClick}
      className={`glass rounded-3xl p-6 backdrop-blur ${
        glowing ? "shadow-glow-lavender" : ""
      } ${hover ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};
