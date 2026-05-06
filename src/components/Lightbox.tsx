"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface LightboxProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    liked?: boolean;
  }>;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liked, setLiked] = useState<boolean[]>(
    images.map((img) => img.liked || false),
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleLike = () => {
    const newLiked = [...liked];
    newLiked[currentIndex] = !newLiked[currentIndex];
    setLiked(newLiked);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-lavender-300 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={32} />
            </motion.button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full px-4"
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-auto rounded-2xl object-cover max-h-96"
              />
            </motion.div>

            {/* Caption and Like */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {images[currentIndex].caption && (
                <p className="text-lavender-200 mb-3">
                  {images[currentIndex].caption}
                </p>
              )}
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${liked[currentIndex] ? "text-pink-light" : "text-lavender-300"}`}
              >
                <Heart
                  size={28}
                  fill={liked[currentIndex] ? "currentColor" : "none"}
                />
              </motion.button>
            </motion.div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-lavender-600/50 hover:bg-lavender-600 rounded-lg"
              >
                <ChevronLeft size={24} className="text-white" />
              </motion.button>

              <span className="text-lavender-200">
                {currentIndex + 1} / {images.length}
              </span>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-lavender-600/50 hover:bg-lavender-600 rounded-lg"
              >
                <ChevronRight size={24} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
