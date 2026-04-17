"use client";

import { motion } from "framer-motion";

export default function ParticleOrb() {
  const orbs = [
    { size: 320, x: "-10%", y: "-10%", color: "rgba(255,60,172,0.25)", delay: 0    },
    { size: 280, x: "60%",  y: "60%",  color: "rgba(123,47,190,0.2)",  delay: 1.5  },
    { size: 200, x: "70%",  y: "5%",   color: "rgba(255,179,71,0.2)",  delay: 0.8  },
    { size: 160, x: "10%",  y: "70%",  color: "rgba(43,134,197,0.2)",  delay: 2.2  },
  ];

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.x,
            top:    orb.y,
            background: orb.color,
          }}
          animate={{
            scale:  [1, 1.15, 1],
            x:      [0, 20, -10, 0],
            y:      [0, -20, 15, 0],
          }}
          transition={{
            duration: 7 + i * 1.5,
            delay:    orb.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}