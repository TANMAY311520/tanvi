"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detect theme from HTML element
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDark(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 3 + 2,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${isDark ? "bg-lavender-200" : "bg-lavender-600"}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};
