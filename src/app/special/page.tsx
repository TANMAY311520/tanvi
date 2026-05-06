"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { loveConfig } from "@/config/love.config";
import { Edit2, Save, X } from "lucide-react";

interface SpecialMoment {
  title: string;
  date: string;
  description: string;
  icon: string;
}

export default function SpecialPage() {
  const router = useRouter();
  const [selectedMoment, setSelectedMoment] = useState<any>(null);
  const [confetti, setConfetti] = useState(false);
  const [moments, setMoments] = useState<SpecialMoment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<SpecialMoment | null>(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMoment, setNewMoment] = useState({
    title: "",
    date: "",
    description: "",
    icon: "✨",
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }

    // Load moments from localStorage
    const loadMoments = () => {
      const saved = localStorage.getItem("tanvi_special_moments");
      if (saved) {
        setMoments(JSON.parse(saved));
      } else {
        setMoments(loveConfig.specialMoments);
        localStorage.setItem(
          "tanvi_special_moments",
          JSON.stringify(loveConfig.specialMoments),
        );
      }
    };

    loadMoments();
    // Sync between partners
    const interval = setInterval(loadMoments, 500);
    return () => clearInterval(interval);
  }, [router]);

  const handleMomentClick = (moment: any) => {
    setSelectedMoment(moment);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditForm(moments[index]);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editForm && editIndex >= 0) {
      const updated = [...moments];
      updated[editIndex] = editForm;
      setMoments(updated);
      localStorage.setItem("tanvi_special_moments", JSON.stringify(updated));
      setIsEditing(false);
      setEditForm(null);
      setEditIndex(-1);
    }
  };

  const addNewMoment = () => {
    if (
      newMoment.title &&
      newMoment.date &&
      newMoment.description &&
      newMoment.icon
    ) {
      const updated = [...moments, newMoment];
      setMoments(updated);
      localStorage.setItem("tanvi_special_moments", JSON.stringify(updated));
      setNewMoment({
        title: "",
        date: "",
        description: "",
        icon: "✨",
      });
      setShowAddModal(false);
    }
  };

  const deleteMoment = (index: number) => {
    if (confirm("Delete this moment? 💔")) {
      const updated = moments.filter((_, i) => i !== index);
      setMoments(updated);
      localStorage.setItem("tanvi_special_moments", JSON.stringify(updated));
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
    visible: {
      opacity: 1,
      y: 0,
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
        Upcoming Moments ✨
      </motion.h1>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-lavender-900/30 to-pink-900/30 rounded-xl p-4 border border-lavender-500/20"
      >
        <p className="text-lavender-200 text-sm mb-2">
          💡 <span className="font-semibold">How to Edit:</span>
        </p>
        <ul className="text-lavender-300 text-xs space-y-1 ml-4">
          <li>
            ✏️ Hover over any moment and click the{" "}
            <span className="text-lavender-200 font-semibold">Edit button</span>{" "}
            (pencil icon)
          </li>
          <li>
            🗑️ Click the{" "}
            <span className="text-lavender-200 font-semibold">
              Delete button
            </span>{" "}
            (trash icon) to remove
          </li>
          <li>
            ➕ Click{" "}
            <span className="text-lavender-200 font-semibold">
              + Add Moment
            </span>{" "}
            to create new ones
          </li>
          <li>💾 Changes save automatically to both your devices</li>
        </ul>
      </motion.div>

      {/* Add New Moment Button */}
      <div className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-lavender-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          + Add Moment
        </motion.button>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => handleMomentClick(moment)}
            >
              <Card
                hover={true}
                glowing={index === 1}
                className="cursor-pointer relative overflow-hidden group"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-lavender-600/20 to-pink-light/20 -z-10"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="flex items-start gap-6 justify-between">
                  <div className="flex items-start gap-6 flex-1">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-4xl flex-shrink-0 group-hover:animate-bounce"
                    >
                      {moment.icon}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.p
                        className="text-sm text-lavender-400 font-semibold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                      >
                        {moment.date}
                      </motion.p>
                      <motion.h3
                        className="text-2xl font-bold text-lavender-200 mt-1 group-hover:text-pink-light transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {moment.title}
                      </motion.h3>
                      <motion.p
                        className="text-lavender-300 mt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {moment.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div
                    className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => startEditing(index)}
                      className="p-2 rounded-full bg-lavender-600/50 hover:bg-lavender-600 text-white transition-colors"
                      title="Edit moment"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteMoment(index)}
                      className="p-2 rounded-full bg-red-600/50 hover:bg-red-600 text-white transition-colors"
                      title="Delete moment"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedMoment && !isEditing}
        onClose={() => setSelectedMoment(null)}
        title={selectedMoment?.title}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-4xl text-center mb-4">
            {selectedMoment?.icon}
          </div>

          <div className="text-center">
            <p className="text-lavender-400 font-semibold mb-2">
              {selectedMoment?.date}
            </p>
            <p className="text-lavender-200 text-lg mb-4">
              {selectedMoment?.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={`https://picsum.photos/400/300?random=${selectedMoment?.title}`}
              alt={selectedMoment?.title}
              className="w-full h-56 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center text-pink-light text-lg font-semibold"
          >
            You are my everything 💜
          </motion.div>
        </motion.div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing && !!editForm}
        onClose={() => {
          setIsEditing(false);
          setEditForm(null);
        }}
        title="Edit Moment"
      >
        {editForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-lavender-300 mb-2">Icon</label>
              <input
                type="text"
                value={editForm.icon}
                onChange={(e) =>
                  setEditForm({ ...editForm, icon: e.target.value })
                }
                maxLength={2}
                className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2 text-2xl text-center"
              />
            </div>

            <div>
              <label className="block text-lavender-300 mb-2">Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-lavender-300 mb-2">Date</label>
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-lavender-300 mb-2">
                Description
              </label>
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                rows={3}
                className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
              />
            </div>

            <button
              onClick={saveEdit}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lavender-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Save size={18} />
              Save Changes
            </button>
          </motion.div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Moment"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-lavender-300 mb-2">Icon</label>
            <input
              type="text"
              value={newMoment.icon}
              onChange={(e) =>
                setNewMoment({ ...newMoment, icon: e.target.value })
              }
              maxLength={2}
              className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2 text-2xl text-center"
              placeholder="✨"
            />
          </div>

          <div>
            <label className="block text-lavender-300 mb-2">Title</label>
            <input
              type="text"
              value={newMoment.title}
              onChange={(e) =>
                setNewMoment({ ...newMoment, title: e.target.value })
              }
              className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
              placeholder="Moment title"
            />
          </div>

          <div>
            <label className="block text-lavender-300 mb-2">Date</label>
            <input
              type="date"
              value={newMoment.date}
              onChange={(e) =>
                setNewMoment({ ...newMoment, date: e.target.value })
              }
              className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-lavender-300 mb-2">Description</label>
            <textarea
              value={newMoment.description}
              onChange={(e) =>
                setNewMoment({ ...newMoment, description: e.target.value })
              }
              rows={3}
              className="w-full bg-slate-700 text-white border border-lavender-500/30 rounded-lg p-2"
              placeholder="Add a description"
            />
          </div>

          <button
            onClick={addNewMoment}
            className="w-full bg-gradient-to-r from-lavender-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Add Moment
          </button>
        </motion.div>
      </Modal>
    </div>
  );
}
