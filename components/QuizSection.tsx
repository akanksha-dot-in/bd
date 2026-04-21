"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  subtitle?: string;
  question: string;
  options: string[];
  result: string[];
  photo?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Select one — this will define your future:",
    options: ["Main chick 👑", "Side chick 😶‍🌫️", "Chicken 🍗", "Aadha kilo dahi 🥛"],
    result: [
      "Error 404: Logic not found 🚫",
      "Redirecting…",
      "kuttiya ka dudh(jo ap apne padoshi se lete the mature hone ke liye) 😭👶",
    ],
  },
  {
    id: 2,
    question: "AI apki hidden talent analyze kar raha hai… choose wisely:",
    options: [
      "Flirting skills 💅",
      "Comedy (forced) 🎤",
      "Ladkibaazi 😶‍🌫️",
      "Food dedication 🍕",
    ],
    result: ["Sona detected 😴👶"],
  },
  {
    id: 3,
    question: "Life ka main goal kya hai?",
    options: ["Paisa 💸", "Pyaar ❤️", "Success 🏆", "Khana 🍗"],
    result: ["chill rehna 😌"],
  },
  {
    id: 4,
    question: "Ham apke liye kya hai?",
    options: ["Dost 🤝", "pyaar ❤️", "Random insan 🙃", "Timepass 😭"],
    result: ["DEVI"],
  },
  {
    id: 5,
    question: "Pyaar me ap kya ho?",
    options: ["Loyal ❤️", "Caring 🥺", "Possessive 😤", "Confused 🤯"],
    result: ["Pyar karna padta hai uske liye — talking stage se kaam ni chalta 💀"],
  },
  {
    id: 6,
    question: "apka dimag kab band hota hai?",
    options: ["Jaldi 😌", "Kabhi kabhi 🙂", "Late night 🌙", "Kabhi nahi 🤯"],
    result: ["Error 24/7 bas flirt karne time khulta hai 💀"],
  },
  {
    id: 7,
    subtitle: "Suspicious Thoughts 🤨",
    question: "Is bande ke dimaag me kya chal raha hai?",
    options: ["Nature 🌴", "Peace ☮️", "Deep thoughts 🤯", "Kuch gadbad 😏"],
    result: ["AB konsi nayi side chick fasaunnnnn 😂"],
    photo: "/photos/photo1.jpg",
  },
  {
    id: 8,
    question: "Mandir jaake kya maanga?",
    options: ["Paisa 💸", "Pyaar ❤️", "Success 🏆", "Shanti ☮️"],
    result: ["ek tub bhar kar chote-chote bache lol 💀👶"],
    photo: "/photos/photo2.jpg",
  },
];

interface Props {
  onNext: () => void;
}

