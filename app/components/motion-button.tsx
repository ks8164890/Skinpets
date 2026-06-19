"use client";

import { motion } from "motion/react";
import React from "react";

interface MotionButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border-2 border-primary text-primary hover:bg-primary-light",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-[10px]",
  md: "px-6 py-3 text-base rounded-[16px]",
  lg: "px-8 py-4 text-lg rounded-[16px]",
};

export function MotionButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
}: MotionButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
