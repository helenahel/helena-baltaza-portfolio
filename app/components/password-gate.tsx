"use client";

import Link from "next/link";
import { useState } from "react";
import { verifyPassword } from "@/app/lib/password-config";
import { Navbar } from "./navbar";

interface PasswordGateProps {
  slug: string;
  onAuthenticate: () => void;
}

export default function PasswordGate({
  slug,
  onAuthenticate,
}: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (verifyPassword(slug, password)) {
      // Store authentication in sessionStorage
      sessionStorage.setItem(`project-auth-${slug}`, "true");
      onAuthenticate();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Floating Back Button */}
      <Link
        className="fixed top-24 left-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground/80 shadow-black/20 shadow-lg backdrop-blur-md transition-colors hover:text-foreground lg:left-12 lg:h-12 lg:w-12"
        href="/#projects"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 lg:h-6 lg:w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="sr-only">Back to Projects</span>
      </Link>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="font-medium font-sans text-xl sm:text-3xl">
              Ups, you'll need a <span className="font-display">password</span>{" "}
              here.
            </h1>
            <p className="text-base text-foreground/70 sm:text-lg">
              <span className="font-display">Contact me</span>
              <span className="font-sans"> to access this page's content.</span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  autoFocus
                  className="w-full rounded-lg border border-foreground/15 bg-background/50 px-4 py-3 pr-12 text-foreground transition-colors placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground/60 transition-colors hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                className="rounded-lg bg-ui-element-bg px-6 py-3 font-medium font-sans text-foreground transition-colors hover:bg-accent-text/20"
                type="submit"
              >
                Enter
              </button>
            </div>

            {error && (
              <p className="text-center text-red-400 text-sm">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
