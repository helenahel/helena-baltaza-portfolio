"use client";

import Link from "next/link";
import { MediaCard } from "./components/media-card";
import { Navbar } from "./components/navbar";
import { ParallaxText } from "./components/parallax-text";
import { useScrollFade } from "./hooks/use-parallax";
import { useLanguage } from "./lib/language-context";

export default function Home() {
  const { t } = useLanguage();

  // Scroll animation hooks for About section subsections
  const subsection1 = useScrollFade();
  const subsection2 = useScrollFade();
  const subsection3 = useScrollFade();

  const projects = [
    {
      title: t.projects.longevityPassport.title,
      slug: "longevity-passport",
      description: t.projects.longevityPassport.description,
      details: [
        {
          label: t.projects.longevityPassport.industry,
          chips: t.projects.longevityPassport.industryChips,
        },
        {
          label: t.projects.longevityPassport.type,
          chips: t.projects.longevityPassport.typeChips,
        },
        {
          label: t.projects.longevityPassport.platform,
          chips: t.projects.longevityPassport.platformChips,
        },
        {
          label: t.projects.longevityPassport.keyFocus,
          chips: t.projects.longevityPassport.keyFocusChips,
        },
      ],
    },
    {
      title: t.projects.sevenSprings.title,
      slug: "seven-springs",
      description: t.projects.sevenSprings.description,
      details: [
        {
          label: t.projects.sevenSprings.industry,
          chips: t.projects.sevenSprings.industryChips,
        },
        {
          label: t.projects.sevenSprings.type,
          chips: t.projects.sevenSprings.typeChips,
        },
        {
          label: t.projects.sevenSprings.platform,
          chips: t.projects.sevenSprings.platformChips,
        },
        {
          label: t.projects.sevenSprings.keyFocus,
          chips: t.projects.sevenSprings.keyFocusChips,
        },
      ],
    },
    {
      title: t.projects.orIntegration.title,
      slug: "or-integration",
      description: t.projects.orIntegration.description,
      details: [
        {
          label: t.projects.orIntegration.industry,
          chips: t.projects.orIntegration.industryChips,
        },
        {
          label: t.projects.orIntegration.type,
          chips: t.projects.orIntegration.typeChips,
        },
        {
          label: t.projects.orIntegration.platform,
          chips: t.projects.orIntegration.platformChips,
        },
        {
          label: t.projects.orIntegration.keyFocus,
          chips: t.projects.orIntegration.keyFocusChips,
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <Navbar />

      {/* Hero */}
      <section
        className="flex min-h-screen flex-col justify-center px-6 pt-20 sm:px-12 lg:px-24"
        id="hero"
      >
        <div className="w-full lg:w-3/4">
          <p className="mb-6 font-light text-accent-text text-base">
            {t.hero.label}
          </p>
          <h1 className="font-light text-[18px] text-secondary-text leading-relaxed lg:text-[22px]">
            {t.hero.intro_part1}{" "}
            <span className="font-display text-[20px] text-foreground lg:text-[24px]">
              {t.hero.intro_role}
            </span>{" "}
            {t.hero.intro_part2}{" "}
            <span className="font-display text-[20px] text-foreground lg:text-[24px]">
              {t.hero.intro_background}
            </span>{" "}
            {t.hero.intro_part3}{" "}
            <span className="font-display text-[20px] text-foreground lg:text-[24px]">
              {t.hero.intro_solutions}
            </span>
            {t.hero.intro_part4}{" "}
            <span className="font-display text-[20px] text-foreground lg:text-[24px]">
              {t.hero.intro_clients}
            </span>
            {t.hero.intro_part5}
          </h1>
          <a
            className="mt-8 inline-block text-accent-text/60 transition-colors hover:text-accent-text"
            href="https://www.linkedin.com/in/helena-baltaza-ux/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-24 sm:px-12 lg:px-24" id="projects">
        <div className="w-full">
          <div className="mb-16 flex items-center gap-6">
            <h2 className="shrink-0 font-light text-[18px] text-secondary-text">
              {t.projects.sectionTitle}
            </h2>
            <hr className="h-px w-full border-0 bg-accent-text/30" />
          </div>
          <div className="flex flex-col gap-32">
            {projects.map((project, index) => (
              <div
                className={`flex flex-col gap-10 lg:grid ${index % 2 !== 0 ? "lg:grid-cols-[730px_500px]" : "lg:grid-cols-[500px_730px]"} lg:gap-10`}
                key={project.title}
              >
                <div
                  className={`flex flex-col ${index % 2 !== 0 ? "lg:col-start-2" : ""}`}
                >
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
                          detail.label ===
                            t.projects.longevityPassport.keyFocus ||
                          detail.label === t.projects.sevenSprings.keyFocus ||
                          detail.label === t.projects.orIntegration.keyFocus
                            ? "flex flex-col gap-2"
                            : "flex flex-wrap items-center gap-2 font-light text-[16px] text-foreground lg:text-[18px]"
                        }
                        key={detail.label}
                      >
                        <span
                          className={
                            detail.label ===
                              t.projects.longevityPassport.keyFocus ||
                            detail.label === t.projects.sevenSprings.keyFocus ||
                            detail.label === t.projects.orIntegration.keyFocus
                              ? "font-light text-[16px] text-foreground lg:text-[18px]"
                              : "shrink-0"
                          }
                        >
                          {detail.label}:
                        </span>
                        <div
                          className={
                            detail.label ===
                              t.projects.longevityPassport.keyFocus ||
                            detail.label === t.projects.sevenSprings.keyFocus ||
                            detail.label === t.projects.orIntegration.keyFocus
                              ? "flex flex-wrap gap-2"
                              : "contents"
                          }
                        >
                          {detail.chips.map((chip) => (
                            <span
                              className="whitespace-nowrap rounded-full bg-ui-element-bg px-3 py-0.5 font-light text-[14px]"
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
                    className="group mt-8 inline-flex items-center gap-2 font-medium text-[16px] text-foreground transition-colors hover:text-foreground/80 lg:text-[18px]"
                    href={`/projects/${project.slug}`}
                  >
                    {t.projects.explore}
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
                  className={`w-full ${index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  href={`/projects/${project.slug}`}
                >
                  {project.slug === "longevity-passport" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-lg"
                      hoverImageSrc="/assets/media/main/Longevity-main_on_hover.png"
                      imageSrc="/assets/media/main/Longevity-main.png"
                      priority={index === 0}
                    />
                  )}
                  {project.slug === "or-integration" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-lg"
                      hoverImageSrc="/assets/media/main/OR-system-main-page-before.png"
                      imageSrc="/assets/media/main/OR-system-main-page-after.png"
                    />
                  )}
                  {project.slug === "seven-springs" && (
                    <MediaCard
                      alt={`${project.title} showcase`}
                      className="h-full cursor-pointer rounded-lg"
                      imageSrc="/assets/media/main/Seven-springs-main.png"
                      videoSrc="/assets/media/main/Seven_springs_main.mov"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-24 sm:px-12 lg:px-24" id="about">
        <div className="w-full">
          <div className="mb-16 flex items-center gap-6">
            <h2 className="shrink-0 font-light text-[18px] text-secondary-text">
              {t.about.sectionTitle}
            </h2>
            <hr className="h-px w-full border-0 bg-accent-text/30" />
          </div>

          <div className="space-y-12 lg:w-3/5">
            {/* The Psychologist in the Room */}
            <div
              className="transition-all duration-700 ease-out"
              ref={subsection1.ref}
              style={{
                opacity: subsection1.isVisible ? 1 : 0,
                transform: subsection1.isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: "0ms",
              }}
            >
              <h3 className="mb-4 font-display text-foreground text-lg">
                {t.about.psychologist.title}
              </h3>
              <p className="mb-4 font-light text-base text-foreground/70 leading-relaxed">
                {t.about.psychologist.paragraph1_part1}{" "}
                <strong className="font-medium text-foreground">
                  {t.about.psychologist.paragraph1_education}
                </strong>
                {t.about.psychologist.paragraph1_part2}
              </p>
              <p className="font-light text-base text-foreground/70 leading-relaxed">
                {t.about.psychologist.paragraph2}
              </p>
            </div>

            {/* From Chaos to Compass */}
            <div
              className="transition-all duration-700 ease-out"
              ref={subsection2.ref}
              style={{
                opacity: subsection2.isVisible ? 1 : 0,
                transform: subsection2.isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: "150ms",
              }}
            >
              <h3 className="mb-4 font-display text-foreground text-lg">
                {t.about.compass.title}
              </h3>
              <p className="mb-4 font-light text-base text-foreground/70 leading-relaxed">
                {t.about.compass.paragraph1}
              </p>
              <p className="font-light text-base text-foreground/70 leading-relaxed">
                {t.about.compass.paragraph2_part1}{" "}
                <strong className="font-medium text-foreground">
                  {t.about.compass.paragraph2_goal}
                </strong>
              </p>
            </div>

            {/* Why HealthTech? */}
            <div
              className="transition-all duration-700 ease-out"
              ref={subsection3.ref}
              style={{
                opacity: subsection3.isVisible ? 1 : 0,
                transform: subsection3.isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: "300ms",
              }}
            >
              <h3 className="mb-4 font-display text-foreground text-lg">
                {t.about.healthtech.title}
              </h3>
              <p className="font-light text-base text-foreground/70 leading-relaxed">
                {t.about.healthtech.paragraph}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="parallax-section py-32 text-center">
        <ParallaxText>{t.cta.text}</ParallaxText>
      </section>

      {/* Footer */}
      <footer className="border-separator border-t px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-4xl space-y-2 text-center text-sm">
          <p className="font-light text-foreground/70">
            {t.footer.name} &middot; {t.footer.role}
          </p>
          <p className="font-light text-foreground/50">{t.footer.tagline}</p>
          <div className="flex items-center justify-center gap-4 pt-4 text-foreground/30 text-xs">
            <span>&copy; {t.footer.copyright}</span>
            <span>&middot;</span>
            <span>{t.footer.builtWith}</span>
            <span>&middot;</span>
            <span>{t.footer.thanks}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
