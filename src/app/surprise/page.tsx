"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { Lock, Unlock } from "lucide-react";
import { loveConfig } from "@/config/love.config";

export default function SurprisePage() {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const handleUnlock = () => {
    if (password === loveConfig.surprisePassword) {
      setIsLocked(false);
      setPassword("");
      setError("");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    } else {
      setError("Not yet, baby 🥺");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6 flex items-center justify-center">
      <ConfettiBurst trigger={confetti} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {isLocked ? (
          // Locked State
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Card glowing={true} className="text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl flex justify-center"
              >
                <Lock size={80} className="text-lavender-600" />
              </motion.div>

              <h1 className="text-3xl font-bold text-lavender-200">
                A Surprise for You 💜
              </h1>

              <p className="text-lavender-300">
                This one's locked. Enter the password to unlock your surprise.
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleUnlock()}
                  placeholder="Enter password..."
                  className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none text-center text-lg tracking-widest"
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-pink-light text-sm font-semibold"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  onClick={handleUnlock}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-lavender-600 to-lavender-500 text-white hover:shadow-glow-lavender transition-all"
                  disabled={!password}
                >
                  Unlock 🔓
                </motion.button>
              </div>

              <p className="text-xs text-lavender-400">
                Hint: Think of her name 😉
              </p>
            </Card>
          </motion.div>
        ) : (
          // Unlocked State
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Card glowing={true} className="text-center space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="text-6xl flex justify-center"
              >
                <Unlock size={80} className="text-pink-light" />
              </motion.div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent">
                You Found It! 💫
              </h1>

              <motion.div
                className="aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src="https://picsum.photos/400/400?random=surprise"
                  alt="Surprise"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.p
                className="text-lg text-lavender-200 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                "{loveConfig.surpriseMessage}"
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="text-5xl"
              >
                💜
              </motion.div>

              <motion.button
                onClick={() => {
                  setIsLocked(true);
                  setPassword("");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 rounded-2xl font-semibold bg-lavender-900/40 text-lavender-200 hover:bg-lavender-800/60 transition-all"
              >
                Lock Again 🔒
              </motion.button>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
