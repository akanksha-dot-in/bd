"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Props {
  onNext: () => void;
}

const ATTEMPTS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SketchStory({ onNext }: Props) {
  const [step, setStep] = useState(0);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6 py-16"
      style={{
        background: "linear-gradient(160deg, #fdf8f0 0%, #fef3e2 50%, #fdf0e8 100%)",
        fontFamily: "'Caveat', cursive",
      }}
    >
      {/* Paper grain texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Faint ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 31px, #e8d5b7 31px, #e8d5b7 32px)",
          opacity: 0.25,
        }}
      />

      {/* Red margin line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "48px", width: "1px", background: "#e8a5a5", opacity: 0.5 }}
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">

          {/* ── STEP 0: INTRO ── */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl select-none"
              >
                ✏️
              </motion.div>

              <div>
                <p className="text-4xl font-bold leading-tight" style={{ color: "#3d2c1e" }}>
                  okay so,
                </p>
                <p className="text-4xl font-bold leading-tight" style={{ color: "#3d2c1e" }}>
                  real talk for a sec.
                </p>
              </div>

              <p className="text-xl leading-relaxed" style={{ color: "#6b4c35", maxWidth: "280px" }}>
                this website was{" "}
                <span className="relative inline-block" style={{ color: "#c0392b" }}>
                  never
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 60 8" fill="none" style={{ height: "6px" }}>
                    <path d="M2 4 Q15 1 30 4 Q45 7 58 4" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </span>{" "}
                the plan.
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
                className="mt-2 px-8 py-4 rounded-full text-xl font-bold"
                style={{ background: "#3d2c1e", color: "#fdf8f0", minHeight: "52px" }}
              >
                the plan was...
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 1: ATTEMPTS GRID ── */}
          {step === 1 && (
            <motion.div
              key="attempts"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="text-center">
                <p className="text-3xl font-bold" style={{ color: "#3d2c1e" }}>
                  the plan was to draw you
                </p>
                <p className="text-3xl font-bold" style={{ color: "#3d2c1e" }}>
                  something. by hand.
                </p>
                <p className="text-lg mt-2" style={{ color: "#8b6347" }}>
                  sweet right? yeah. about that.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 w-full">
                {ATTEMPTS.map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                    transition={{ delay: i * 0.08, duration: 0.35, ease: "backOut" }}
                    className="relative flex flex-col items-center justify-center rounded-lg aspect-square"
                    style={{
                      background: "#fff9ee",
                      border: "1.5px solid #d4b896",
                      boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
                    }}
                  >
                    <span style={{ color: "#b09070", fontSize: "11px" }}>try #{n}</span>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 60" fill="none">
                      <motion.line x1="10" y1="10" x2="50" y2="50" stroke="#e74c3c" strokeWidth="3.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.25 }}
                      />
                      <motion.line x1="50" y1="10" x2="10" y2="50" stroke="#e74c3c" strokeWidth="3.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.08 + 0.35, duration: 0.25 }}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="text-center text-lg" style={{ color: "#8b6347" }}
              >
                8 attempts. 1 month. zero good results.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                className="px-8 py-4 rounded-full text-xl font-bold"
                style={{ background: "#c0392b", color: "#fff", minHeight: "52px" }}
              >
                see the carnage →
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: THE ACTUAL SKETCH ── */}
          {step === 2 && (
            <motion.div
              key="sketch"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <p className="text-3xl font-bold text-center" style={{ color: "#3d2c1e" }}>exhibit A.</p>
              <p className="text-lg text-center" style={{ color: "#8b6347" }}>my finest work. truly.</p>

              <motion.div
                initial={{ rotate: -3, scale: 0.9 }}
                animate={{ rotate: -1.5, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  border: "3px solid #d4b896",
                  boxShadow: "4px 6px 20px rgba(0,0,0,0.15)",
                  background: "#fff9ee",
                  minHeight: "260px",
                }}
              >
                {/*
                  ── ADD YOUR SKETCH PHOTO ──────────────────────────────
                  1. Copy your image into /public/sketch.jpg
                  2. Delete the placeholder <div> below
                  3. Uncomment the <Image> block:

                  <Image
                    src="/sketch.jpg"
                    alt="The sketch attempt"
                    width={400}
                    height={500}
                    className="w-full object-contain"
                  />
                  ──────────────────────────────────────────────────────
                */}
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <span className="text-5xl">🖼️</span>
                  <p className="text-center text-base" style={{ color: "#b09070" }}>
                    [ your sketch photo goes here ]
                  </p>
                  <p className="text-sm text-center" style={{ color: "#c5a882", maxWidth: "200px" }}>
                    drop it in{" "}
                    <code className="px-1 rounded" style={{ background: "#f0e0c8", fontSize: "12px" }}>
                      /public/sketch.jpg
                    </code>
                  </p>
                </div>

                {/* Tape piece */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 opacity-60 rotate-1 rounded-sm"
                  style={{ background: "#ffe17a" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 2 }} animate={{ opacity: 1, rotate: 2 }} transition={{ delay: 0.4 }}
                className="self-end -mt-2 px-4 py-3 rounded-lg text-base"
                style={{
                  background: "#fffde7",
                  border: "1px solid #f0d060",
                  boxShadow: "2px 3px 8px rgba(0,0,0,0.1)",
                  color: "#6b4c35",
                  maxWidth: "200px",
                }}
              >
                i tried SO hard okay 😭
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
                className="px-8 py-4 rounded-full text-xl font-bold mt-2"
                style={{ background: "#3d2c1e", color: "#fdf8f0", minHeight: "52px" }}
              >
                so what did i do? →
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 3: THE PIVOT ── */}
          {step === 3 && (
            <motion.div
              key="pivot"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -6, 0] }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="text-6xl"
              >
                💻
              </motion.div>

              <div className="flex flex-col gap-3">
                <p className="text-3xl font-bold" style={{ color: "#3d2c1e" }}>i learned to code.</p>
                <p className="text-xl leading-relaxed" style={{ color: "#6b4c35", maxWidth: "280px" }}>
                  (i already knew how to code but that's not the point)
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                className="w-full rounded-2xl px-6 py-5 flex items-center gap-4"
                style={{ background: "#fff9ee", border: "1.5px solid #d4b896" }}
              >
                <span className="text-3xl">🎨</span>
                <div className="text-left">
                  <p className="text-lg font-bold line-through" style={{ color: "#c0392b", textDecorationThickness: "3px" }}>
                    draw a beautiful sketch
                  </p>
                  <p className="text-sm" style={{ color: "#b09070" }}>
                    (attempt 1–8: catastrophic failure)
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                className="w-full rounded-2xl px-6 py-5 flex items-center gap-4"
                style={{ background: "#f0fff4", border: "1.5px solid #68d391" }}
              >
                <span className="text-3xl">✅</span>
                <div className="text-left">
                  <p className="text-lg font-bold" style={{ color: "#276749" }}>
                    build a whole website instead
                  </p>
                  <p className="text-sm" style={{ color: "#48bb78" }}>
                    (this was definitely easier. totally.)
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="text-xl leading-relaxed"
                style={{ color: "#6b4c35", maxWidth: "300px" }}
              >
                because if i can't make art for you, i'll make{" "}
                <span className="font-bold" style={{ color: "#3d2c1e" }}>
                  an entire internet experience
                </span>{" "}
                instead. that's normal.
              </motion.p>

              {/* ← onNext advances the whole-page flow to MessageSection */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                whileTap={{ scale: 0.94 }}
                onClick={onNext}
                className="px-8 py-4 rounded-full text-xl font-bold mt-2"
                style={{ background: "#c0392b", color: "#fff", minHeight: "52px" }}
              >
                now enjoy the website 🎉
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: s === step ? "20px" : "8px",
                height: "8px",
                background: s === step ? "#3d2c1e" : "#c5a882",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
      `}</style>
    </section>
  );
}