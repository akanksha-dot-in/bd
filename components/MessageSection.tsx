"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleOrb from "@/components/ui/ParticleOrb";
import CTAButton from "@/components/ui/CTAButton";

interface Props { onNext: () => void; }

const MESSAGES = [
  {
    emoji: "🌸",
    title: "Okay but first—",
    body: "Happy birthday mister playboiiiii! it's not happy tho apke jivan se ek aur saal chala gya",
  },
  {
    emoji: "💅",
    title: "Real talk though.",
    body: "Thank you that you came into my life like chalo i consider the fact ki ap ni hote toh life ho jata thoda aur boring",
  },
  {
    emoji: "🔥",
    title: "yk what!",
    body: "Apki koi aur side chick ni karegi, baith kar code apke liye ek website iss liye thodi qadar kar lijiye",
  },
  {
    emoji: "🥹",
    title: "No but seriously.",
    body: "You are really a good person , i mean idk how to say this but jitna ik you usme toh atleast you are",
  },
  {
    emoji: "🎂",
    title: "Happy Birthday.",
    body: "chaliye atleast apko network mila yeh dekhne ke liye aur apka day banane ke liye",
  },
];

export default function MessageSection({ onNext }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLast = index === MESSAGES.length - 1;

  const next = () => {
    if (isLast) { onNext(); return; }
    setDirection(1);
    setIndex(i => i + 1);
  };

  const prev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex(i => i - 1);
  };

  const msg = MESSAGES[index];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-candy-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A2E] via-[#2D1B69] to-[#1A0A2E]" />
      <ParticleOrb />

      {/* Progress dots */}
      <div className="absolute top-10 left-0 right-0 flex justify-center gap-2 z-20">
        {MESSAGES.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width:      i === index ? 28 : 8,
              background: i === index
                ? "linear-gradient(90deg,#FF3CAC,#FFD700)"
                : i < index
                  ? "rgba(255,60,172,0.5)"
                  : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ height: 8 }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 flex flex-col items-center gap-8">

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter:   (d: number) => ({ x: d * 60, opacity: 0, scale: 0.94 }),
              center:  { x: 0, opacity: 1, scale: 1 },
              exit:    (d: number) => ({ x: d * -60, opacity: 0, scale: 0.94 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Emoji bubble */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 18 }}
                className="w-20 h-20 rounded-3xl glass flex items-center justify-center text-4xl glow-pink"
              >
                {msg.emoji}
              </motion.div>
            </div>

            {/* Glass card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="glass rounded-3xl p-7 flex flex-col gap-4"
              style={{ boxShadow: "0 8px 48px rgba(255,60,172,0.12), inset 0 1px 0 rgba(255,255,255,0.1)" }}
            >
              <h2
                className="font-display text-[1.7rem] leading-tight"
                style={{
                  background: "linear-gradient(135deg,#FF3CAC,#FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {msg.title}
              </h2>

              <p className="font-body text-candy-cream/85 text-[16.5px] leading-[1.7] font-light">
                {msg.body}
              </p>

              {/* Decorative rule */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-gradient-to-r from-candy-pink/40 to-transparent" />
                <span className="text-candy-pink/50 text-xs tracking-widest uppercase font-body">
                  {index + 1} / {MESSAGES.length}
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-candy-pink/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 w-full">
          {index > 0 && (
            <motion.button
              onClick={prev}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-xl text-candy-cream/60 touch-manipulation"
            >
              ←
            </motion.button>
          )}
          <div className={index > 0 ? "flex-1" : "w-full"}>
            <CTAButton
              onClick={next}
              variant={isLast ? "gold" : "pink"}
              className="w-full"
            >
              {isLast ? "Let's gooo 🚀" : "Next →"}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}