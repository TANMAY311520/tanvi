"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Image, Bell, User, ChevronUp } from "lucide-react";

const navItems = [
  { href: "/home", icon: Home, label: "Home", emoji: "🏠" },
  { href: "/timeline", icon: Image, label: "Memories", emoji: "📷" },
  { href: "/chit-chat", icon: Bell, label: "Chat", emoji: "💬" },
  { href: "/gallery", icon: Image, label: "Gallery", emoji: "🖼️" },
  { href: "/profile", icon: User, label: "Profile", emoji: "👤" },
];

const quickLinks = [
  { href: "/letters", emoji: "💌", label: "Letters" },
  { href: "/gallery", emoji: "🖼️", label: "Gallery" },
  { href: "/timeline", emoji: "📷", label: "Timeline" },
  { href: "/dreams", emoji: "💭", label: "Dreams" },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const [unreadChat, setUnreadChat] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  useEffect(() => {
    const checkUnread = () => {
      const lastViewed = localStorage.getItem("lastChatViewed") || "0";
      const messages = JSON.parse(
        localStorage.getItem("tanvi_chitchat") || "[]",
      );
      const hasNew = messages.some(
        (m: any) => m.timestamp > parseInt(lastViewed),
      );
      setUnreadChat(hasNew);
    };

    checkUnread();
    const interval = setInterval(checkUnread, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Quick Links Modal */}
      <AnimatePresence>
        {showQuickLinks && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickLinks(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-b from-purple-900 to-slate-900 rounded-3xl p-6 border border-purple-500/30 shadow-2xl"
            >
              <h3 className="text-white text-sm font-semibold mb-4 text-center">
                Quick Links ✨
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowQuickLinks(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-purple-800/30 hover:bg-purple-700/50 transition-all cursor-pointer"
                    >
                      <span className="text-2xl">{link.emoji}</span>
                      <span className="text-xs text-purple-200">
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 w-full"
      >
        <div className="glass glass-dark backdrop-blur-xl border-t border-purple-500/30">
          <div className="flex items-center justify-around w-full px-2 py-3 md:px-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center py-2 px-2 rounded-2xl transition-all ${
                      isActive
                        ? "text-purple-300 bg-purple-600/20"
                        : "text-purple-400 hover:text-purple-300"
                    }`}
                  >
                    <span className="text-lg md:text-xl">{item.emoji}</span>
                    <span className="text-xs mt-0.5 hidden sm:inline">
                      {item.label}
                    </span>

                    {item.href === "/chit-chat" && unreadChat && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-pink-light rounded-full"
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 w-1 h-1 bg-pink-light rounded-full"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Arrow Up Button for Quick Links */}
            <motion.button
              onClick={() => setShowQuickLinks(!showQuickLinks)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-1"
            >
              <motion.div
                animate={{ y: showQuickLinks ? 4 : 0 }}
                className={`flex flex-col items-center py-2 px-2 rounded-2xl transition-all ${
                  showQuickLinks
                    ? "text-purple-200 bg-purple-600/30"
                    : "text-purple-400 hover:text-purple-300"
                }`}
              >
                <ChevronUp size={20} className="text-lg md:text-xl" />
                <span className="text-xs mt-0.5 hidden sm:inline">More</span>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};
