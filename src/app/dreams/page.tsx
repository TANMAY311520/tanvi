"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { loveConfig } from "@/config/love.config";
import { Plus, X } from "lucide-react";

interface Dream {
  icon: string;
  text: string;
  status: "dreaming" | "planning" | "done";
}

const statusConfig = {
  dreaming: {
    label: "Dreaming 🌙",
    color: "text-lavender-300",
    bgColor: "bg-lavender-900/40",
  },
  planning: {
    label: "Planning ✈️",
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/30",
  },
  done: {
    label: "Done ✅",
    color: "text-green-400",
    bgColor: "bg-green-900/30",
  },
};

export default function DreamsPage() {
  const router = useRouter();
  const [dreams, setDreams] = useState<Dream[]>([...loveConfig.dreams]);
  const [confetti, setConfetti] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDream, setNewDream] = useState({
    icon: "✨",
    text: "",
    status: "dreaming" as const,
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    const saved = localStorage.getItem("tanvi_dreams");
    if (saved) setDreams(JSON.parse(saved));
  }, [router]);

  const handleMarkDone = (index: number) => {
    const updated = [...dreams];
    updated[index].status = "done";
    setDreams(updated);
    localStorage.setItem("tanvi_dreams", JSON.stringify(updated));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2500);
  };

  const handleStatusCycle = (index: number) => {
    const updated = [...dreams];
    const statuses = ["dreaming", "planning", "done"] as const;
    const currentIndex = statuses.indexOf(updated[index].status);
    updated[index].status = statuses[(currentIndex + 1) % statuses.length];
    setDreams(updated);
    localStorage.setItem("tanvi_dreams", JSON.stringify(updated));

    if (updated[index].status === "done") {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2500);
    }
  };

  const handleAddDream = () => {
    if (newDream.text.trim()) {
      const updated = [...dreams, newDream];
      setDreams(updated);
      localStorage.setItem("tanvi_dreams", JSON.stringify(updated));
      setNewDream({ icon: "✨", text: "", status: "dreaming" });
      setShowAddModal(false);
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6">
      <ConfettiBurst trigger={confetti} />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        Our Dreams 💭
      </motion.h1>

      <div className="max-w-3xl mx-auto mb-6">
        <motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-3 bg-gradient-to-r from-lavender-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-glow-lavender transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Dream
        </motion.button>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {dreams.map((dream, index) => {
            const config = statusConfig[dream.status];
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`cursor-pointer transition-all h-full flex flex-col justify-between ${
                    dream.status === "done"
                      ? "border-2 border-green-400"
                      : "border-2 border-lavender-500/30 hover:border-lavender-500/70"
                  }`}
                  hover={true}
                  onClick={() => handleStatusCycle(index)}
                >
                  {/* Dream Content */}
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{dream.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-lavender-200">
                        {dream.text}
                      </h3>
                      <motion.div
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${config.bgColor} ${config.color}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {config.label}
                      </motion.div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {dream.status !== "done" && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkDone(index);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-2 mt-4 bg-gradient-to-r from-lavender-600 to-lavender-700 text-white rounded-lg font-semibold hover:shadow-glow-lavender transition-all"
                    >
                      Mark as Done ✨
                    </motion.button>
                  )}

                  {dream.status === "done" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full mt-4 py-2 bg-green-600/30 text-green-400 rounded-lg text-center font-semibold"
                    >
                      Achieved! 🎉
                    </motion.div>
                  )}

                  {/* Click to change hint */}
                  <p className="text-xs text-lavender-400 text-center mt-2">
                    Click to cycle status
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto mt-12"
      >
        <Card className="text-center">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Dreaming",
                count: dreams.filter((d) => d.status === "dreaming").length,
                emoji: "🌙",
              },
              {
                label: "Planning",
                count: dreams.filter((d) => d.status === "planning").length,
                emoji: "✈️",
              },
              {
                label: "Achieved",
                count: dreams.filter((d) => d.status === "done").length,
                emoji: "✅",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl mb-1">{stat.emoji}</p>
                <p className="text-2xl font-bold text-lavender-300">
                  {stat.count}
                </p>
                <p className="text-xs text-lavender-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Add Dream Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 rounded-3xl p-6 max-w-md w-full mx-4 border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">
                Add a Dream
              </h2>

              {/* Icon Input */}
              <div className="mb-4">
                <label className="text-lavender-300 text-sm font-semibold block mb-2">
                  Emoji Icon
                </label>
                <input
                  type="text"
                  value={newDream.icon}
                  onChange={(e) =>
                    setNewDream({ ...newDream, icon: e.target.value || "✨" })
                  }
                  maxLength={2}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-lavender-500/30 text-white rounded-lg text-center text-2xl focus:outline-none focus:border-lavender-500"
                />
              </div>

              {/* Dream Text Input */}
              <div className="mb-4">
                <label className="text-lavender-300 text-sm font-semibold block mb-2">
                  Dream Description
                </label>
                <input
                  type="text"
                  placeholder="What's our dream?"
                  value={newDream.text}
                  onChange={(e) =>
                    setNewDream({ ...newDream, text: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-700/50 border border-lavender-500/30 text-white rounded-lg placeholder-lavender-500/50 focus:outline-none focus:border-lavender-500"
                />
              </div>

              {/* Status Select */}
              <div className="mb-6">
                <label className="text-lavender-300 text-sm font-semibold block mb-2">
                  Status
                </label>
                <select
                  value={newDream.status}
                  onChange={(e) =>
                    setNewDream({
                      ...newDream,
                      status: e.target.value as
                        | "dreaming"
                        | "planning"
                        | "done",
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-700/50 border border-lavender-500/30 text-white rounded-lg focus:outline-none focus:border-lavender-500"
                >
                  <option value="dreaming">Dreaming 🌙</option>
                  <option value="planning">Planning ✈️</option>
                  <option value="done">Done ✅</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleAddDream}
                  disabled={!newDream.text.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-lavender-600 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow-lavender transition-all"
                >
                  Add Dream
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
