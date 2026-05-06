"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Reply, X } from "lucide-react";
import { EmojiPicker } from "@/components/EmojiPicker";
import { database } from "@/config/firebase";
import { ref, push, set, onValue, update } from "firebase/database";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  reactions?: string[];
  replyTo?: string;
}

export default function ChitChatPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [todaysMood, setTodaysMood] = useState("");
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showEmojiReply, setShowEmojiReply] = useState("");
  const [mounted, setMounted] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const moods = ["😊", "😍", "🤗", "😌", "😴", "🥰", "😡", "😢"];
  const quickReactions = ["❤️", "😂", "😍", "🔥", "👏", "🎉", "🌟", "✨"];

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
      return;
    }
    setCurrentUser(user);
    const partner = user === "Tanmay" ? "Vidhi" : "Tanmay";
    setPartnerName(partner);
    setDisplayName(user === "Tanmay" ? "VIDHU" : "TANMAY");

    try {
      // Listen to messages from Firebase in real-time
      const messagesRef = ref(database, "chitchat/messages");
      const unsubscribe = onValue(
        messagesRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const messageList: Message[] = Object.entries(data).map(
              ([key, value]: any) => ({
                id: key,
                ...value,
              }),
            );
            // Sort by timestamp
            messageList.sort((a, b) => a.timestamp - b.timestamp);
            setMessages(messageList);
          } else {
            setMessages([]);
          }
          setIsLoading(false);
          localStorage.setItem("lastChatViewed", Date.now().toString());
        },
        (error) => {
          console.error("Firebase error:", error);
          // Fallback to localStorage
          const saved = localStorage.getItem("tanvi_chitchat");
          setMessages(saved ? JSON.parse(saved) : []);
          setIsLoading(false);
        },
      );

      // Load mood
      const savedMood = localStorage.getItem(`mood_${user}_today`);
      if (savedMood) setTodaysMood(savedMood);
      setMounted(true);

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase not configured:", error);
      // Fallback to localStorage
      const saved = localStorage.getItem("tanvi_chitchat");
      setMessages(saved ? JSON.parse(saved) : []);
      setIsLoading(false);
      setMounted(true);
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUser) {
      const message: Message = {
        id: "",
        sender: currentUser,
        text: newMessage,
        timestamp: Date.now(),
        reactions: [],
        replyTo: replyingTo?.id,
      };

      try {
        // Send to Firebase
        const messagesRef = ref(database, "chitchat/messages");
        const newMessageRef = push(messagesRef);
        await set(newMessageRef, {
          sender: message.sender,
          text: message.text,
          timestamp: message.timestamp,
          reactions: [],
          replyTo: message.replyTo || null,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        // Fallback: save locally
        const updated = [...messages, message];
        setMessages(updated);
        localStorage.setItem("tanvi_chitchat", JSON.stringify(updated));
      }

      setNewMessage("");
      setReplyingTo(null);
    }
  };

  const handleAddReaction = async (messageId: string, emoji: string) => {
    try {
      const msgToUpdate = messages.find((m) => m.id === messageId);
      if (msgToUpdate) {
        const reactions = msgToUpdate.reactions || [];
        let newReactions = [...reactions];

        if (newReactions.includes(emoji)) {
          newReactions = newReactions.filter((e) => e !== emoji);
        } else {
          newReactions.push(emoji);
        }

        const messageRef = ref(database, `chitchat/messages/${messageId}`);
        await update(messageRef, { reactions: newReactions });
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
    setShowEmojiReply("");
  };

  const handleSetMood = (mood: string) => {
    setTodaysMood(mood);
    localStorage.setItem(`mood_${currentUser}_today`, mood);
    setShowMoodPicker(false);
  };

  const getReplyMessage = (replyToId?: string): Message | null => {
    if (!replyToId) return null;
    return messages.find((m) => m.id === replyToId) || null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">💜</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-20">
      {/* Modern Messenger Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white p-4 shadow-xl flex items-center justify-between border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-lavender-400 flex items-center justify-center font-bold text-white text-sm">
            {displayName.charAt(0)}
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-white"
            >
              {displayName}
            </motion.h1>
            <p className="text-xs text-purple-300">Active now 🟢</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesEndRef}
        className="flex-1 overflow-y-auto space-y-3 p-4 pb-6 scroll-smooth bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div>
              <p className="text-6xl mb-4">💌</p>
              <p className="text-purple-300 text-lg">
                Start chatting with {partnerName}... 💜
              </p>
              <p className="text-purple-400 text-sm mt-2">
                Send your first message below 👇
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isCurrentUserMsg = msg.sender === currentUser;
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const showTime = !prevMsg || prevMsg.sender !== msg.sender;
              const replyMessage = getReplyMessage(msg.replyTo);

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    isCurrentUserMsg ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs relative group ${
                      isCurrentUserMsg ? "items-end" : "items-start"
                    }`}
                  >
                    {showTime && mounted && (
                      <p
                        className={`text-xs text-purple-400 mb-1 ${
                          isCurrentUserMsg ? "text-right" : "text-left"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}

                    {/* Reply Box */}
                    {replyMessage && (
                      <motion.div
                        initial={{ opacity: 0, x: isCurrentUserMsg ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-2 px-3 py-2 rounded-2xl text-xs border-l-4 ${
                          replyMessage.sender === currentUser
                            ? "bg-purple-800/40 border-purple-400 text-purple-200"
                            : "bg-pink-800/40 border-pink-400 text-pink-200"
                        }`}
                      >
                        <p className="font-semibold">
                          {replyMessage.sender === currentUser
                            ? "You"
                            : partnerName}
                        </p>
                        <p className="opacity-80 truncate">
                          {replyMessage.text}
                        </p>
                      </motion.div>
                    )}

                    <div
                      className={`px-4 py-3 rounded-3xl font-medium ${
                        isCurrentUserMsg
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none shadow-lg"
                          : "bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-bl-none shadow-lg"
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                    </div>

                    {/* Emoji Reactions - Cute Style */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex gap-1 mt-2 flex-wrap"
                      >
                        {msg.reactions.map((emoji, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.3, rotate: 10 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleAddReaction(msg.id, emoji)}
                            className="text-sm cursor-pointer bg-gradient-to-br from-slate-700/60 to-slate-600/60 rounded-full px-2 py-0.5 hover:bg-slate-600/80 transition-all shadow-sm hover:shadow-md border border-purple-400/30"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Quick Emoji Reactions on Hover */}
                    <AnimatePresence>
                      {showEmojiReply === msg.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`absolute ${
                            isCurrentUserMsg
                              ? "right-0 -left-24"
                              : "left-0 -right-24"
                          } bottom-full mb-2 bg-slate-800/95 rounded-3xl px-2 py-1.5 flex gap-1 z-10 backdrop-blur border border-purple-500/50 shadow-lg`}
                        >
                          {quickReactions.map((emoji) => (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.4, rotate: 12 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => handleAddReaction(msg.id, emoji)}
                              className="text-lg hover:scale-150 transition-transform cursor-pointer"
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Buttons */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all absolute -top-8 left-0 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() =>
                          setShowEmojiReply(
                            showEmojiReply === msg.id ? "" : msg.id,
                          )
                        }
                        className="text-purple-300 hover:text-purple-200 text-lg"
                        title="React"
                      >
                        😊
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setReplyingTo(msg)}
                        className="text-purple-300 hover:text-purple-200 text-lg"
                        title="Reply"
                      >
                        💬
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900/80 backdrop-blur border-t border-purple-500/30 p-4 space-y-3">
        {/* Reply Preview */}
        <AnimatePresence>
          {replyingTo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-800/50 to-slate-800/50 rounded-full border border-purple-500/30"
            >
              <Reply size={16} className="text-purple-300" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-purple-300 font-semibold">
                  Replying to{" "}
                  {replyingTo.sender === currentUser ? "yourself" : partnerName}
                </p>
                <p className="text-sm text-purple-200 truncate">
                  {replyingTo.text}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setReplyingTo(null)}
                className="text-purple-300 hover:text-purple-200"
              >
                <X size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Say something sweet... 💝"
              className="w-full bg-gradient-to-r from-purple-800/40 to-slate-800/40 border border-purple-500/40 rounded-full px-5 py-3 text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all backdrop-blur"
            />
          </div>
          <EmojiPicker
            onEmojiSelect={(emoji) => setNewMessage(newMessage + emoji)}
          />
          <motion.button
            onClick={handleSendMessage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 rounded-full text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </motion.button>
        </div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-800/40 to-purple-800/40 rounded-full border border-pink-500/30 justify-center"
        >
          <span className="text-xs text-pink-200 font-medium">Your mood:</span>
          <motion.button
            onClick={() => setShowMoodPicker(!showMoodPicker)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl hover:scale-125 transition-transform cursor-pointer relative"
          >
            {todaysMood || "😊"}
          </motion.button>

          <AnimatePresence>
            {showMoodPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-24 left-4 right-4 bg-slate-800/95 rounded-3xl p-3 grid grid-cols-8 gap-2 backdrop-blur border border-purple-500/40 shadow-xl"
              >
                {moods.map((mood) => (
                  <motion.button
                    key={mood}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleSetMood(mood)}
                    className="text-xl hover:scale-125 transition-transform cursor-pointer"
                  >
                    {mood}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
