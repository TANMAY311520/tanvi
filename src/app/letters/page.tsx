"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/TypewriterText";
import { loveConfig } from "@/config/love.config";

interface Letter {
  title: string;
  body: string;
}

export default function LettersPage() {
  const router = useRouter();
  const [letters, setLetters] = useState<Letter[]>(loveConfig.letters);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newLetterTitle, setNewLetterTitle] = useState("");
  const [newLetterBody, setNewLetterBody] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    const savedLetters = localStorage.getItem("tanvi_letters");
    if (savedLetters) {
      setLetters(JSON.parse(savedLetters));
    }
  }, [router]);

  const handleSaveLetter = () => {
    if (newLetterTitle.trim() && newLetterBody.trim()) {
      const newLetter = { title: newLetterTitle, body: newLetterBody };
      const updated = [...letters, newLetter];
      setLetters(updated);
      localStorage.setItem("tanvi_letters", JSON.stringify(updated));
      setNewLetterTitle("");
      setNewLetterBody("");
      setIsWriteModalOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        Love Letters 💌
      </motion.h1>

      <div className="max-w-2xl mx-auto">
        {/* New Letter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button onClick={() => setIsWriteModalOpen(true)} className="w-full">
            ✍️ Write a New Letter
          </Button>
        </motion.div>

        {/* Letters List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {letters.map((letter, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                hover={true}
                onClick={() => setSelectedLetter(letter)}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💌</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-lavender-200">
                      {letter.title}
                    </h3>
                    <p className="text-lavender-400 mt-2 line-clamp-2">
                      {letter.body}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Letter View Modal */}
      <Modal
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
        title={selectedLetter?.title}
      >
        <div className="text-lavender-200 space-y-4 whitespace-pre-wrap">
          {selectedLetter && (
            <TypewriterText text={selectedLetter.body} delay={200} />
          )}
        </div>
      </Modal>

      {/* Write Letter Modal */}
      <Modal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        title="Write a Letter"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-lavender-200 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={newLetterTitle}
              onChange={(e) => setNewLetterTitle(e.target.value)}
              placeholder="My Dear Vidhi..."
              className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lavender-200 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              value={newLetterBody}
              onChange={(e) => setNewLetterBody(e.target.value)}
              placeholder="Write your heart out..."
              className="w-full bg-lavender-900/30 border-2 border-lavender-500/50 rounded-xl px-4 py-3 text-white placeholder-lavender-400 focus:border-lavender-400 focus:outline-none min-h-32"
            />
          </div>
          <Button onClick={handleSaveLetter} className="w-full">
            Save Letter 💜
          </Button>
        </div>
      </Modal>
    </div>
  );
}
