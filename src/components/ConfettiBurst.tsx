"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Confetti {
  id: number;
  left: number;
  delay: number;
}

export const ConfettiBurst: React.FC<{ trigger?: boolean }> = ({
  trigger = false,
}) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (trigger && !isTriggered) {
      const burst = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
      }));
      setConfetti(burst);
      setIsTriggered(true);

      setTimeout(() => {
        setConfetti([]);
        setIsTriggered(false);
      }, 3000);
    }
  }, [trigger, isTriggered]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl"
          style={{ left: `${item.left}%` }}
          initial={{ top: "50%", opacity: 1, rotate: 0 }}
          animate={{
            top: -20,
            opacity: 0,
            rotate: 360,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2.5,
            delay: item.delay,
            ease: "easeOut",
          }}
        >
          {["🎉", "✨", "💜", "💕"][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </div>
  );
};
