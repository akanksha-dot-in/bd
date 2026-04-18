"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleOrb from "@/components/ui/ParticleOrb";
import CTAButton from "@/components/ui/CTAButton";

interface Props { onNext: () => void; }

const MEMORIES = [
  {
    id: 1,
    front: "🤫  A secret",
    back: "You have this laugh that makes everyone around you laugh too. It's genuinely contagious and honestly? Your superpower.",
    color: "from-pink-500/30 to-purple-600/30",
    accent: "#FF3CAC",
  },
  {
    id: 2,
    front: "✨  A truth",
    back: "You stress about things you don't need to. The version of you that just exists, unbothered, is already incredible.",
    color: "from-amber-500/30 to-orange-500/30",
    accent: "#FFB347",
  },
  {
    id: 3,
    front: "🎭  A confession",
    back: "I low-key studied your vibe to understand what \"cool\" actually means. The answer is: whatever you're doing.",
    color: "from-sky-500/30 to-indigo-600/30",
    accent: "#2B86C5",
  },
  {
    id: 4,
    front: "💌  A wish",
    back: "This year I hope you choose yourself first. Every. Single. Time. You deserve that unbothered era.",
    color: "from-rose-500/30 to-pink-600/30",
    accent: "#FF6B6B",
  },
  {
    id: 5,
    front: "🌙  A reminder",
    back: "You're not \"too much.\" You're exactly enough. Anyone who made you feel otherwise was just intimidated.",
    color: "from-violet-500/30 to-purple-700/30",
    accent: "#7B2FBE",
  },
  {
    id: 6,
    front: "🔮  A prediction",
    back: "This is going to be your best year yet. I don't have receipts but I feel it in my bones. Trust.",
    color: "from-emerald-500/30 to-teal-600/30",
    accent: "#11998e",
  },
];

export default function InteractiveSection({ onNext }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [flipped,  setFlipped]  = useState<number | null>(null);

 const tap = (id: number) => {
  setFlipped(id);
  setRevealed(prev => {
    const next = new Set(prev);
    next.add(id);
    return next;
  });
};

  const close = () => setFlipped(null);
  const allDone = revealed.size === MEMORIES.length;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-candy-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A2E] via-[#0f0720] to-[#1A0A2E]" />
      <ParticleOrb />

      <div className="relative z-10 w-full max-w-sm mx-auto px-5 pt-14 pb-10 flex flex-col gap-7">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-2"
        >
          <p className="font-body text-candy-pink/70 text-xs uppercase tracking-[0.2em] font-medium">
            tap to reveal
          </p>
          <h2
            className="font-display text-[2.2rem] leading-tight"
            style={{
              background: "linear-gradient(135deg,#FF3CAC 0%,#FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            6 Things.
          </h2>
          <p className="font-accent italic text-candy-cream/55 text-[15px]">
            just for you, superstar
          </p>

          {/* Counter */}
          <div className="flex justify-center gap-1.5 pt-1">
            {MEMORIES.map((m) => (
              <motion.div
                key={m.id}
                className="w-2 h-2 rounded-full"
                animate={{
                  background: revealed.has(m.id) ? m.accent : "rgba(255,255,255,0.15)",
                  scale: revealed.has(m.id) ? [1, 1.4, 1] : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {MEMORIES.map((mem, i) => {
            const isRevealed = revealed.has(mem.id);
            return (
              <motion.button
                key={mem.id}
                onClick={() => tap(mem.id)}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.94 }}
                className={`
                  relative rounded-2xl p-4 min-h-[110px]
                  flex items-center justify-center text-center
                  overflow-hidden cursor-pointer touch-manipulation
                  bg-gradient-to-br ${mem.color}
                  border transition-all duration-300
                  ${isRevealed
                    ? "border-white/20"
                    : "border-white/10 hover:border-white/20"}
                `}
                style={{
                  boxShadow: isRevealed
                    ? `0 0 20px ${mem.accent}35`
                    : "none",
                }}
              >
                {/* Glow dot */}
                {isRevealed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
                    style={{ background: mem.accent }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="text-2xl"
                    >
                      ✅
                    </motion.span>
                  ) : (
                    <motion.p
                      key="front"
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="font-body font-semibold text-candy-cream/90 text-[14px] leading-snug"
                    >
                      {mem.front}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Shimmer on unrevealed */}
                {!isRevealed && (
                  <span className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Modal overlay */}
        <AnimatePresence>
          {flipped !== null && (() => {
            const mem = MEMORIES.find(m => m.id === flipped)!;
            return (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-6"
                style={{ background: "rgba(26,10,46,0.85)", backdropFilter: "blur(16px)" }}
                onClick={close}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  onClick={e => e.stopPropagation()}
                  className={`
                    relative w-full max-w-xs rounded-3xl p-7
                    flex flex-col items-center gap-4 text-center
                    bg-gradient-to-br ${mem.color}
                    border border-white/15
                  `}
                  style={{ boxShadow: `0 0 60px ${mem.accent}40, 0 20px 60px rgba(0,0,0,0.5)` }}
                >
                  <p className="font-body text-xs uppercase tracking-widest text-candy-cream/50">
                    revealed ✨
                  </p>
                  <p className="font-body text-candy-cream text-[16.5px] leading-[1.75] font-light">
                    {mem.back}
                  </p>
                  <motion.button
                    onClick={close}
                    whileTap={{ scale: 0.92 }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-body font-semibold touch-manipulation"
                    style={{ background: mem.accent, color: "#fff" }}
                  >
                    aww, close 🫶
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="flex flex-col items-center gap-3 pt-2"
            >
              <p className="font-accent italic text-candy-cream/60 text-sm">
                you found them all 🎉
              </p>
              <CTAButton onClick={onNext} variant="gold">
                Time for a game 🎮
              </CTAButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!allDone && (
          <motion.p
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-center font-body text-candy-cream/30 text-xs tracking-widest uppercase"
          >
            {revealed.size === 0 ? "tap any card to reveal" : `${MEMORIES.length - revealed.size} left to go`}
          </motion.p>
        )}
      </div>
    </section>
  );
}