"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/lib/language-context";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: t.navbar.projects, href: "/#projects" },
    { label: t.navbar.about, href: "/#about" },
    {
      label: t.navbar.cv,
      href: "https://drive.google.com/file/d/1EsFzrpFbfArwxXRZsQtnVhN4N9qKWf03/view?usp=sharing",
      external: true,
    },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // Scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed top-0 z-50 flex w-full items-center justify-between bg-background/80 px-6 py-4 backdrop-blur-md sm:px-12 lg:grid lg:grid-cols-[1fr_auto_1fr]"
        ref={navRef}
      >
        <a className="flex flex-col" href="/#hero">
          <span className="font-display text-[16px] text-foreground">
            {t.navbar.name}
          </span>
          <span className="font-light text-[16px] text-accent-text">
            {t.navbar.role}
          </span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href + link.label}>
              <a
                className="group relative font-light text-[16px] text-foreground"
                href={link.href}
                {...(link.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
              >
                <span className="inline-block transition-transform group-hover:-translate-y-0.5">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-4">
          <ThemeToggle />
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            <span
              className={`block h-px w-5 bg-foreground transition-all duration-300 ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-all duration-300 ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pt-24 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <li key={link.href + link.label}>
              <a
                className="font-light text-[24px] text-foreground"
                href={link.href}
                onClick={() => setIsOpen(false)}
                {...(link.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
