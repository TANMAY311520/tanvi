"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { loveConfig } from "@/config/love.config";

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [stats, setStats] = useState({
    memories: 0,
    letters: 0,
    messages: 0,
    places: 0,
    dreams: 0,
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    setCurrentUser(user);

    // Load stats
    const letters = JSON.parse(localStorage.getItem("tanvi_letters") || "[]");
    const messages = JSON.parse(localStorage.getItem("tanvi_chitchat") || "[]");
    const places = JSON.parse(
      localStorage.getItem("tanvi_places") || JSON.stringify(loveConfig.places),
    );
    const dreams = JSON.parse(
      localStorage.getItem("tanvi_dreams") || JSON.stringify(loveConfig.dreams),
    );

    setStats({
      memories: 4, // Static for now
      letters: letters.length,
      messages: messages.length,
      places: places.length,
      dreams: dreams.length,
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const handleClearData = () => {
    if (
      confirm(
        "Clear all app data? This will reset everything. Are you sure? 😢",
      )
    ) {
      localStorage.removeItem("dailyMessage");
      localStorage.removeItem("tanvi_letters");
      localStorage.removeItem("tanvi_chitchat");
      localStorage.removeItem("tanvi_checked_foods");
      localStorage.removeItem("tanvi_places");
      localStorage.removeItem("tanvi_dreams");
      alert("All data cleared. Refresh to see the reset app.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        My Profile 👤
      </motion.h1>

      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* User Card */}
          <motion.div variants={itemVariants}>
            <Card glowing={true} className="text-center space-y-4">
              <Avatar alt={currentUser} size="lg" />
              <div>
                <h2 className="text-3xl font-bold text-lavender-200">
                  {currentUser}
                </h2>
                <p className="text-lavender-400 mt-2">Welcome to Tanvi 💜</p>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              { label: "Memories", value: stats.memories, emoji: "📸" },
              { label: "Letters", value: stats.letters, emoji: "💌" },
              { label: "Messages", value: stats.messages, emoji: "💬" },
              { label: "Places", value: stats.places, emoji: "🗺️" },
              { label: "Dreams", value: stats.dreams, emoji: "💭" },
              {
                label: "Days Together",
                value: Math.floor(
                  (Date.now() - new Date(loveConfig.startDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                ),
                emoji: "📅",
              },
            ].map((stat) => (
              <motion.div key={stat.label} whileHover={{ scale: 1.05 }}>
                <Card className="text-center p-4">
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <p className="text-2xl font-bold text-lavender-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-lavender-400 mt-1">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* App Info */}
          <motion.div variants={itemVariants}>
            <Card className="space-y-3">
              <h3 className="text-lg font-semibold text-lavender-200">
                About Tanvi
              </h3>
              <div className="space-y-2 text-sm text-lavender-300">
                <p>
                  <span className="font-semibold">App Name:</span>{" "}
                  {loveConfig.appName}
                </p>
                <p>
                  <span className="font-semibold">His Name:</span>{" "}
                  {loveConfig.names.tanmay}
                </p>
                <p>
                  <span className="font-semibold">Her Name:</span>{" "}
                  {loveConfig.names.vidhi}
                </p>
                <p>
                  <span className="font-semibold">Our Journey Started:</span>{" "}
                  {loveConfig.startDate}
                </p>
                <p>
                  <span className="font-semibold">Version:</span> 1.0.0
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Settings Card */}
          <motion.div variants={itemVariants}>
            <Card className="space-y-3">
              <h3 className="text-lg font-semibold text-lavender-200">
                Settings
              </h3>
              <p className="text-sm text-lavender-400">
                🎵 Music player is available on all pages (bottom left)
              </p>
              <p className="text-sm text-lavender-400">
                💜 Your messages are stored locally in your browser
              </p>
              <p className="text-sm text-lavender-400">
                🔒 This is a private app for you two ✨
              </p>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-3">
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full"
            >
              Logout 👋
            </Button>
            <Button
              onClick={handleClearData}
              variant="danger"
              className="w-full"
            >
              Clear All Data 🗑️
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-lavender-400 text-sm">
              Made with 💜 for the two of us
            </p>
            <p className="text-lavender-500 text-xs mt-2">
              © 2024 Tanvi. All moments are special.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
