"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { FloatingHearts } from "@/components/FloatingHearts";
import { loveConfig } from "@/config/love.config";
import { Trash2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [dailyMessage, setDailyMessage] = useState("");
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [tanmayMood, setTanmayMood] = useState("");
  const [vidhiMood, setVidhiMood] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [memories, setMemories] = useState<any[]>([]);
  const [daysTogether, setDaysTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsHydrated(true);
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    // Load daily message
    const saved = localStorage.getItem("dailyMessage");
    setDailyMessage(saved || "You are my favorite person 💜");
    setNewMessage(saved || "You are my favorite person 💜");

    // Load moods
    const tanmayMoodSaved = localStorage.getItem("mood_Tanmay_today");
    const vidhiMoodSaved = localStorage.getItem("mood_Vidhi_today");
    if (tanmayMoodSaved) setTanmayMood(tanmayMoodSaved);
    if (vidhiMoodSaved) setVidhiMood(vidhiMoodSaved);

    // Load memories from timeline page only
    const loadMemories = () => {
      const savedMemories = localStorage.getItem("tanvi_memories");
      if (savedMemories) {
        const allMemories = JSON.parse(savedMemories);
        // Filter out System memories and show only user-added ones, first 4
        const userMemories = allMemories.filter(
          (m: any) => m.addedBy !== "System",
        );
        setMemories(userMemories.slice(0, 4));
      } else {
        // No memories saved yet - don't show any
        setMemories([]);
      }
    };

    loadMemories();
    const interval = setInterval(loadMemories, 1000);
    return () => clearInterval(interval);
  }, [router]);

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const startDate = new Date(loveConfig.startDate);
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setDaysTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveMessage = () => {
    localStorage.setItem("dailyMessage", newMessage);
    setDailyMessage(newMessage);
    setIsEditingMessage(false);
  };

  const handleDeleteMemory = (id: string) => {
    if (confirm("Delete this memory? 💔")) {
      const allMemories = JSON.parse(
        localStorage.getItem("tanvi_memories") || "[]",
      );
      const updated = allMemories.filter((memory: any) => memory.id !== id);
      localStorage.setItem("tanvi_memories", JSON.stringify(updated));
      // Update display - filter System memories again
      const userMemories = updated.filter((m: any) => m.addedBy !== "System");
      setMemories(userMemories.slice(0, 4));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6">
      <FloatingHearts />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Our World - Avatar Row */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-lavender-200 mb-4">
            Our World 💜
          </h2>
          <div className="flex flex-col items-center gap-6">
            {/* Avatars with equation */}
            <div className="flex gap-6 justify-center items-center">
              <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
                <Avatar alt="Tanmay" size="lg" />
                <p className="text-lavender-300 text-sm mt-3 font-semibold">
                  Tanmay
                </p>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl text-pink-light font-bold"
              >
                +
              </motion.div>
              <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
                <Avatar alt="Vidhi" size="lg" />
                <p className="text-lavender-300 text-sm mt-3 font-semibold">
                  Vidhi
                </p>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-3xl text-lavender-400 font-bold"
              >
                =
              </motion.div>
              <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-light to-lavender-600 flex items-center justify-center border-2 border-lavender-400 shadow-glow-lavender">
                  <span className="text-3xl font-bold text-white">✨</span>
                </div>
                <p className="text-lavender-300 text-sm mt-3 font-semibold bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent">
                  Tanvi
                </p>
              </motion.div>
            </div>

            {/* Beautiful tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lavender-300 italic text-center text-sm mt-2"
            >
              "A love story written in the stars"
            </motion.p>
          </div>
        </motion.div>

        {/* Days Together Counter */}
        <motion.div variants={itemVariants}>
          <Card glowing={true} className="text-center">
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent mb-4">
                Days Together 💜
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {isHydrated
                  ? [
                      { label: "Days", value: daysTogether.days },
                      { label: "Hrs", value: daysTogether.hours },
                      { label: "Min", value: daysTogether.minutes },
                      { label: "Sec", value: daysTogether.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-lavender-900/40 rounded-lg p-3"
                      >
                        <div className="text-2xl font-bold text-lavender-300">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs text-lavender-400">
                          {item.label}
                        </div>
                      </div>
                    ))
                  : [
                      { label: "Days" },
                      { label: "Hrs" },
                      { label: "Min" },
                      { label: "Sec" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-lavender-900/40 rounded-lg p-3"
                      >
                        <div className="text-2xl font-bold text-lavender-300">
                          00
                        </div>
                        <div className="text-xs text-lavender-400">
                          {item.label}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Romantic Message */}
        <motion.div variants={itemVariants}>
          <Card hover={true} className="text-center">
            {isEditingMessage ? (
              <div className="space-y-3">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white focus:border-lavender-400 focus:outline-none min-h-24"
                  placeholder="Write a message..."
                />
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleSaveMessage}
                    className="px-4 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingMessage(false)}
                    className="px-4 py-2 bg-lavender-900 text-lavender-200 rounded-lg hover:bg-lavender-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingMessage(true)}
                className="cursor-pointer"
              >
                <p className="text-lavender-200 text-lg italic mb-2">
                  "{dailyMessage}"
                </p>
                <p className="text-sm text-lavender-400">Click to edit</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Our Memories Grid */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-lavender-200">
              Our Memories 📸
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/timeline")}
              className="text-sm text-lavender-400 hover:text-lavender-300 transition-colors"
            >
              View All →
            </motion.button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {memories.length > 0 ? (
              memories.map((memory) => (
                <motion.div
                  key={memory.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl overflow-hidden glass cursor-pointer group relative"
                >
                  <div className="aspect-square bg-gradient-to-br from-lavender-600 to-lavender-800 flex items-center justify-center relative">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/200/200?random=${memory.id}`;
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-1 text-pink-light text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {memory.title}
                    </div>

                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteMemory(memory.id);
                      }}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete memory"
                    >
                      <Trash2 size={16} className="text-white" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-lavender-400 mb-4">No memories yet 💔</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push("/timeline")}
                  className="px-4 py-2 bg-gradient-to-r from-lavender-600 to-pink-600 text-white rounded-full text-sm"
                >
                  Add Your First Memory ✨
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Special Dates */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-lavender-200 mb-4">
            Upcoming Moments ✨
          </h3>
          <div className="space-y-3">
            {loveConfig.specialMoments.slice(0, 2).map((moment) => (
              <Card
                key={moment.title}
                className="flex items-start gap-4 hover:shadow-glow-lavender transition-all"
              >
                <div className="text-3xl">{moment.icon}</div>
                <div>
                  <h4 className="font-semibold text-lavender-200">
                    {moment.title}
                  </h4>
                  <p className="text-sm text-lavender-400">{moment.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-lavender-200 mb-4">
            Quick Links 🚀
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Letters", emoji: "💌", path: "/letters" },
              { label: "Gallery", emoji: "🖼️", path: "/gallery" },
              { label: "Timeline", emoji: "📷", path: "/timeline" },
              { label: "Dreams", emoji: "💭", path: "/dreams" },
            ].map((link) => (
              <motion.a
                key={link.path}
                href={link.path}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(155, 114, 170, 0.5)",
                }}
                className="glass rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-glow-lavender"
              >
                <div className="text-3xl mb-2">{link.emoji}</div>
                <p className="text-lavender-200 font-semibold text-sm">
                  {link.label}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Today's Mood Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-lavender-200 mb-4">
            Today's Mood 💭
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center space-y-3 bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
              <div className="text-2xl font-semibold text-purple-200">
                Tanmay
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl cursor-pointer"
              >
                {tanmayMood || "😊"}
              </motion.div>
              <p className="text-xs text-lavender-400">
                {tanmayMood ? "Feeling good!" : "Not set yet"}
              </p>
            </Card>
            <Card className="text-center space-y-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40">
              <div className="text-2xl font-semibold text-pink-200">Vidhi</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="text-5xl cursor-pointer"
              >
                {vidhiMood || "😊"}
              </motion.div>
              <p className="text-xs text-lavender-400">
                {vidhiMood ? "Feeling good!" : "Not set yet"}
              </p>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
