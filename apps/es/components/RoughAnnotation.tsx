"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation/lib/rough-notation";
import type {
  RoughAnnotationType,
  RoughPadding,
} from "rough-notation/lib/model";

type Props = {
  type?: RoughAnnotationType;
  color?: string;
  strokeWidth?: number;
  padding?: RoughPadding;
  animationDuration?: number;
  iterations?: number;
  multiline?: boolean;
  children: ReactNode;
  /** Delay (ms) antes de disparar tras entrar en viewport. */
  delay?: number;
};

export default function RoughAnnotation({
  type = "underline",
  color = "var(--cta)",
  strokeWidth = 2,
  padding = 4,
  animationDuration = 800,
  iterations = 2,
  multiline = false,
  children,
  delay = 120,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const annotation = annotate(el, {
      type,
      color,
      strokeWidth,
      padding,
      animationDuration,
      iterations,
      multiline,
    });

    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            window.setTimeout(() => annotation.show(), delay);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      annotation.remove();
    };
  }, [type, color, strokeWidth, padding, animationDuration, iterations, multiline, delay]);

  return <span ref={ref}>{children}</span>;
}
