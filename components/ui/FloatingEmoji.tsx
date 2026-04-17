"use client";

import { motion } from "framer-motion";

interface FloatingEmojiProps {
  emoji: string;
  style?: React.CSSProperties;
  delay?: number;
  size?: string;
}

export default function FloatingEmoji({
  emoji,
  style,
  delay = 0,
  size = "text-3xl",
}: FloatingEmojiProps) {
  return (
    <motion.span
      aria-hidden
      className={`absolute select-none pointer-events-none ${size}`}
      style={style}
      initial={{ opacity: 0, y: 20, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, 0, -10, -30],
        scale: [0.5, 1, 1.05, 0.9],
        rotate: [-8, 0, 8, -4],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.span>
  );
}