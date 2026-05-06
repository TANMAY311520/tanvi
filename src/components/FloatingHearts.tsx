"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  left: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 4000);
    };

    const interval = setInterval(generateHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-3xl"
          style={{ left: `${heart.left}%` }}
          initial={{ bottom: 0, opacity: 0.8 }}
          animate={{ bottom: window.innerHeight, opacity: 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          💜
        </motion.div>
      ))}
    </div>
  );
};
