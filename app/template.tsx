"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/motion";

// Subtle route transition. Opacity-only on purpose: a lingering transform on a
// page-level wrapper would become the containing block for the fixed mobile
// menu, so we keep the wrapper transform-free.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>
      {children}
    </motion.div>
  );
}
