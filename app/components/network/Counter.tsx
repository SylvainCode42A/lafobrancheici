"use client";
import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView } from 'framer-motion';

export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
    else motionValue.set(0);
  }, [motionValue, value, isInView]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(latest > 10 ? 0 : 1);
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}