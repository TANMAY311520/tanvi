"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { loveConfig } from "@/config/love.config";

type FoodTab = "all" | "tried";
type StyleTab = "western" | "traditional";

export default function HerWorldPage() {
  const router = useRouter();
  const [foodTab, setFoodTab] = useState<FoodTab>("all");
  const [styleTab, setStyleTab] = useState<StyleTab>("western");
  const [checkedFoods, setCheckedFoods] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(false);
  const [newPlaceModal, setNewPlaceModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [places, setPlaces] = useState(loveConfig.places);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    const saved = localStorage.getItem("tanvi_checked_foods");
    if (saved) setCheckedFoods(JSON.parse(saved));

    const savedPlaces = localStorage.getItem("tanvi_places");
    if (savedPlaces) setPlaces(JSON.parse(savedPlaces));
  }, [router]);

  const handleFoodCheck = (food: string) => {
    const updated = checkedFoods.includes(food)
      ? checkedFoods.filter((f) => f !== food)
      : [...checkedFoods, food];
    setCheckedFoods(updated);
    localStorage.setItem("tanvi_checked_foods", JSON.stringify(updated));
    if (!checkedFoods.includes(food)) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }
  };

  const handleAddPlace = () => {
    if (newPlaceName.trim()) {
      const newPlace = {
        name: newPlaceName,
        emoji: "🌍",
        visited: false,
        note: "Dream destination",
      };
      const updated = [...places, newPlace];
      setPlaces(updated);
      localStorage.setItem("tanvi_places", JSON.stringify(updated));
      setNewPlaceName("");
      setNewPlaceModal(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6">
      <ConfettiBurst trigger={confetti} />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        Vidhi's Universe 💜
      </motion.h1>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* FOOD LOVES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-lavender-200 mb-4">
            Food Loves 🍰
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { key: "all", label: "All" },
              { key: "tried", label: "Already Tried ✓" },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setFoodTab(tab.key as FoodTab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  foodTab === tab.key
                    ? "bg-lavender-600 text-white shadow-glow-lavender"
                    : "bg-lavender-900/40 text-lavender-200 hover:bg-lavender-800/60"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Food Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loveConfig.foods.map((food, idx) => {
              const isChecked = checkedFoods.includes(food.item);
              const shouldShow =
                foodTab === "all" || (foodTab === "tried" && isChecked);

              if (!shouldShow) return null;

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFoodCheck(food.item)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`flex items-center gap-3 transition-all ${
                      isChecked ? "border-2 border-pink-light" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-5 h-5 accent-pink-light cursor-pointer"
                    />
                    <span className="text-2xl">{food.emoji}</span>
                    <span className="text-lavender-200 font-semibold flex-1">
                      {food.item}
                    </span>
                    {isChecked && <span className="text-green-400">✓</span>}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* PLACES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-lavender-200">Places 🗺️</h2>
            <motion.button
              onClick={() => setNewPlaceModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-lavender-600 text-white rounded-full text-sm"
            >
              + Add
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {places.map((place, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  className={`text-center p-4 ${
                    place.visited
                      ? "border-2 border-green-400"
                      : "border-2 border-lavender-500/30"
                  }`}
                >
                  <div className="text-4xl mb-2">{place.emoji}</div>
                  <p className="font-semibold text-lavender-200">
                    {place.name}
                  </p>
                  <p className="text-xs text-lavender-400 mt-1">{place.note}</p>
                  <p className="text-xs text-lavender-300 mt-2">
                    {place.visited ? "📍 Been there" : "🌙 Dream destination"}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HER STYLE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-lavender-200 mb-4">
            Her Style 👗
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              {
                key: "western",
                label: "Western 💃",
                text: "she absolutely slays 🔥",
              },
              {
                key: "traditional",
                label: "Traditional 🌸",
                text: "but in traditional she's just... 🥺💜",
              },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setStyleTab(tab.key as StyleTab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  styleTab === tab.key
                    ? "bg-lavender-600 text-white shadow-glow-lavender"
                    : "bg-lavender-900/40 text-lavender-200 hover:bg-lavender-800/60"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Style Grid */}
          <div>
            <p className="text-lavender-300 text-center mb-4 italic">
              {styleTab === "western"
                ? "she absolutely slays 🔥"
                : "but in traditional she's just... 🥺💜"}
            </p>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl overflow-hidden glass cursor-pointer"
                >
                  <img
                    src={`https://picsum.photos/200/200?random=${styleTab}-${i}`}
                    alt={`Style ${i}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add Place Modal */}
      <Modal
        isOpen={newPlaceModal}
        onClose={() => setNewPlaceModal(false)}
        title="Add a Dream Destination"
      >
        <div className="space-y-3">
          <input
            type="text"
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
            placeholder="Place name..."
            className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none"
          />
          <Button onClick={handleAddPlace} className="w-full">
            Add Place 📍
          </Button>
        </div>
      </Modal>
    </div>
  );
}
