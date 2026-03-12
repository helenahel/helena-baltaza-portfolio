"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="relative inline-flex items-center">
      <button
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="text-foreground/70 transition-colors hover:text-foreground"
        onClick={() => {
          const currentTheme = theme;
          toggleTheme();

          // Show message only when switching TO dark mode
          if (currentTheme === "light") {
            setShowMessage(true);
          }
        }}
        type="button"
      >
        {theme === "dark" ? (
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            role="img"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <title>Sun icon</title>
            <path
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            role="img"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <title>Moon icon</title>
            <path
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {showMessage && (
        <div
          className="pointer-events-none absolute z-[60] whitespace-nowrap font-[family-name:var(--font-pixelify)] text-[14px] text-foreground"
          style={{
            right: "calc(100% + 8px)",
            top: "calc(50% - 8px)",
            animation:
              "popUp 0.15s ease-out forwards, fadeOut 0.2s ease-in 0.6s forwards",
          }}
        >
          Team dark mode!
        </div>
      )}
    </div>
  );
}
