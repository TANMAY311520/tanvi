"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";

export default function Intro() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        const currentUser = localStorage.getItem("currentUser");
        router.push(currentUser ? "/home" : "/login");
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 1,
      },
    },
  };

  const fadeOutVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-dark to-dark-deep overflow-hidden z-50"
    >
      <StarField />

      <div className="relative z-10 text-center">
        {/* Tanvi Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center gap-1 mb-8"
        >
          {["T", "a", "n", "v", "i"].map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavender-300 via-pink-light to-lavender-400 drop-shadow-lg"
              style={{
                textShadow: "0 0 30px rgba(155, 114, 170, 0.8)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lavender-300 text-xl font-light"
        >
          <p>A universe built for us 💜</p>
        </motion.div>

        {/* Decorative particles */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-lavender-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 60}%`,
                top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 60}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
