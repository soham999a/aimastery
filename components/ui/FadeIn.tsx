"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({ children, delay = 0, direction = "up", className, style }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const dirMap = {
    up:    { y: 32, x: 0 },
    down:  { y: -32, x: 0 },
    left:  { y: 0, x: 32 },
    right: { y: 0, x: -32 },
    none:  { y: 0, x: 0 },
  };

  const { x, y } = dirMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
