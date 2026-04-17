"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleOrb from "@/components/ui/ParticleOrb";

const WISHES = [
  "May your year be as iconic as you are.",
  "May every room you enter know it.",
  "May the chaos always be in your favour.",
  "May you never dim yourself for anyone.",
  "May the cake always be good. You deserve it.",
];

const STARS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 3,
}));

export default function EndingScreen() {
  const [wishIndex, setWishIndex]   = useState(0);
  const [showFinal, setShowFinal]   = useState(false);
  const [launched,  setLaunched]    = useState(false);
  const confettiRef = useRef<(() => void) | null>(null);

  // Cycle wishes
  useEffect(() => {
    const t = setInterval(() =>
      setWishIndex(i => (i + 1) % WISHES.length), 2600
    );
    return () => clearInterval(t);
  }, []);

  // Show final message after delay
  useEffect(() => {
    const t = setTimeout(() => setShowFinal(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Lazy-load confetti
  useEffect(() => {
    import("canvas-confetti").then(mod => {
      const confetti = mod.default;
      confettiRef.current = () => {
        const colors = ["#FF3CAC","#FFD700","#FF6B6B","#7B2FBE","#11998e","#FFB347"];
        const burst = (origin: { x: number; y: number }) =>
          confetti({
            particleCount: 90,
            spread: 80,
            origin,
            colors,
            scalar: 1.1,
            gravity: 0.9,
            ticks: 200,
          });
        burst({ x: 0.25, y: 0.55 });
        setTimeout(() => burst({ x: 0.75, y: 0.55 }), 200);
        setTimeout(() => burst({ x: 0.5,  y: 0.3  }), 450);
      };
    });
  }, []);

  const celebrate = () => {
    if (!launched) {
      setLaunched(true);
      confettiRef.current?.();
      setTimeout(() => setLaunched(false), 4000);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-candy-dark">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A2E] via-[#2D1B69] to-[#0f0720]" />
      <ParticleOrb />

      {/* Starfield */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {STARS.map(s => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left:   `${s.x}%`,
              top:    `${s.y}%`,
              width:  s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.5, 1] }}
            transition={{
              duration: 2.5 + s.delay,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative rings */}
      {[380, 260, 160].map((size, i) => (
        <motion.div
          key={size}
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: size, height: size,
            border: `1px solid rgba(255,${i===1?215:60},${i===1?0:172},${0.12 + i*0.04})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
          transition={{
            rotate: { duration: 20 + i*8, repeat: Infinity, ease: "linear" },
            scale:  { duration: 4 + i,    repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xs mx-auto gap-7">

        {/* Crown + sparkles */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 240, damping: 16 }}
          className="relative"
        >
          <span className="text-7xl animate-float block">👑</span>
          {["✨","🌟","💫"].map((e, i) => (
            <motion.span
              key={e}
              aria-hidden
              className="absolute text-2xl"
              style={{
                top:  [-20, -10, -15][i],
                left: [-24, 60, 20][i],
              }}
              animate={{ opacity: [0,1,0], scale: [0.5,1.2,0.5], rotate: [0,20,-20,0] }}
              transition={{ duration: 2, delay: 0.5 + i*0.4, repeat: Infinity, repeatDelay: 1 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Headline */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="space-y-2"
            >
              <p className="font-body text-candy-pink/70 text-xs uppercase tracking-[0.22em] font-medium">
                you made it 🎉
              </p>
              <h1
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(2.8rem,14vw,4.5rem)",
                  background: "linear-gradient(135deg,#FF3CAC 0%,#FFD700 55%,#FF6B6B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(255,60,172,0.45))",
                }}
              >
                Happy Birthday.
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rotating wishes */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-12 overflow-hidden flex items-center justify-center px-4"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={wishIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-accent italic text-candy-cream/65 text-[15.5px] leading-snug"
                >
                  {WISHES[wishIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-candy-gold to-transparent"
        />

        {/* Final glass card */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="glass rounded-3xl px-6 py-5 space-y-3 text-center"
              style={{ boxShadow: "0 8px 48px rgba(255,60,172,0.1), inset 0 1px 0 rgba(255,255,255,0.08)" }}
            >
              <p className="font-body text-candy-cream/80 text-[15.5px] leading-[1.75] font-light">
                You survived the website.<br />
                More importantly — you&apos;ve survived another year<br />
                of being <span className="text-candy-pink font-semibold">this</span> iconic.<br />
                That deserves a standing ovation.
              </p>
              <p className="font-accent italic text-candy-cream/45 text-sm">
                — made with way too much love 🫶
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti button */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 280, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.button
                onClick={celebrate}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={launched
                  ? { scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }
                  : {}
                }
                transition={{ duration: 0.5 }}
                className="relative px-8 py-4 rounded-2xl font-body font-semibold text-[17px] text-candy-dark touch-manipulation overflow-hidden min-h-[56px] min-w-[200px]"
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FFB347)",
                  boxShadow: "0 0 32px rgba(255,215,0,0.45)",
                }}
              >
                <span className="relative z-10">
                  {launched ? "🎊 There you go!" : "Tap for confetti 🎉"}
                </span>
                <span className="absolute inset-0 shimmer pointer-events-none" />
              </motion.button>

              <motion.p
                animate={{ opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="font-body text-candy-cream/30 text-xs tracking-widest uppercase"
              >
                {launched ? "happy birthday 🎂" : "go on, you know you want to"}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(15,7,32,0.7) 100%)"
        }}
      />
    </section>
  );
}