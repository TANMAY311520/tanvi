"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lightbox } from "@/components/Lightbox";
import { Trash2, Plus, Upload } from "lucide-react";

const categories = [
  { name: "All", emoji: "📸", key: "all" },
  { name: "Cute", emoji: "🥺", key: "cute" },
  { name: "Western", emoji: "💃", key: "western" },
  { name: "Traditional", emoji: "🌸", key: "traditional" },
  { name: "Travel", emoji: "✈️", key: "travel" },
];

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  liked: boolean;
  category: string;
}

export default function GalleryPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [selectedImageCategory, setSelectedImageCategory] = useState("cute");
  const [showAddModal, setShowAddModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    }

    // Load images from localStorage
    const loadImages = () => {
      const saved = localStorage.getItem("tanvi_gallery");
      if (saved) {
        setImages(JSON.parse(saved));
      } else {
        // Start with empty gallery - only show images you add
        setImages([]);
        localStorage.setItem("tanvi_gallery", JSON.stringify([]));
      }
    };

    loadImages();
  }, [router]);

  const handleAddImage = () => {
    if (newImageUrl.trim() && newImageCaption.trim()) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: newImageUrl,
        alt: newImageCaption,
        caption: newImageCaption,
        liked: false,
        category: selectedImageCategory,
      };

      const updated = [newImage, ...images];
      setImages(updated);
      localStorage.setItem("tanvi_gallery", JSON.stringify(updated));

      setNewImageUrl("");
      setNewImageCaption("");
      setSelectedImageCategory("cute");
      setShowAddModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const newImage: GalleryImage = {
          id: Date.now().toString(),
          src: base64,
          alt: newImageCaption || "Memory",
          caption: newImageCaption || "Memory",
          liked: false,
          category: selectedImageCategory,
        };

        const updated = [newImage, ...images];
        setImages(updated);
        localStorage.setItem("tanvi_gallery", JSON.stringify(updated));

        setNewImageUrl("");
        setNewImageCaption("");
        setSelectedImageCategory("cute");
        setShowAddModal(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Delete this photo? 💔")) {
      const updated = images.filter((img) => img.id !== id);
      setImages(updated);
      localStorage.setItem("tanvi_gallery", JSON.stringify(updated));
    }
  };

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen pb-36 md:pb-32 px-4 pt-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lavender-300 to-pink-light bg-clip-text text-transparent"
      >
        Our Gallery 📸
      </motion.h1>

      {/* Add Image Button - Prominent Position */}
      <div className="text-center mb-6 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-lavender-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg shadow-lavender-600/50 transition-all"
        >
          <Plus size={20} />
          Add Photo
        </motion.button>
      </div>

      {/* Add Image Modal */}
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
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border border-lavender-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-lavender-200 mb-4">
              Add Photo
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-lavender-300 mb-2">
                  Upload Photo
                </label>
                <div className="flex gap-2">
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
                    className="flex-1 bg-gradient-to-r from-lavender-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload size={18} />
                    Choose from Device
                  </motion.button>
                </div>
              </div>

              <div className="text-center text-lavender-400 text-sm">OR</div>

              <div>
                <label className="block text-lavender-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-slate-700/50 border border-lavender-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lavender-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lavender-300 mb-2">Caption</label>
                <input
                  type="text"
                  placeholder="Photo description"
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  className="w-full bg-slate-700/50 border border-lavender-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lavender-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lavender-300 mb-2">Category</label>
                <select
                  value={selectedImageCategory}
                  onChange={(e) => setSelectedImageCategory(e.target.value)}
                  className="w-full bg-slate-700/50 border border-lavender-500/30 rounded-lg px-3 py-2 text-white focus:border-lavender-400 focus:outline-none"
                >
                  <option value="cute">🥺 Cute</option>
                  <option value="western">💃 Western</option>
                  <option value="traditional">🌸 Traditional</option>
                  <option value="travel">✈️ Travel</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddImage}
                  disabled={!newImageUrl.trim() || !newImageCaption.trim()}
                  className="flex-1 bg-gradient-to-r from-lavender-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Add Photo
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex overflow-x-auto gap-3 mb-8 pb-4 px-2 -mx-4 max-w-2xl mx-auto"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
              activeCategory === cat.key
                ? "bg-gradient-to-r from-lavender-600 to-lavender-500 text-white shadow-glow-lavender"
                : "bg-lavender-900/40 text-lavender-200 hover:bg-lavender-800/60"
            }`}
          >
            {cat.emoji} {cat.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-4xl mx-auto">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group glass"
            >
              <div className="aspect-square relative bg-gradient-to-br from-lavender-600 to-pink-600">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://picsum.photos/300/300?random=" + image.id;
                  }}
                />

                {/* Overlay with action buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full text-white transition-all shadow-lg"
                    title="View full size"
                  >
                    👁️
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteImage(image.id)}
                    className="bg-red-600 hover:bg-red-700 p-3 rounded-full text-white transition-all shadow-lg"
                    title="Delete photo"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>

                {/* Heart counter */}
                <motion.div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur rounded-full px-3 py-1 text-pink-light text-sm font-semibold">
                  ❤️ {Math.floor(Math.random() * 100) + 10}
                </motion.div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3 text-white text-xs">
                <p className="font-semibold truncate">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lavender-400 text-lg">
              No photos in this category yet 📸
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages.map((img) => ({
          src: img.src,
          alt: img.alt,
          caption: img.caption,
        }))}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
