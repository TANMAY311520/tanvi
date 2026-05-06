"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const validCredentials = {
    tanmay: "tanvi",
    vidhi: "tanvi",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = Object.entries(validCredentials).find(
      ([u, p]) => u === username.toLowerCase() && p === password,
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        user[0].charAt(0).toUpperCase() + user[0].slice(1),
      );
      router.push("/home");
    } else {
      setError("Oops, try again 🥺");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const starVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.3, 0.8, 0.3],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Floating stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-lavender-300 rounded-full"
          variants={starVariants}
          initial="hidden"
          animate="visible"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Welcome Title */}
        <motion.h1
          className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to Tanvi 💜
        </motion.h1>

        <motion.p
          className="text-center text-lavender-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A universe built for us
        </motion.p>

        {/* Login Card */}
        <Card className="space-y-6" glowing={true}>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-lavender-200 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="tanmay or vidhi"
                className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none transition-colors"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-lavender-200 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="tanvi"
                className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none transition-colors"
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="text-pink-light text-sm text-center font-semibold"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="submit"
                className="w-full"
                disabled={!username || !password}
              >
                Enter Our World 💫
              </Button>
            </motion.div>
          </form>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-4 border-t border-lavender-600/30 text-xs text-lavender-400 text-center"
          >
            <p>Try: tanmay / tanvi or vidhi / tanvi</p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
