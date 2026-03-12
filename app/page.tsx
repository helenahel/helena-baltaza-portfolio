"use client";

import Image from "next/image";
import { Navbar } from "./components/navbar";
import { ParallaxText } from "./components/parallax-text";
import { ProjectCarousel } from "./components/project-carousel";
import { useTheme } from "./components/theme-provider";
import { useScrollFade } from "./hooks/use-parallax";
import { useLanguage } from "./lib/language-context";

export default function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Scroll animation hooks for About section subsections
  const subsection1 = useScrollFade();
  const subsection2 = useScrollFade();
  const subsection3 = useScrollFade();

  const projects = [
    {
      title: t.projects.longevityPassport.title,
      slug: "longevity-passport",
      description: t.projects.longevityPassport.description,
      originalIndex: 0,
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
      originalIndex: 1,
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
      originalIndex: 2,
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
    <div className="relative min-h-screen font-sans text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="mx-[40px] mt-4 rounded-[60px] bg-frame-bg">
        <section
          className="relative flex h-[740px] flex-col justify-center px-12 py-16 lg:px-20"
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
          </div>
          <a
            className="btn-hover-border relative mt-8 flex w-fit items-center gap-2 rounded-[200px] bg-ui-element-border/25 dark:bg-ui-element-border px-5 py-1.5 font-light font-sans text-[16px] text-secondary-text transition-colors hover:text-foreground"
            href="#projects"
          >
            See projects
          </a>
          <Image
            alt="Profile photo"
            className="absolute right-[36px] bottom-[96px] rounded-[200px]"
            height={100}
            src={
              theme === "dark"
                ? "/assets/media/main/profile_dark_mode.png"
                : "/assets/media/main/profile_light_mode.png"
            }
            width={100}
          />
          <div className="absolute right-[144px] bottom-[96px] flex h-12 items-center gap-2 whitespace-nowrap rounded-[200px] border border-ui-element-border px-5 font-light font-sans text-[20px] text-secondary-text">
            <svg
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10C20 14.418 12 22 12 22C12 22 4 14.418 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                stroke="currentColor"
              />
              <path
                d="M12 11C12.2652 11 12.5196 10.8946 12.7071 10.7071C12.8946 10.5196 13 10.2652 13 10C13 9.73478 12.8946 9.48043 12.7071 9.29289C12.5196 9.10536 12.2652 9 12 9C11.7348 9 11.4804 9.10536 11.2929 9.29289C11.1054 9.48043 11 9.73478 11 10C11 10.2652 11.1054 10.5196 11.2929 10.7071C11.4804 10.8946 11.7348 11 12 11Z"
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Warsaw
          </div>
          <div className="absolute right-[100px] bottom-[36px] flex h-12 items-center whitespace-nowrap rounded-[200px] border border-ui-element-border px-5 font-light font-sans text-[20px] text-secondary-text">
            Available for work
          </div>
          <a
            className="btn-hover-border absolute right-[36px] bottom-[36px] flex size-12 items-center justify-center rounded-[200px] bg-ui-element-border/25 dark:bg-ui-element-border text-secondary-text transition-colors hover:text-foreground"
            href="https://www.linkedin.com/in/helena-baltaza-ux/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 9.5H4C3.057 9.5 2.586 9.5 2.293 9.793C2 10.086 2 10.557 2 11.5V20C2 20.943 2 21.414 2.293 21.707C2.586 22 3.057 22 4 22H4.5C5.443 22 5.914 22 6.207 21.707C6.5 21.414 6.5 20.943 6.5 20V11.5C6.5 10.557 6.5 10.086 6.207 9.793C5.914 9.5 5.443 9.5 4.5 9.5ZM6.5 4.25C6.5 4.84674 6.26295 5.41903 5.84099 5.84099C5.41903 6.26295 4.84674 6.5 4.25 6.5C3.65326 6.5 3.08097 6.26295 2.65901 5.84099C2.23705 5.41903 2 4.84674 2 4.25C2 3.65326 2.23705 3.08097 2.65901 2.65901C3.08097 2.23705 3.65326 2 4.25 2C4.84674 2 5.41903 2.23705 5.84099 2.65901C6.26295 3.08097 6.5 3.65326 6.5 4.25Z"
                stroke="currentColor"
              />
              <path
                d="M12.326 9.50002H11.5C10.557 9.50002 10.086 9.50002 9.793 9.79302C9.5 10.086 9.5 10.557 9.5 11.5V20C9.5 20.943 9.5 21.414 9.793 21.707C10.086 22 10.557 22 11.5 22H12C12.943 22 13.414 22 13.707 21.707C14 21.414 14 20.943 14 20V16.5C14 14.843 14.528 13.5 16.088 13.5C16.868 13.5 17.5 14.172 17.5 15V19.5C17.5 20.443 17.5 20.914 17.793 21.207C18.086 21.5 18.557 21.5 19.5 21.5H19.999C20.941 21.5 21.413 21.5 21.706 21.207C21.998 20.914 21.999 20.443 21.999 19.501L22 14C22 11.514 19.636 9.50002 17.297 9.50002C15.965 9.50002 14.777 10.152 14 11.173C14 10.543 14 10.228 13.863 9.99402C13.7764 9.84596 13.6531 9.72267 13.505 9.63602C13.271 9.49902 12.956 9.49902 12.326 9.49902V9.50002Z"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </section>
      </div>

      <ProjectCarousel
        exploreLabel={t.projects.explore}
        keyFocusLabel={t.projects.longevityPassport.keyFocus}
        projects={projects}
        sectionTitle={t.projects.sectionTitle}
      />

      {/* About section heading */}
      <div className="mt-[26px] mb-[26px] ml-[48px]" id="about">
        <span className="inline-block rounded-[200px] bg-frame-bg px-4 py-2 font-light text-[20px] text-secondary-text">
          {t.about.sectionTitle}
        </span>
      </div>

      {/* About */}
      <div className="mx-[40px] mt-4 rounded-[60px] bg-frame-bg px-12 py-16 lg:px-20">
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