// Floating particles background
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#FF3CAC" : i % 3 === 1 ? "#FFD700" : "#7B2FBE",
            opacity: 0.25,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function QuizSection({ onNext }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resultStep, setResultStep] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const q = QUESTIONS[qIndex];
  const isLastQ = qIndex === QUESTIONS.length - 1;
  const showingResult = selected !== null;
  const progress = ((qIndex + (selected ? 1 : 0)) / QUESTIONS.length) * 100;

  const handleOption = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setResultStep(0);
    setShake(true);
    setTimeout(() => setShake(false), 600);

    if (q.result.length > 1) {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step >= q.result.length) {
          clearInterval(interval);
        } else {
          setResultStep(step);
        }
      }, 900);
    }
  };

  const handleNext = () => {
    if (isLastQ) {
      setDone(true);
      setTimeout(onNext, 800);
      return;
    }
    setSelected(null);
    setResultStep(0);
    setQIndex((i) => i + 1);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0114]">

      {/* Deep layered background */}
      <div className="absolute inset-0">
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(123,47,190,0.22) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 80% 100%, rgba(255,60,172,0.14) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <Particles />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-20">
        <motion.div
          className="h-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #7B2FBE, #FF3CAC, #FFD700)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer on progress */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              width: "40%",
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>
      </div>

      {/* Header: question counter + label */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-6">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span
            className="text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,60,172,0.7)" }}
          >
            Q{qIndex + 1}
          </span>
          <span style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {qIndex + 1} of {QUESTIONS.length}
          </span>
        </motion.div>

        {/* Dot progress */}
        <div className="flex items-center gap-1.5">
          {QUESTIONS.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width: i === qIndex ? 16 : 5,
                background:
                  i < qIndex
                    ? "#FF3CAC"
                    : i === qIndex
                    ? "#FFD700"
                    : "rgba(255,255,255,0.12)",
              }}
              style={{ height: 5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-4 flex flex-col gap-5 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >

            {/* Question card */}
            <motion.div
              animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-[28px] overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Photo shown BEFORE answer (full, no crop) */}
              {q.photo && !showingResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="relative w-full overflow-hidden"
                  style={{
                    borderBottom: "1px solid rgba(255,60,172,0.2)",
                  }}
                >
                  <img
                    src={q.photo}
                    alt="memory"
                    className="w-full object-contain"
                    style={{ display: "block", maxHeight: "340px" }}
                  />
                  {/* Gradient fade at bottom of image */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(10,1,20,0.6), transparent)",
                    }}
                  />
                </motion.div>
              )}

              <div className="p-5 flex flex-col gap-3">
                {q.subtitle && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em]"
                    style={{
                      background: "rgba(255,60,172,0.12)",
                      border: "1px solid rgba(255,60,172,0.25)",
                      color: "#FF3CAC",
                    }}
                  >
                    {q.subtitle}
                  </motion.span>
                )}

                <h2
                  className="text-[1.15rem] font-bold leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.93)",
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {q.question}
                </h2>
              </div>
            </motion.div>

            {/* Options grid */}
            {!showingResult && (
              <div className="grid grid-cols-2 gap-2.5">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.06 * i + 0.12,
                      duration: 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleOption(opt)}
                    className="touch-manipulation text-left rounded-[18px] px-4 py-4 text-sm font-medium leading-snug transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.045)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.82)",
                      minHeight: 58,
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Result panel */}
            {showingResult && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                {/* "You picked" chip */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                  style={{
                    background: "rgba(255,60,172,0.07)",
                    border: "1px solid rgba(255,60,172,0.18)",
                  }}
                >
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-mono shrink-0"
                    style={{ color: "rgba(255,60,172,0.55)" }}
                  >
                    You picked
                  </span>
                  <span
                    className="text-sm font-semibold truncate"
                    style={{ color: "#FF3CAC", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {selected}
                  </span>
                </motion.div>

                {/* Result card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-[24px] p-5 flex flex-col gap-2.5 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.07) 0%, rgba(255,60,172,0.07) 100%)",
                    border: "1px solid rgba(255,215,0,0.18)",
                    boxShadow: "0 0 50px rgba(255,215,0,0.07), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Decorative top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: "linear-gradient(90deg, transparent, #FFD700, #FF3CAC, transparent)",
                    }}
                  />

                  <span
                    className="text-[9px] uppercase tracking-[0.22em] font-mono"
                    style={{ color: "rgba(255,215,0,0.45)" }}
                  >
                    AI Analysis™
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {q.result.map((line, i) => (
                      <AnimatePresence key={i}>
                        {i <= resultStep && (
                          <motion.p
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[1.05rem] font-bold leading-snug"
                            style={{
                              background: "linear-gradient(130deg, #FFD700 0%, #FF9500 40%, #FF3CAC 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {line}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </motion.div>

                {/* Photo shown AFTER answer — full image, no crop */}
                {q.photo && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.28, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[22px] overflow-hidden relative"
                    style={{
                      border: "2px solid rgba(255,215,0,0.22)",
                      boxShadow: "0 8px 32px rgba(255,215,0,0.1)",
                    }}
                  >
                    <img
                      src={q.photo}
                      alt="evidence 😂"
                      className="w-full object-contain"
                      style={{ display: "block" }}
                    />
                    <div
                      className="px-4 py-2.5 text-[11px] text-center font-mono tracking-widest uppercase"
                      style={{
                        color: "rgba(255,215,0,0.55)",
                        background: "rgba(0,0,0,0.35)",
                        borderTop: "1px solid rgba(255,215,0,0.1)",
                      }}
                    >
                      📸 Exhibit A — evidence secured
                    </div>
                  </motion.div>
                )}

                {/* Next / Finish button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: q.result.length * 0.3 + 0.15 }}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleNext}
                  className="relative w-full rounded-[18px] py-4 font-bold text-[15px] touch-manipulation overflow-hidden"
                  style={{
                    background: isLastQ
                      ? "linear-gradient(135deg, #FFD700 0%, #FF9500 100%)"
                      : "linear-gradient(135deg, #FF3CAC 0%, #7B2FBE 100%)",
                    color: isLastQ ? "#0A0114" : "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: isLastQ
                      ? "0 6px 28px rgba(255,215,0,0.4), 0 2px 8px rgba(0,0,0,0.3)"
                      : "0 6px 28px rgba(255,60,172,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                    minHeight: 58,
                    letterSpacing: "0.01em",
                  }}
                >
                  {/* Button shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      width: "60%",
                    }}
                    animate={{ x: ["-100%", "250%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                  <span className="relative z-10">
                    {isLastQ ? "Okay done 😭🎂" : "Next question →"}
                  </span>
                </motion.button>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Exit animation overlay */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,1,20,0.95)" }}
          >
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #FFD700, #FF3CAC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ab agle section pe 🎂
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}