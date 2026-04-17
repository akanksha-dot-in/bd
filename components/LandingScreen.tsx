"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleOrb from "@/components/ui/ParticleOrb";
import FloatingEmoji from "@/components/ui/FloatingEmoji";
import CTAButton from "@/components/ui/CTAButton";

interface Props { onNext: () => void; }

const EMOJIS = [
  { emoji: "🎂", style: { top: "8%",  left: "5%"  }, delay: 0.2, size: "text-4xl" },
  { emoji: "✨", style: { top: "12%", right: "8%"  }, delay: 0.8, size: "text-3xl" },
  { emoji: "🎉", style: { top: "75%", left: "4%"  }, delay: 1.3, size: "text-4xl" },
  { emoji: "💫", style: { top: "80%", right: "6%"  }, delay: 0.5, size: "text-3xl" },
  { emoji: "🌟", style: { top: "40%", left: "2%"  }, delay: 1.8, size: "text-2xl" },
  { emoji: "🎈", style: { top: "50%", right: "3%"  }, delay: 1.1, size: "text-4xl" },
  { emoji: "💖", style: { top: "22%", left: "18%" }, delay: 2.0, size: "text-2xl" },
  { emoji: "🥂", style: { top: "65%", right: "15%"}, delay: 1.6, size: "text-3xl" },
];

const taglines = [
  "the moment you've been waiting for",
  "your favourite day of the year",
  "a whole vibe, honestly",
];

export default function LandingScreen({ onNext }: Props) {
  const [tagline, setTagline] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowButton(true), 2200);
    const t2 = setInterval(() =>
      setTagline(p => (p + 1) % taglines.length), 2800
    );
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-candy-dark">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient" />
      <ParticleOrb />

      {/* Decorative ring */}
      <motion.div
        aria-hidden
        className="absolute rounded-full border border-candy-pink/20"
        style={{ width: 500, height: 500 }}
        animate={{ rotate: 360, scale: [1, 1.04, 1] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full border border-candy-gold/15"
        style={{ width: 340, height: 340 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating emojis */}
      {EMOJIS.map((e, i) => (
        <FloatingEmoji key={i} emoji={e.emoji} style={e.style} delay={e.delay} size={e.size} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto gap-6">

        {/* Crown */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
          className="text-6xl animate-float"
        >
          👑
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1"
        >
          <p className="font-body text-candy-pink/80 font-medium text-sm uppercase tracking-[0.2em]">
            it&apos;s officially
          </p>
          <h1
            className="font-display text-[clamp(3rem,15vw,5.5rem)] leading-none"
            style={{
              background: "linear-gradient(135deg, #FF3CAC 0%, #FFD700 60%, #FF6B6B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 24px rgba(255,60,172,0.4))",
            }}
          >
            Your Day.
          </h1>
        </motion.div>

        {/* Rotating tagline */}
        <div className="h-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={tagline}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-accent italic text-candy-cream/70 text-[17px]"
            >
              {taglines[tagline]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-candy-pink to-transparent"
        />

        {/* CTA */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col items-center gap-3"
            >
              <CTAButton onClick={onNext} variant="pink">
                <span>Open Your Gift</span>
                <span>🎁</span>
              </CTAButton>
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-candy-cream/40 text-xs font-body tracking-widest uppercase"
              >
                tap to begin
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-candy-dark/60 to-transparent pointer-events-none" />
    </section>
  );
}