"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

// Shared timing tokens for a restrained, premium feel.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.6;

type Tag =
  | "div" | "section" | "article" | "aside" | "header" | "footer"
  | "ul" | "li" | "h1" | "h2" | "h3" | "p" | "span" | "form" | "a";

const TAGS = {
  div: motion.div, section: motion.section, article: motion.article, aside: motion.aside,
  header: motion.header, footer: motion.footer, ul: motion.ul, li: motion.li,
  h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, span: motion.span,
  form: motion.form, a: motion.a,
} as const;

type CommonProps = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

type RevealProps = CommonProps & {
  /** delay in seconds */
  delay?: number;
  /** vertical travel distance */
  y?: number;
  /** apply a subtle blur -> clear on reveal */
  blur?: boolean;
  /** how much of the element must be visible to trigger */
  amount?: number;
};

/**
 * Scroll-triggered reveal. Animates opacity + subtle upward motion (and optional
 * blur) once, when the element enters the viewport. Renders the requested tag
 * directly so it carries the element's own styling classes without extra DOM.
 */
export function Reveal({
  as = "div", children, className, delay = 0, y = 28, blur = true, amount = 0.2, ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as] as typeof motion.div;

  if (reduce) return <M className={className} {...rest}>{children}</M>;

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

type StaggerProps = CommonProps & {
  /** seconds between each child */
  gap?: number;
  /** initial delay before the first child */
  delay?: number;
  amount?: number;
};

/**
 * Parent container that orchestrates its StaggerItem children. Each child
 * enters in sequence once the container scrolls into view.
 */
export function Stagger({
  as = "div", children, className, gap = 0.08, delay = 0.05, amount = 0.2, ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as] as typeof motion.div;

  if (reduce) return <M className={className} {...rest}>{children}</M>;

  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </M>
  );
}

type ItemProps = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
  y?: number;
  href?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

/** Child of <Stagger>. Rises + fades in on its parent's cue. */
export function StaggerItem({ as = "div", children, className, y = 22, ...rest }: ItemProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as] as typeof motion.div;

  if (reduce) return <M className={className} {...rest}>{children}</M>;

  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}
