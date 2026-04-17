"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "pink" | "gold" | "ghost";
  className?: string;
}

export default function CTAButton({
  onClick,
  children,
  variant = "pink",
  className = "",
}: CTAButtonProps) {
  const variants = {
    pink: "bg-gradient-to-r from-candy-pink to-candy-coral text-white glow-pink",
    gold: "bg-gradient-to-r from-candy-gold to-candy-peach text-candy-dark glow-gold",
    ghost: "glass text-white border border-white/20",
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        px-8 py-4 rounded-2xl
        font-body font-semibold text-[17px] tracking-wide
        min-h-[56px] min-w-[180px]
        overflow-hidden cursor-pointer
        select-none touch-manipulation
        transition-shadow duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="absolute inset-0 shimmer pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}