"use client";

import { useState } from "react";
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
      "Cute cute bache hehe 😭👶",
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
    options: ["Dost 🤝", "Best friend 🫶", "Random insan 🙃", "Timepass 😭"],
    result: ["Free therapist 🧠"],
  },
  {
    id: 5,
    question: "Pyaar me ap kya ho?",
    options: ["Loyal ❤️", "Caring 🥺", "Possessive 😤", "Confused 🤯"],
    result: ["Pyar karna padta hai uske liye — talking stage se kaam ni chalta 💀"],
  },
  {
    id: 6,
    question: "Tumhara brain kab band hota hai?",
    options: ["Jaldi 😌", "Kabhi kabhi 🙂", "Late night 🌙", "Kabhi nahi 🤯"],
    result: ["Error 24/7 💀"],
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
    result: ["ek tub bache lol 💀👶"],
    photo: "/photos/photo2.jpg",
  },
];

interface Props {
  onNext: () => void;
}

export default function QuizSection({ onNext }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resultStep, setResultStep] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[qIndex];
  const isLastQ = qIndex === QUESTIONS.length - 1;
  const showingResult = selected !== null;

  const handleOption = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setResultStep(0);

    // auto-advance through multi-line results
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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E0719]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E0719] via-[#1A0A2E] to-[#0E0719]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,60,172,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg,#FF3CAC,#FFD700)",
          }}
          animate={{ width: `${((qIndex + (selected ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Question counter */}
      <div className="absolute top-5 right-5 z-20">
        <span
          className="text-xs font-mono tracking-widest px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {qIndex + 1} / {QUESTIONS.length}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto px-5 flex flex-col gap-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Question card */}
            <div
              className="rounded-3xl p-6 flex flex-col gap-3"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              {q.subtitle && (
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#FF3CAC" }}
                >
                  {q.subtitle}
                </span>
              )}

              {/* Photo (shown BEFORE the question for photo questions, above) */}
              {q.photo && !showingResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "2px solid rgba(255,60,172,0.3)" }}
                >
                  <img
                    src={q.photo}
                    alt="memory"
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
              )}

              <h2
                className="text-xl font-bold leading-snug"
                style={{ color: "rgba(255,255,255,0.92)", fontFamily: "'Playfair Display', serif" }}
              >
                {q.question}
              </h2>
            </div>

            {/* Options */}
            {!showingResult && (
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.35 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleOption(opt)}
                    className="touch-manipulation text-left rounded-2xl px-4 py-4 text-sm font-medium leading-snug"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.85)",
                      minHeight: 56,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Result reveal */}
            {showingResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                {/* Selected answer badge */}
                <div
                  className="rounded-2xl px-4 py-3 flex items-center gap-2"
                  style={{
                    background: "rgba(255,60,172,0.08)",
                    border: "1px solid rgba(255,60,172,0.2)",
                  }}
                >
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(255,60,172,0.6)" }}>
                    You picked
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#FF3CAC" }}>
                    {selected}
                  </span>
                </div>

                {/* Result lines */}
                <div
                  className="rounded-3xl p-6 flex flex-col gap-3"
                  style={{
                    background: "linear-gradient(135deg,rgba(255,215,0,0.06),rgba(255,60,172,0.06))",
                    border: "1px solid rgba(255,215,0,0.15)",
                    boxShadow: "0 0 40px rgba(255,215,0,0.06)",
                  }}
                >
                  {q.result.map((line, i) => (
                    <AnimatePresence key={i}>
                      {i <= resultStep && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-base font-semibold leading-snug"
                          style={{
                            background: "linear-gradient(135deg,#FFD700,#FF3CAC)",
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

                {/* Photo shown after answer for photo questions */}
                {q.photo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "2px solid rgba(255,215,0,0.25)" }}
                  >
                    <img
                      src={q.photo}
                      alt="evidence 😂"
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
                )}

                {/* Next button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: q.result.length * 0.35 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNext}
                  className="w-full rounded-2xl py-4 font-bold text-base touch-manipulation"
                  style={{
                    background: isLastQ
                      ? "linear-gradient(135deg,#FFD700,#FF9500)"
                      : "linear-gradient(135deg,#FF3CAC,#7B2FBE)",
                    color: isLastQ ? "#1A0A2E" : "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: isLastQ
                      ? "0 4px 24px rgba(255,215,0,0.35)"
                      : "0 4px 24px rgba(255,60,172,0.35)",
                    minHeight: 56,
                  }}
                >
                  {isLastQ ? "Okay done 😭🎂" : "Next question →"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}