"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterText: React.FC<{
  text: string;
  delay?: number;
  onComplete?: () => void;
}> = ({ text, delay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          onComplete?.();
        }
      }, 20);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, onComplete]);

  return <span>{displayedText}</span>;
};
