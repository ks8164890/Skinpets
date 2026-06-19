"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface MotionCardProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionCard({ children, className = "", delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`bg-card rounded-[16px] p-6 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
