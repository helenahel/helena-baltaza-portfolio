"use client";

import { useEffect, useRef } from "react";

export function ParallaxText({ children }: { children: React.ReactNode }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible (0 to 1)
      const visiblePercentage = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      // Start lower (+100px) and move to centered (0px) as user scrolls
      // The more visible, the more it moves up toward center
      const translateY = 100 - visiblePercentage * 100;

      textRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <p
      className="parallax-text mx-auto max-w-4xl font-display text-[32px] text-accent-text leading-tight sm:text-[48px] lg:text-[64px]"
      ref={textRef}
    >
      {children}
    </p>
  );
}
