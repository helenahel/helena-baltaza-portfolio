"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { MediaCard } from "./media-card";

interface CarouselProject {
  title: string;
  slug: string;
  description: string;
  details: { label: string; chips: string[] }[];
  originalIndex: number;
}

interface ProjectCarouselProps {
  sectionTitle: string;
  exploreLabel: string;
  keyFocusLabel: string;
  projects: CarouselProject[]; // passed in original order [0,1,2]
}

// Track order: [SevenSprings_clone, Longevity, OR, SevenSprings, Longevity_clone]
// Indices:              0              1        2       3              4
// Start at trackIndex = 1 (Longevity centered)
function buildTrack(projects: CarouselProject[]) {
  return [projects[1], projects[0], projects[2], projects[1], projects[0]];
}

export function ProjectCarousel({
  sectionTitle,
  exploreLabel,
  keyFocusLabel,
  projects,
}: ProjectCarouselProps) {
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState("650ms");
  const trackRef = useRef<HTMLDivElement>(null);

  const trackItems = buildTrack(projects);

  const handleTransitionEnd = useCallback(() => {
    if (trackIndex === 4) {
      // At Longevity clone → snap instantly to real Longevity at index 1
      setTransitionDuration("0ms");
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionDuration("650ms");
        });
      });
    } else if (trackIndex === 0) {
      // At SevenSprings clone → snap instantly to real SevenSprings at index 3
      setTransitionDuration("0ms");
      setTrackIndex(3);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionDuration("650ms");
        });
      });
    }
  }, [trackIndex]);

  const goNext = () => setTrackIndex((i) => i + 1);
  const goPrev = () => setTrackIndex((i) => i - 1);

  // Resolve the active project's originalIndex (handles clone positions 0 and 4)
  let effectiveIndex = trackIndex;
  if (trackIndex === 0) {
    effectiveIndex = 3;
  }
  if (trackIndex === 4) {
    effectiveIndex = 1;
  }
  const activeDot = effectiveIndex - 1;

  return (
    <>
      {/* Section heading with arrow buttons */}
      <div
        className="mt-[26px] mb-[26px] ml-[48px] flex items-center gap-3"
        id="projects"
      >
        <div className="inline-flex items-center gap-3 rounded-[200px] bg-frame-bg px-4 py-2">
          <span className="font-light text-[20px] text-secondary-text">
            {sectionTitle}
          </span>
          <div aria-hidden="true" className="flex items-center gap-1.5">
            {[0, 1, 2].map((dotIndex) => (
              <span
                className="rounded-full transition-all duration-300"
                key={dotIndex}
                style={
                  dotIndex === activeDot
                    ? { width: 8, height: 8, backgroundColor: "#6480B8" }
                    : {
                        width: 5,
                        height: 5,
                        backgroundColor: "var(--color-foreground)",
                        opacity: 0.25,
                      }
                }
              />
            ))}
          </div>
        </div>
        <button
          aria-label="Previous project"
          className="btn-hover-border relative flex size-10 items-center justify-center rounded-[200px] bg-ui-element-border/25 dark:bg-ui-element-border text-foreground"
          onClick={goPrev}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          aria-label="Next project"
          className="btn-hover-border relative flex size-10 items-center justify-center rounded-[200px] bg-ui-element-border/25 dark:bg-ui-element-border text-foreground"
          onClick={goNext}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Carousel viewport */}
      <div className="overflow-hidden">
        <div
          className="flex pl-[40px]"
          onTransitionEnd={handleTransitionEnd}
          ref={trackRef}
          style={{
            transform: `translateX(calc(-${trackIndex} * (100vw - 64px)))`,
            transitionDuration,
            transitionProperty: "transform",
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
          {trackItems.map((project, i) => (
            <div
              className="mr-4 w-[calc(100vw-80px)] shrink-0 rounded-[60px] bg-frame-bg px-[34px] py-[34px]"
              key={`${project.slug}-${i}`}
            >
              <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_500px] lg:gap-10">
                <div className="flex flex-col lg:col-start-2">
                  <h3 className="font-display text-[28px] text-foreground lg:text-[36px]">
                    {project.title}
                  </h3>
                  <p className="mt-4 whitespace-pre-line font-light text-[16px] text-foreground leading-relaxed lg:text-[18px]">
                    {project.description}
                  </p>
                  <div className="mt-20 flex flex-col gap-3">
                    {project.details.map((detail) => (
                      <div
                        className={
                          detail.label === keyFocusLabel
                            ? "flex flex-col gap-2"
                            : "flex flex-wrap items-center gap-2 font-light text-[16px] text-foreground lg:text-[18px]"
                        }
                        key={detail.label}
                      >
                        <span
                          className={
                            detail.label === keyFocusLabel
                              ? "font-light text-[16px] text-foreground lg:text-[18px]"
                              : "shrink-0"
                          }
                        >
                          {detail.label}:
                        </span>
                        <div
                          className={
                            detail.label === keyFocusLabel
                              ? "flex flex-wrap gap-2"
                              : "contents"
                          }
                        >
                          {detail.chips.map((chip) => (
                            <span
                              className="whitespace-nowrap rounded-full border-[0.5px] border-ui-element-border px-3 py-0.5 font-light text-[14px]"
                              key={chip}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    className="btn-hover-border group relative mt-8 inline-flex w-fit items-center gap-2 rounded-[200px] bg-ui-element-border/25 dark:bg-ui-element-border px-5 py-1.5 font-medium text-[16px] text-foreground transition-colors hover:text-foreground/80 lg:text-[18px]"
                    href={`/projects/${project.slug}`}
                  >
                    {exploreLabel}
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 rotate-[-45deg] transition-transform duration-300 group-hover:rotate-0"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <Link
                  className="w-full lg:col-start-1 lg:row-start-1"
                  href={`/projects/${project.slug}`}
                >
                  {project.slug === "longevity-passport" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-[30px]"
                      hoverImageSrc="/assets/media/main/Longevity-main_on_hover.png"
                      imageSrc="/assets/media/main/Longevity-main.png"
                      priority={i === 1}
                    />
                  )}
                  {project.slug === "or-integration" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-[30px]"
                      hoverImageSrc="/assets/media/main/OR-system-main-page-before.png"
                      imageSrc="/assets/media/main/OR-system-main-page-after.png"
                    />
                  )}
                  {project.slug === "seven-springs" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-[30px]"
                      imageSrc="/assets/media/main/Seven-springs-main.png"
                      videoSrc="/assets/media/main/Seven_springs_main.mov"
                    />
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
