"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const ATTEMPTS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SketchStory({ onNext }: Props) {
  const [step, setStep] = useState(0);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6 py-16"
      style={{ background: "#0E0719", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background — mirrors quiz page exactly */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E0719] via-[#1A0A2E] to-[#0E0719]" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,60,172,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg,#FF3CAC,#FFD700)" }}
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step counter */}
      <div className="absolute top-5 right-5 z-20">
        <span
          className="text-xs font-mono tracking-widest px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {step + 1} / 4
        </span>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6 py-16">
        <AnimatePresence mode="wait">

          {/* ── STEP 0: INTRO ── */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 text-center w-full"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl select-none"
              >
                ✏️
              </motion.div>

              <div
                className="rounded-3xl p-6 w-full flex flex-col gap-3"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#FF3CAC" }}
                >
                  real talk
                </span>
                <h2
                  className="text-2xl font-bold leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  okay so, this website was{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg,#FFD700,#FF3CAC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    never
                  </span>{" "}
                  the plan.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  there was a different plan. a much more ambitious one.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setStep(1)}
                className="w-full rounded-2xl py-4 font-bold text-base touch-manipulation"
                style={{
                  background: "linear-gradient(135deg,#FF3CAC,#7B2FBE)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(255,60,172,0.35)",
                  minHeight: 56,
                }}
              >
                the plan was… →
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 1: ATTEMPTS GRID ── */}
          {step === 1 && (
            <motion.div
              key="attempts"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 w-full"
            >
              <div
                className="rounded-3xl p-6 w-full flex flex-col gap-3"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#FF3CAC" }}
                >
                  the original plan
                </span>
                <h2
                  className="text-xl font-bold leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  draw you something. by hand.
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  sweet right? yeah. about that.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 w-full">
                {ATTEMPTS.map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.3, ease: "backOut" }}
                    className="relative flex flex-col items-center justify-center rounded-2xl aspect-square"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>
                      #{n}
                    </span>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 60" fill="none">
                      <motion.line
                        x1="14" y1="14" x2="46" y2="46"
                        stroke="#FF3CAC" strokeWidth="3" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.07 + 0.15, duration: 0.2 }}
                      />
                      <motion.line
                        x1="46" y1="14" x2="14" y2="46"
                        stroke="#FF3CAC" strokeWidth="3" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.07 + 0.3, duration: 0.2 }}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="rounded-2xl px-4 py-3 w-full text-center"
                style={{
                  background: "rgba(255,60,172,0.08)",
                  border: "1px solid rgba(255,60,172,0.2)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg,#FFD700,#FF3CAC)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  8 attempts. 1 month. zero good results.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setStep(2)}
                className="w-full rounded-2xl py-4 font-bold text-base touch-manipulation"
                style={{
                  background: "linear-gradient(135deg,#FF3CAC,#7B2FBE)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(255,60,172,0.35)",
                  minHeight: 56,
                }}
              >
                see the carnage →
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: THE ACTUAL SKETCH ── */}
          {step === 2 && (
            <motion.div
              key="sketch"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 w-full"
            >
              <div
                className="rounded-3xl p-6 w-full flex flex-col gap-2"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#FF3CAC" }}
                >
                  Exhibit A
                </span>
                <h2
                  className="text-xl font-bold"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  my finest work. truly.
                </h2>
              </div>

              {/* Sketch photo — same style as quiz photo cards, path mirrors /photos/photo1.jpg */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="w-full rounded-2xl overflow-hidden"
                style={{ border: "2px solid rgba(255,60,172,0.3)" }}
              >
                <img
                  src="/photos/sketch.jpg"
                  alt="The sketch attempt"
                  className="w-full h-44 object-cover"
                />
                <div
                  className="px-4 py-2 text-xs text-center"
                  style={{
                    color: "rgba(255,215,0,0.5)",
                    background: "rgba(0,0,0,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Exhibit A 📸
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 1 }}
                animate={{ opacity: 1, rotate: 1 }}
                transition={{ delay: 0.35 }}
                className="self-end rounded-2xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,60,172,0.08)",
                  border: "1px solid rgba(255,60,172,0.2)",
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "200px",
                }}
              >
                i tried SO hard okay 😭
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setStep(3)}
                className="w-full rounded-2xl py-4 font-bold text-base touch-manipulation"
                style={{
                  background: "linear-gradient(135deg,#FF3CAC,#7B2FBE)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(255,60,172,0.35)",
                  minHeight: 56,
                }}
              >
                so what did i do? →
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 3: THE PIVOT ── */}
          {step === 3 && (
            <motion.div
              key="pivot"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 w-full"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -6, 0] }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="text-5xl"
              >
                💻
              </motion.div>

              <div
                className="rounded-3xl p-6 w-full flex flex-col gap-3"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#FF3CAC" }}
                >
                  the pivot
                </span>
                <h2
                  className="text-xl font-bold leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  i learned to code.
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  (i already knew how to code but that's not the point)
                </p>
              </div>

              {/* Crossed-out old plan */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: "rgba(255,60,172,0.06)",
                  border: "1px solid rgba(255,60,172,0.15)",
                }}
              >
                <span className="text-2xl">🎨</span>
                <div className="text-left">
                  <p
                    className="text-sm font-semibold line-through"
                    style={{ color: "rgba(255,60,172,0.7)", textDecorationThickness: "2px" }}
                  >
                    draw a beautiful sketch
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    attempt 1–8: catastrophic failure
                  </p>
                </div>
              </motion.div>

              {/* New plan */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: "linear-gradient(135deg,rgba(255,215,0,0.06),rgba(255,60,172,0.06))",
                  border: "1px solid rgba(255,215,0,0.15)",
                  boxShadow: "0 0 40px rgba(255,215,0,0.06)",
                }}
              >
                <span className="text-2xl">✅</span>
                <div className="text-left">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg,#FFD700,#FF3CAC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    build a whole website instead
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    (this was definitely easier. totally.)
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center text-sm leading-relaxed px-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                if i can't make art for you, i'll make{" "}
                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                  an entire internet experience
                </span>{" "}
                instead. that's normal.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNext}
                className="w-full rounded-2xl py-4 font-bold text-base touch-manipulation"
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FF9500)",
                  color: "#1A0A2E",
                  boxShadow: "0 4px 24px rgba(255,215,0,0.35)",
                  minHeight: 56,
                }}
              >
                now enjoy the website 🎉
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Step dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2, 3].map((s) => (
            <motion.div
              key={s}
              animate={{
                width: s === step ? 20 : 8,
                background: s === step ? "#FF3CAC" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="rounded-full"
              style={{ height: 8 }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Playfair+Display:wght@700&display=swap');
      `}</style>
    </section>
  );
}