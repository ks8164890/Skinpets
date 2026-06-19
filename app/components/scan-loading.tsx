"use client";

import { motion } from "motion/react";

export function ScanLoading({ label = "Analyzing..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/30"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-4 border-primary/50"
          animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-primary"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </div>
      <motion.p
        className="text-muted-foreground text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {label}
      </motion.p>
    </div>
  );
}
