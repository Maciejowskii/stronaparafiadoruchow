"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export default function MotionReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
}: Props) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 28 };
      case "down":
        return { opacity: 0, y: -28 };
      case "left":
        return { opacity: 0, x: 28 };
      case "right":
        return { opacity: 0, x: -28 };
      default:
        return { opacity: 0, y: 28 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth custom cubic-bezier
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
