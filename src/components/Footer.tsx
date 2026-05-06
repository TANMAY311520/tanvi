"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Mail,
  Heart,
  Share2,
  ExternalLink,
  Music,
  MoreVertical,
} from "lucide-react";

interface QuickLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

const quickLinks: QuickLink[] = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/letters", label: "Letters", icon: <Mail size={18} /> },
  { href: "/timeline", label: "Memories", icon: <Heart size={18} /> },
  { href: "/gallery", label: "Gallery", icon: <Share2 size={18} /> },
];

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  // Hide footer on chat page
  if (pathname === "/chit-chat") {
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tanvi",
          text: "A universe built for us 💜",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed");
      }
    }
  };

  return (
    <footer className="hidden md:block fixed bottom-20 left-0 right-0 z-20 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Quick Links Grid */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={link.href}>
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-full text-purple-300 hover:text-purple-200 transition-all text-sm font-medium border border-purple-500/20 hover:border-purple-500/40">
                  {link.icon}
                  <span className="hidden sm:inline">{link.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-pink-600/20 hover:bg-pink-600/40 rounded-full text-pink-300 hover:text-pink-200 transition-all text-sm font-medium border border-pink-500/20 hover:border-pink-500/40"
            title="Share this page"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </motion.button>

          {/* More Options */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-3 py-2 bg-lavender-600/20 hover:bg-lavender-600/40 rounded-full text-lavender-300 hover:text-lavender-200 transition-all text-sm font-medium border border-lavender-500/20 hover:border-lavender-500/40"
            title="More options"
          >
            <MoreVertical size={18} />
          </motion.button>
        </div>

        {/* More Options Dropdown */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 mb-4 p-3 bg-slate-800/40 border border-purple-500/20 rounded-2xl backdrop-blur-sm"
          >
            <Link href="/profile">
              <div className="px-3 py-2 bg-slate-700/40 hover:bg-slate-600/40 rounded-full text-purple-300 text-sm transition-all">
                👤 Profile
              </div>
            </Link>
            <Link href="/special">
              <div className="px-3 py-2 bg-slate-700/40 hover:bg-slate-600/40 rounded-full text-purple-300 text-sm transition-all">
                ✨ Special
              </div>
            </Link>
            <Link href="/surprise">
              <div className="px-3 py-2 bg-slate-700/40 hover:bg-slate-600/40 rounded-full text-purple-300 text-sm transition-all">
                🎁 Surprise
              </div>
            </Link>
            <Link href="/her-world">
              <div className="px-3 py-2 bg-slate-700/40 hover:bg-slate-600/40 rounded-full text-pink-300 text-sm transition-all">
                🌍 Her World
              </div>
            </Link>
            <button
              onClick={() => {
                const audio = document.querySelector("audio");
                if (audio) {
                  audio.play();
                }
              }}
              className="px-3 py-2 bg-slate-700/40 hover:bg-slate-600/40 rounded-full text-pink-300 text-sm transition-all"
            >
              🎵 Music
            </button>
          </motion.div>
        )}

        {/* Footer Info */}
        <div className="text-center text-xs text-purple-300/60 border-t border-purple-500/10 pt-3">
          <p>Made with 💜 by Tanmay for Vidhi</p>
        </div>
      </div>
    </footer>
  );
};
