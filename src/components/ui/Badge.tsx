"use client";

import React from "react";
import { motion } from "framer-motion";

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";
  className?: string;
}> = ({ children, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-lavender-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    danger: "bg-red-600 text-white",
  };

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
};
