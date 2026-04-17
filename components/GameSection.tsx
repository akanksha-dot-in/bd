"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleOrb from "@/components/ui/ParticleOrb";
import CTAButton from "@/components/ui/CTAButton";

interface Props { onNext: () => void; }

interface Bubble {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  size: number;
  points: number;
  isBomb: boolean;
}

const GOOD = ["🎂","🎈","⭐","💖","🌸","🎁","💫","✨","🥂","🍰"];
const BOMBS = ["💀","🪲","👹","🤡"];
const DURATION = 22;

let uid = 0;

export default function GameSection({ onNext }: Props) {
  const [phase,   setPhase]   = useState<"intro"|"playing"|"done">("intro");
  const [score,   setScore]   = useState(0);
  const [missed,  setMissed]  = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hits,    setHits]    = useState<{id:number;x:number;y:number;label:string}[]>([]);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [combo,   setCombo]   = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const timerRef  = useRef<ReturnType<typeof setInterval>|null>(null);
  const spawnRef  = useRef<ReturnType<typeof setInterval>|null>(null);
  const comboRef  = useRef(combo);
  comboRef.current = combo;

  const spawnBubble = useCallback(() => {
    const isBomb = Math.random() < 0.18;
    const pool   = isBomb ? BOMBS : GOOD;
    const emoji  = pool[Math.floor(Math.random() * pool.length)];
    const size   = isBomb ? 52 : 44 + Math.random() * 20;
    setBubbles(b => [...b, {
      id:     uid++,
      x:      8 + Math.random() * 78,
      emoji,
      speed:  2.8 + Math.random() * 2.2,
      size,
      points: isBomb ? -15 : Math.ceil(size / 10),
      isBomb,
    }]);
  }, []);

  const startGame = () => {
    setPhase("playing");
    setScore(0); setMissed(0); setCombo(0); setBestCombo(0);
    setTimeLeft(DURATION); setBubbles([]); setHits([]);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    spawnRef.current = setInterval(spawnBubble, 900);
  };

  const endGame = () => {
    setPhase("done");
    if (timerRef.current)  clearInterval(timerRef.current);
    if (spawnRef.current)  clearInterval(spawnRef.current);
    setBubbles([]);
  };

  useEffect(() => () => {
    if (timerRef.current)  clearInterval(timerRef.current);
    if (spawnRef.current)  clearInterval(spawnRef.current);
  }, []);

  const tap = (b: Bubble, e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    setBubbles(prev => prev.filter(x => x.id !== b.id));
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    if (b.isBomb) {
      setScore(s => Math.max(0, s - 15));
      setCombo(0);
      setHits(h => [...h, { id: Date.now(), x: rect.left + rect.width/2, y: rect.top, label: "-15 💀" }]);
    } else {
      const newCombo = comboRef.current + 1;
      setCombo(newCombo);
      setBestCombo(bc => Math.max(bc, newCombo));
      const bonus = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
      const pts   = b.points * bonus;
      setScore(s => s + pts);
      const label = bonus > 1 ? `+${pts} 🔥x${bonus}` : `+${pts}`;
      setHits(h => [...h, { id: Date.now(), x: rect.left + rect.width/2, y: rect.top, label }]);
    }
    setTimeout(() => setHits(h => h.filter(x => x.id !== Date.now())), 800);
  };

  const onMiss = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setMissed(m => m + 1);
    setCombo(0);
  };

  const grade = score >= 120 ? "S" : score >= 80 ? "A" : score >= 50 ? "B" : "C";
  const gradeColor = { S:"#FFD700", A:"#FF3CAC", B:"#7B2FBE", C:"#2B86C5" }[grade]!;
  const gradeMsg = {
    S: "Absolutely unhinged. You ate that up 🔥",
    A: "Okay okay, we respect this performance 💅",
    B: "Solid effort. We'll take it, birthday girl 🎂",
    C: "You were distracted thinking about cake. Fair. 🍰",
  }[grade]!;

  const timerPct = (timeLeft / DURATION) * 100;
  const timerColor = timeLeft > 12 ? "#11998e" : timeLeft > 7 ? "#FFB347" : "#FF3CAC";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-candy-dark select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0720] via-[#1A0A2E] to-[#0f0720]" />
      <ParticleOrb />

      {/* ── INTRO ── */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20"
          >
            <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-7xl"
              >
                🎮
              </motion.div>
              <div className="space-y-2">
                <h2
                  className="font-display text-[2.4rem] leading-none"
                  style={{
                    background: "linear-gradient(135deg,#FF3CAC,#FFD700)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}
                >
                  Catch the vibes.
                </h2>
                <p className="font-accent italic text-candy-cream/60 text-[15px]">
                  tap the birthday stuff, dodge the chaos
                </p>
              </div>

              {/* Rules */}
              <div className="glass rounded-2xl p-5 w-full space-y-3 text-left">
                {[
                  { icon:"🎂", rule:"Tap birthday emojis → points" },
                  { icon:"💀", rule:"Avoid bombs → lose 15 pts" },
                  { icon:"🔥", rule:"3+ combo → score multiplier" },
                  { icon:"⏱️", rule:`You have ${DURATION} seconds` },
                ].map(({icon,rule}) => (
                  <div key={rule} className="flex items-center gap-3">
                    <span className="text-xl w-7 text-center">{icon}</span>
                    <p className="font-body text-candy-cream/80 text-sm">{rule}</p>
                  </div>
                ))}
              </div>

              <CTAButton onClick={startGame} variant="pink" className="w-full">
                Let&apos;s go 🚀
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PLAYING ── */}
      {phase === "playing" && (
        <>
          {/* HUD */}
          <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-10 pb-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-body text-candy-cream/50">Score</span>
                <motion.span
                  key={score}
                  initial={{ scale: 1.4, color: "#FFD700" }}
                  animate={{ scale: 1,   color: "#FFF8F0" }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xl text-candy-cream"
                >
                  {score}
                </motion.span>
              </div>

              {combo >= 2 && (
                <motion.div
                  key={combo}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass rounded-xl px-3 py-1.5 flex items-center gap-1"
                  style={{ borderColor: combo >= 5 ? "#FFD700" : "#FF3CAC", borderWidth: 1 }}
                >
                  <span className="text-sm">{combo >= 5 ? "🔥" : "⚡"}</span>
                  <span className="font-body text-sm font-semibold" style={{ color: combo >= 5 ? "#FFD700" : "#FF3CAC" }}>
                    x{combo}
                  </span>
                </motion.div>
              )}

              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-sm">{timeLeft <= 7 ? "🔴" : "⏱️"}</span>
                <motion.span
                  key={timeLeft}
                  animate={{ scale: timeLeft <= 5 ? [1, 1.25, 1] : 1, color: timerColor }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xl"
                >
                  {timeLeft}
                </motion.span>
              </div>
            </div>

            {/* Timer bar */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${timerPct}%`, background: timerColor }}
                transition={{ duration: 0.8, ease: "linear" }}
              />
            </div>
          </div>

          {/* Bubble arena */}
          <div className="absolute inset-0 top-24">
            <AnimatePresence>
              {bubbles.map(b => (
                <motion.button
                  key={b.id}
                  initial={{ y: -80, opacity: 0, scale: 0.5 }}
                  animate={{ y: "110vh", opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8] }}
                  transition={{ duration: b.speed, ease: "linear" }}
                  onAnimationComplete={() => onMiss(b.id)}
                  onTouchStart={(e) => tap(b, e)}
                  onClick={(e) => tap(b, e)}
                  className="absolute touch-manipulation cursor-pointer"
                  style={{
                    left:      `${b.x}%`,
                    fontSize:  b.size,
                    lineHeight: 1,
                    filter: b.isBomb
                      ? "drop-shadow(0 0 8px rgba(255,60,172,0.8))"
                      : "drop-shadow(0 0 6px rgba(255,215,0,0.5))",
                    minWidth: 44,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {b.emoji}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating hit labels */}
          <AnimatePresence>
            {hits.map(h => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -50, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="fixed z-50 pointer-events-none font-body font-bold text-sm"
                style={{ left: h.x - 30, top: h.y - 10, color: h.label.includes("-") ? "#FF6B6B" : "#FFD700" }}
              >
                {h.label}
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}

      {/* ── RESULTS ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20"
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full max-w-sm flex flex-col items-center gap-5 text-center"
            >
              {/* Grade */}
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 16 }}
                className="w-24 h-24 rounded-3xl glass flex flex-col items-center justify-center gap-0.5"
                style={{ boxShadow: `0 0 40px ${gradeColor}55`, borderColor: `${gradeColor}40` }}
              >
                <span className="font-display text-4xl" style={{ color: gradeColor }}>{grade}</span>
                <span className="font-body text-xs text-candy-cream/40 uppercase tracking-widest">rank</span>
              </motion.div>

              <h2
                className="font-display text-[2rem] leading-tight"
                style={{
                  background: "linear-gradient(135deg,#FF3CAC,#FFD700)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                Game Over!
              </h2>
              <p className="font-accent italic text-candy-cream/65 text-[15px] px-4">{gradeMsg}</p>

              {/* Stats */}
              <div className="glass rounded-2xl p-5 w-full grid grid-cols-3 gap-3">
                {[
                  { label: "Score",      value: score,     icon: "⭐" },
                  { label: "Best Combo", value: `x${bestCombo}`, icon: "🔥" },
                  { label: "Missed",     value: missed,    icon: "😬" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{icon}</span>
                    <span className="font-display text-xl text-candy-cream">{value}</span>
                    <span className="font-body text-[10px] text-candy-cream/40 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-full">
                <motion.button
                  onClick={startGame}
                  whileTap={{ scale: 0.93 }}
                  className="flex-1 py-4 rounded-2xl glass font-body font-semibold text-candy-cream/70 text-sm touch-manipulation"
                >
                  Again 🔁
                </motion.button>
                <div className="flex-1">
                  <CTAButton onClick={onNext} variant="gold" className="w-full">
                    Finish 🎊
                  </CTAButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}