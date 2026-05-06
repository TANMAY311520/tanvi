"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { X, Plus, Upload } from "lucide-react";

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  addedBy: string;
}

const defaultMemories: Memory[] = [
  {
    id: "1",
    date: "2020-12-23",
    title: "Our Love Story Begins 💫",
    description:
      "The day that changed everything. Where two hearts became one.",
    image: "https://picsum.photos/400/300?random=1",
    addedBy: "System",
  },
  {
    id: "2",
    date: "2021-02-14",
    title: "First Kiss 💋",
    description: "Under the stars, a moment frozen in time forever.",
    image: "https://picsum.photos/400/300?random=2",
    addedBy: "System",
  },
];

// Separate component for timeline item to avoid hooks in map
interface TimelineItemProps {
  memory: Memory;
  index: number;
  onDelete: (id: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  memory,
  index,
  onDelete,
}) => {
  const itemRef = useRef(null);
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "center center"],
  });

  const opacity = useTransform(itemProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(itemProgress, [0, 1], [50, 0]);
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      key={memory.id}
      ref={itemRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-8 ${
        side === "left" ? "flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <motion.div
        style={{
          opacity: opacity as any,
          y: y as any,
        }}
        className="flex-1 relative"
      >
        <Card glowing={side === "right"} className="space-y-3 group">
          <div className="flex items-start gap-3 justify-between">
            <div>
              <span className="text-3xl">{memory.date}</span>
              <h3 className="text-xl font-semibold text-lavender-200 mt-2">
                {memory.title}
              </h3>
              <p className="text-lavender-400 mt-2">{memory.description}</p>
              <p className="text-xs text-lavender-500 mt-3">
                Added by {memory.addedBy}
              </p>
            </div>
            {memory.addedBy !== "System" && (
              <button
                onClick={() => onDelete(memory.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {memory.image && (
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full rounded-lg object-cover h-48"
            />
          )}
        </Card>
      </motion.div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-lavender-400 to-pink-light rounded-full border-4 border-dark-deep shadow-lg z-10" />

      {/* Empty space for other side */}
      <div className="flex-1" />
    </motion.div>
  );
};

export default function TimelinePage() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
    image: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const containerRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeightProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  );

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }
    setCurrentUser(user);

    // Load memories from localStorage
    const loadMemories = () => {
      const saved = localStorage.getItem("tanvi_memories");
      if (saved) {
        const parsed = JSON.parse(saved);
        setMemories(
          parsed.sort(
            (a: Memory, b: Memory) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        );
      } else {
        setMemories(defaultMemories);
        localStorage.setItem("tanvi_memories", JSON.stringify(defaultMemories));
      }
    };

    loadMemories();

    // Reload memories every 500ms to sync between partners
    const interval = setInterval(loadMemories, 500);
    return () => clearInterval(interval);
  }, [router]);

  const handleAddMemory = () => {
    if (formData.date && formData.title && formData.description) {
      const newMemory: Memory = {
        id: Date.now().toString(),
        ...formData,
        addedBy: currentUser,
      };

      const updated = [newMemory, ...memories].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setMemories(updated);
      localStorage.setItem("tanvi_memories", JSON.stringify(updated));

      setFormData({
        date: "",
        title: "",
        description: "",
        image: "",
      });
      setShowAddModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData({ ...formData, image: base64 });
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMemory = (id: string) => {
    if (confirm("Delete this memory? 💔")) {
      const updated = memories.filter((m) => m.id !== id);
      setMemories(updated);
      localStorage.setItem("tanvi_memories", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen pb-36 px-4 pt-6" ref={containerRef}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        Our Memories 💫
      </motion.h1>

      <div className="text-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Memory
        </motion.button>
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border border-purple-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-lavender-200">
                Add Memory
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-lavender-400 hover:text-lavender-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lavender-300 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lavender-300 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Our First Kiss 💋"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lavender-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Tell us about this moment..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-lavender-300 mb-2">
                  Upload Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Choose from Device
                </motion.button>
              </div>

              <div className="text-center text-lavender-400 text-sm">OR</div>

              <div>
                <label className="block text-lavender-300 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMemory}
                  disabled={
                    !formData.date || !formData.title || !formData.description
                  }
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Save Memory
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-lavender-600 to-pink-light -translate-x-1/2 origin-top"
          style={{ scaleY: lineHeightProgress }}
        />

        {/* Timeline items */}
        <div className="space-y-12">
          {memories.map((memory, index) => (
            <TimelineItem
              key={memory.id}
              memory={memory}
              index={index}
              onDelete={handleDeleteMemory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
