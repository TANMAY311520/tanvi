"use client";

import React from "react";
import { motion } from "framer-motion";

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-lavender-600 to-lavender-500 text-white hover:shadow-glow-lavender hover:-translate-y-1 active:scale-95",
    secondary:
      "bg-lavender-800 text-lavender-200 hover:bg-lavender-700 hover:shadow-glow-lavender hover:-translate-y-1 active:scale-95",
    danger:
      "bg-red-500 text-white hover:bg-red-600 hover:shadow-glow-pink active:scale-95",
  };

  return (
    <motion.button
      whileHover={!disabled ? { y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
