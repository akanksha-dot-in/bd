"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const LandingScreen      = dynamic(() => import("@/components/LandingScreen"),      { ssr: false });
const MessageSection     = dynamic(() => import("@/components/MessageSection"),     { ssr: false });
const InteractiveSection = dynamic(() => import("@/components/InteractiveSection"), { ssr: false });
const GameSection        = dynamic(() => import("@/components/GameSection"),        { ssr: false });
const QuizSection        = dynamic(() => import("@/components/QuizSection"),        { ssr: false });
const SketchStory        = dynamic(() => import("@/components/SketchStory"),        { ssr: false });
const EndingScreen       = dynamic(() => import("@/components/EndingScreen"),       { ssr: false });

type Section = "landing" | "message" | "interactive" | "game" | "quiz" | "sketch" | "ending";

const variants = {
  initial:  { opacity: 0, y: 24, scale: 0.98 },
  animate:  { opacity: 1, y: 0,  scale: 1    },
  exit:     { opacity: 0, y: -16, scale: 0.98 },
};

const transition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

export default function BirthdayPage() {
  const [section, setSection] = useState<Section>("landing");
  const go = (s: Section) => setSection(s);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0E0719]">
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {section === "landing"      && <LandingScreen      onNext={() => go("message")}      />}
          {section === "message"      && <MessageSection     onNext={() => go("interactive")}  />}
          {section === "interactive"  && <InteractiveSection onNext={() => go("game")}         />}
          {section === "game"         && <GameSection        onNext={() => go("quiz")}         />}
          {section === "quiz"         && <QuizSection        onNext={() => go("sketch")}       />}
          {section === "sketch"       && <SketchStory        onNext={() => go("ending")}       />}
          {section === "ending"       && <EndingScreen                                         />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}