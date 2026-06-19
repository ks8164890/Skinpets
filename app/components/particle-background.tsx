"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgba(74, 124, 89, 0.07)",
  "rgba(196, 149, 106, 0.05)",
  "rgba(74, 124, 89, 0.04)",
  "rgba(139, 111, 71, 0.04)",
  "rgba(196, 149, 106, 0.06)",
  "rgba(74, 124, 89, 0.05)",
];

export function ParticleBackground() {
  const prefersReduced = useReducedMotion();
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        size: 220 + Math.random() * 320,
        duration: 20 + Math.random() * 20,
        delay: -(Math.random() * 20),
        color: COLORS[i % COLORS.length],
      }))
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: "blur(64px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 35, -25, 18, 0],
                  y: [0, -22, 18, -32, 0],
                }
          }
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
