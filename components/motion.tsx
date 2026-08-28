"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

// Shared timing tokens for a restrained, premium feel.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.6;

type Tag = "div" | "section" | "article" | "aside" | "header" | "footer" | "ul" | "li" | "h1" | "h2" | "h3" | "p" | "span" | "form";

const TAGS: Record<Tag, ReturnType<typeof motion.create>> = {
  div: motion.div, section: motion.section, article: motion.article, aside: motion.aside,
  header: motion.header, footer: motion.footer, ul: motion.ul, li: motion.li,
  h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, span: motion.span, form: motion.form,
};

type RevealProps = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
  /** delay in seconds, use index * 0.06 for staggered grids */
  delay?: number;
  /** vertical travel distance */
  y?: number;
  /** apply a subtle blur -> clear on reveal */
  blur?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

/**
 * Scroll-triggered reveal. Animates opacity + subtle upward motion (and optional
 * blur) once, when the element enters the viewport. Renders the requested tag
 * directly so it can carry the element's own styling classes without extra DOM.
 */
export function Reveal({ as = "div", children, className, delay = 0, y = 28, blur = true, amount = 0.2, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as];

  if (reduce) {
    return <M className={className} {...rest}>{children}</M>;
  }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(4px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount, margin: "-80px" }}
      transition={{ duration: REVEAL_DURATION, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}
