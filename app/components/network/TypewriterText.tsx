"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timeout = setTimeout(() => {
        const timer = setInterval(() => {
          setDisplayText(text.substring(0, i));
          i++;
          if (i > text.length) clearInterval(timer);
        }, 20);
        return () => clearInterval(timer);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return <span ref={ref}>{displayText}</span>;
};
