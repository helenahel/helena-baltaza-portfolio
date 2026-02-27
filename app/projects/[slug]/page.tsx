"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { MediaCard } from "@/app/components/media-card";
import { Navbar } from "@/app/components/navbar";
import ProjectContentWrapper from "@/app/components/project-content-wrapper";
import { useProjectTranslation } from "@/app/lib/use-project-translation";

// Projects data - matches homepage
const projects = [
  {
    title: "Longevity Passport",
    slug: "longevity-passport",
  },
  {
    title: "Seven Springs Website",
    slug: "seven-springs",
  },
  {
    title: "O.R. Integration System",
    slug: "or-integration",
  },
];

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const { common, ...t } = useProjectTranslation(slug || "");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return null;
  }

  // Validate slug
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  // Get other projects for navigation footer
  const otherProjects = projects.filter((p) => p.slug !== slug);

  // O.R. Integration content
  if (slug === "or-integration") {
    const orT = t as any;
    return (
      <ProjectContentWrapper slug={slug}>
        <div className="relative min-h-screen bg-background font-sans text-foreground">
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
            <span className="sr-only">{common.backToProjects}</span>
          </Link>

          {/* Hero Section */}
          <section className="px-6 pt-32 pb-16 sm:px-12 lg:px-24 lg:pt-40">
            <div className="mx-auto w-full max-w-6xl">
              {/* Tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {orT.tags?.map((tag: string) => (
                  <span
                    className="rounded-full border border-foreground/15 px-3 py-1 font-light text-[14px]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-6 font-display text-[48px] text-foreground leading-tight lg:text-[64px]">
                {orT.hero?.title}
              </h1>

              {/* Subtitle */}
              <p className="font-light text-[18px] text-foreground/80 lg:text-[20px]">
                {orT.hero?.subtitle}
              </p>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl space-y-16">
              {/* The Challenge */}
              <div>
                <h3 className="mb-4 font-medium text-[14px] text-foreground/60 tracking-wide">
                  {orT.challenge?.heading}
                </h3>
                <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[24px]">
                  {orT.challenge?.zeroDocumentation
                    ? orT.challenge?.text?.split(
                        orT.challenge.zeroDocumentation
                      )[0]
                    : orT.challenge?.text}
                  {orT.challenge?.zeroDocumentation && (
                    <>
                      <strong className="font-medium text-foreground">
                        {orT.challenge.zeroDocumentation}
                      </strong>
                      {
                        orT.challenge?.text?.split(
                          orT.challenge.zeroDocumentation
                        )[1]
                      }
                    </>
                  )}
                </p>
              </div>

              {/* Two Columns: Role/Outcome Stack + Photo */}
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Left: My Role and Outcome Stack */}
                <div className="flex flex-col gap-6">
                  {/* My Role */}
                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {orT.myRole?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {orT.myRole?.text}
                    </p>
                  </div>

                  {/* The Outcome */}
                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {orT.outcome?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {orT.outcome?.text}
                    </p>
                  </div>
                </div>

                {/* Right: Photo Placeholder */}
                <MediaCard
                  alt="O.R. Integration system overview"
                  className="min-h-[200px] rounded-lg border border-foreground/10 shadow-black/20 shadow-lg"
                  imageSrc="/assets/media/or-integration/OR-integration-system-overview.png"
                  videoSrc="/assets/media/or-integration/OR-integration-system-overview.mov"
                />
              </div>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="space-y-32 px-6 py-16 sm:px-12 lg:px-24">
            {/* Phase 1 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {orT.phase1?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {orT.phase1?.title}
              </h2>

              <div className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <MediaCard
                    alt="Legacy system screenshot from sales video"
                    className="min-h-[300px] rounded-lg border border-foreground/10 bg-ui-element-bg shadow-black/20 shadow-lg"
                    hoverImageSrc="/assets/media/or-integration/Legacy-system-screenshot-from-sales-video-on-hover.png"
                    imageSrc="/assets/media/or-integration/Legacy-system-screenshot-from-sales-video.png"
                  />
                  <MediaCard
                    alt="Clean Figma component design"
                    className="min-h-[300px] rounded-lg border border-foreground/10 bg-ui-element-bg shadow-black/20 shadow-lg"
                    hoverImageSrc="/assets/media/or-integration/Clean-figma-component-design-on-hover.png"
                    imageSrc="/assets/media/or-integration/Clean-figma-component-design.png"
                  />
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {orT.phase1?.frictionTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {orT.phase1?.frictionText}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {orT.phase1?.solutionTitle}
                  </h3>
                  <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    {orT.phase1?.solutionIntro}
                  </p>

                  <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {orT.phase1?.reconstruction}
                        </strong>{" "}
                        {orT.phase1?.reconstructionText}
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {orT.phase1?.value}
                        </strong>{" "}
                        {orT.phase1?.valueText}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Phase 2 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {orT.phase2?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {orT.phase2?.title}
              </h2>

              <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {orT.phase2?.challengeTitle}
                    </h3>
                    <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                      {orT.phase2?.challengeText}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {orT.phase2?.uxStrategyTitle}
                    </h3>
                    <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                      {orT.phase2?.errorPrevention
                        ? orT.phase2?.uxStrategyIntro?.split(
                            orT.phase2.errorPrevention
                          )[0]
                        : orT.phase2?.uxStrategyIntro}
                      {orT.phase2?.errorPrevention && (
                        <>
                          <strong className="font-medium text-foreground">
                            {orT.phase2.errorPrevention}
                          </strong>
                          {
                            orT.phase2?.uxStrategyIntro?.split(
                              orT.phase2.errorPrevention
                            )[1]
                          }
                        </>
                      )}
                    </p>

                    <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                      <li className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                          <svg
                            className="h-6 w-6 text-accent-text"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <strong className="font-medium text-foreground">
                            {orT.phase2?.constraint}
                          </strong>{" "}
                          {orT.phase2?.constraintText}
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                          <svg
                            className="h-6 w-6 text-accent-text"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <strong className="font-medium text-foreground">
                            {orT.phase2?.why}
                          </strong>{" "}
                          {orT.phase2?.whyText}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full shrink-0 lg:w-[400px]">
                  <MediaCard
                    alt="Admin configuration panel design"
                    className="h-[220px] w-full rounded-lg border border-foreground/10 bg-ui-element-bg sm:h-[380px] lg:h-[430px] lg:w-[400px]"
                    hoverImageSrc="/assets/media/or-integration/Admin-configuration-panel-design-on-hover.png"
                    imageSrc="/assets/media/or-integration/Admin-configuration-panel-design.png"
                  />
                </div>
              </div>
            </section>

            {/* Phase 3 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {orT.phase3?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {orT.phase3?.title}
              </h2>

              <div className="space-y-8">
                <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[22px]">
                  {orT.phase3?.intro}
                </p>

                <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                  <li className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                      <svg
                        className="h-6 w-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <strong className="font-medium text-foreground">
                        {orT.phase3?.precisionSpecs}
                      </strong>{" "}
                      {orT.phase3?.precisionSpecsText}
                      <em>{orT.phase3?.precisionSpecsExample}</em>
                      {orT.phase3?.precisionSpecsEnd}
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                      <svg
                        className="h-6 w-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <strong className="font-medium text-foreground">
                        {orT.phase3?.collaboration}
                      </strong>{" "}
                      {orT.phase3?.collaborationText}
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Navigation Footer */}
          <section className="border-separator border-t px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl">
              <h3 className="mb-8 font-display text-[24px] text-foreground">
                {common.moreProjects}
              </h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {otherProjects.map((proj) => (
                  <Link
                    className="group rounded-xl bg-ui-element-bg p-6 shadow-black/20 shadow-lg transition-shadow hover:shadow-black/30 hover:shadow-xl"
                    href={`/projects/${proj.slug}`}
                    key={proj.slug}
                  >
                    <h4 className="mb-2 font-display text-[20px] text-foreground transition-colors group-hover:text-accent-text">
                      {proj.title}
                    </h4>
                    <div className="flex items-center gap-2 font-medium text-[14px] text-foreground/60 transition-colors group-hover:text-foreground/80">
                      <span>{common.viewCaseStudy}</span>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  className="inline-flex items-center gap-2 font-medium text-foreground/60 transition-colors hover:text-foreground"
                  href="/#projects"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  {common.viewAllProjects}
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-separator border-t px-6 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-4xl space-y-2 text-center text-sm">
              <p className="font-light text-foreground/70">
                {common.footer.name} &middot; {common.footer.role}
              </p>
              <p className="font-light text-foreground/50">
                {common.footer.tagline}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4 text-foreground/30 text-xs">
                <span>&copy; {common.footer.copyright}</span>
                <span>&middot;</span>
                <span>{common.footer.builtWith}</span>
                <span>&middot;</span>
                <span>{common.footer.thanks}</span>
              </div>
            </div>
          </footer>
        </div>
      </ProjectContentWrapper>
    );
  }

  // Seven Springs content
  if (slug === "seven-springs") {
    const ssT = t as any;
    return (
      <ProjectContentWrapper slug={slug}>
        <div className="relative min-h-screen bg-background font-sans text-foreground">
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
            <span className="sr-only">{common.backToProjects}</span>
          </Link>

          {/* Hero Section */}
          <section className="px-6 pt-32 pb-16 sm:px-12 lg:px-24 lg:pt-40">
            <div className="mx-auto w-full max-w-6xl">
              {/* Tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {ssT.tags?.map((tag: string) => (
                  <span
                    className="rounded-full border border-foreground/15 px-3 py-1 font-light text-[14px]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-6 font-display text-[48px] text-foreground leading-tight lg:text-[64px]">
                {ssT.hero?.title}
              </h1>

              {/* Subtitle */}
              <p className="font-light text-[18px] text-foreground/80 lg:text-[20px]">
                {ssT.hero?.subtitle}
              </p>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl space-y-16">
              {/* The Challenge */}
              <div>
                <h3 className="mb-4 font-medium text-[14px] text-foreground/60 tracking-wide">
                  {ssT.challenge?.heading}
                </h3>
                <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[24px]">
                  {ssT.challenge?.text}
                </p>
              </div>

              {/* Role/Outcome Layout */}
              <div className="flex flex-wrap gap-6">
                {/* My Role - Left aligned, 380px width */}
                <div className="w-full rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg sm:w-[380px]">
                  <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                    {ssT.myRole?.heading}
                  </h3>
                  <p className="font-light text-[16px] text-foreground leading-relaxed">
                    {ssT.myRole?.text}
                  </p>
                </div>

                {/* The Outcome - Takes remaining space */}
                <div className="flex-1 rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                  <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                    {ssT.outcome?.heading}
                  </h3>
                  <p className="font-light text-[16px] text-foreground leading-relaxed">
                    {ssT.outcome?.text}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="space-y-32 px-6 py-16 sm:px-12 lg:px-24">
            {/* Section 1 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {ssT.section1?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {ssT.section1?.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {ssT.section1?.frictionTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {ssT.section1?.frictionText}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {ssT.section1?.pivotTitle}
                  </h3>
                  <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    {ssT.section1?.pivotIntro}
                  </p>

                  <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {ssT.section1?.ruleLabel}
                        </strong>{" "}
                        {ssT.section1?.ruleText}
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {ssT.section1?.resultLabel}
                        </strong>{" "}
                        {ssT.section1?.resultText}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {ssT.section2?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {ssT.section2?.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {ssT.section2?.conflictTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {ssT.section2?.conflictText}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {ssT.section2?.standTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {ssT.section2?.standText}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {ssT.section3?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {ssT.section3?.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {ssT.section3?.visualizingTitle}
                  </h3>
                  <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    {ssT.section3?.visualizingIntro}
                  </p>

                  <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">{ssT.section3?.point1}</div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">{ssT.section3?.point2}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {ssT.section4?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {ssT.section4?.title}
              </h2>

              <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[22px]">
                {ssT.section4?.outcomeText}
              </p>
            </section>
          </div>

          {/* Navigation Footer */}
          <section className="border-separator border-t px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl">
              <h3 className="mb-8 font-display text-[24px] text-foreground">
                {common.moreProjects}
              </h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {otherProjects.map((proj) => (
                  <Link
                    className="group rounded-xl bg-ui-element-bg p-6 shadow-black/20 shadow-lg transition-shadow hover:shadow-black/30 hover:shadow-xl"
                    href={`/projects/${proj.slug}`}
                    key={proj.slug}
                  >
                    <h4 className="mb-2 font-display text-[20px] text-foreground transition-colors group-hover:text-accent-text">
                      {proj.title}
                    </h4>
                    <div className="flex items-center gap-2 font-medium text-[14px] text-foreground/60 transition-colors group-hover:text-foreground/80">
                      <span>{common.viewCaseStudy}</span>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  className="inline-flex items-center gap-2 font-medium text-foreground/60 transition-colors hover:text-foreground"
                  href="/#projects"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  {common.viewAllProjects}
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-separator border-t px-6 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-4xl space-y-2 text-center text-sm">
              <p className="font-light text-foreground/70">
                {common.footer.name} &middot; {common.footer.role}
              </p>
              <p className="font-light text-foreground/50">
                {common.footer.tagline}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4 text-foreground/30 text-xs">
                <span>&copy; {common.footer.copyright}</span>
                <span>&middot;</span>
                <span>{common.footer.builtWith}</span>
                <span>&middot;</span>
                <span>{common.footer.thanks}</span>
              </div>
            </div>
          </footer>
        </div>
      </ProjectContentWrapper>
    );
  }

  // Longevity Passport content
  if (slug === "longevity-passport") {
    const lpT = t as any;
    return (
      <ProjectContentWrapper slug={slug}>
        <div className="relative min-h-screen bg-background font-sans text-foreground">
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
            <span className="sr-only">{common.backToProjects}</span>
          </Link>

          {/* Hero Section */}
          <section className="px-6 pt-32 pb-16 sm:px-12 lg:px-24 lg:pt-40">
            <div className="mx-auto w-full max-w-6xl">
              {/* Tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {lpT.tags?.map((tag: string) => (
                  <span
                    className="rounded-full border border-foreground/15 px-3 py-1 font-light text-[14px]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-6 font-display text-[48px] text-foreground leading-tight lg:text-[64px]">
                {lpT.hero?.title}
              </h1>

              {/* Subtitle */}
              <p className="font-light text-[18px] text-foreground/80 lg:text-[20px]">
                {lpT.hero?.subtitle}
              </p>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl space-y-16">
              {/* The Challenge */}
              <div>
                <h3 className="mb-4 font-medium text-[14px] text-foreground/60 tracking-wide">
                  {lpT.challenge?.heading}
                </h3>
                <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[24px]">
                  {lpT.challenge?.text}
                </p>
              </div>

              {/* Two Columns: Role/Outcome Stack + Photo */}
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Left: My Role and Outcome Stack */}
                <div className="flex flex-col gap-6">
                  {/* My Role */}
                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {lpT.myRole?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {lpT.myRole?.text}
                    </p>
                  </div>

                  {/* The Outcome */}
                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {lpT.outcome?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {lpT.outcome?.text}
                    </p>
                  </div>
                </div>

                {/* Right: Photo Placeholder */}
                <MediaCard
                  alt="Longevity Passport platform overview"
                  className="h-[220px] rounded-lg bg-ui-element-bg shadow-black/20 shadow-lg sm:h-[380px] lg:h-[472px]"
                  hoverImageSrc="/assets/media/longevity-passport/Longevity-passport-platform-overview-on-hover.png"
                  imageSrc="/assets/media/longevity-passport/Longevity-passport-platform-overview.png"
                />
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl">
              <h3 className="mb-4 font-medium text-[14px] text-foreground/60 tracking-wide">
                {lpT.impact?.heading}
              </h3>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.impact?.subheading}
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                  <h4 className="mb-3 font-display text-[18px] text-foreground">
                    {lpT.impact?.item1?.title}
                  </h4>
                  <p className="font-light text-[16px] text-foreground/80 leading-relaxed">
                    {lpT.impact?.item1?.description}
                  </p>
                </div>
                <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                  <h4 className="mb-3 font-display text-[18px] text-foreground">
                    {lpT.impact?.item2?.title}
                  </h4>
                  <p className="font-light text-[16px] text-foreground/80 leading-relaxed">
                    {lpT.impact?.item2?.description}
                  </p>
                </div>
                <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                  <h4 className="mb-3 font-display text-[18px] text-foreground">
                    {lpT.impact?.item3?.title}
                  </h4>
                  <p className="font-light text-[16px] text-foreground/80 leading-relaxed">
                    {lpT.impact?.item3?.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="space-y-32 px-6 py-16 sm:px-12 lg:px-24">
            {/* Section 1 */}
            <section className="mx-auto w-full max-w-6xl">
              {/* Impact Video */}
              <video
                autoPlay
                className="mb-8 w-full rounded-lg shadow-black/20 shadow-lg"
                loop
                muted
                playsInline
                src="/assets/media/longevity-passport/the-impact.mp4"
              />

              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {lpT.section1?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.section1?.title}
              </h2>

              <div className="space-y-8">
                <p className="font-light text-[20px] text-foreground leading-relaxed lg:text-[22px]">
                  {lpT.section1?.intro}
                </p>

                <div className="space-y-6">
                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {lpT.section1?.userProblem?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {lpT.section1?.userProblem?.text}
                    </p>
                  </div>

                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {lpT.section1?.businessProblem?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {lpT.section1?.businessProblem?.text}
                    </p>
                  </div>

                  <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                    <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                      {lpT.section1?.constraint?.heading}
                    </h3>
                    <p className="font-light text-[16px] text-foreground leading-relaxed">
                      {lpT.section1?.constraint?.text}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {lpT.section2?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.section2?.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {lpT.section2?.frictionTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {lpT.section2?.frictionText}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {lpT.section2?.solutionTitle}
                  </h3>
                  <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    {lpT.section2?.solutionIntro}
                  </p>

                  <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {lpT.section2?.step1?.title}
                        </strong>{" "}
                        {lpT.section2?.step1?.text}
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
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
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {lpT.section2?.step2?.title}
                        </strong>{" "}
                        {lpT.section2?.step2?.text}
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                        <svg
                          className="h-6 w-6 text-secondary-text"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <strong className="font-medium text-foreground">
                          {lpT.section2?.step3?.title}
                        </strong>{" "}
                        {lpT.section2?.step3?.text}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {lpT.section3?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.section3?.title}
              </h2>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Text Content */}
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {lpT.section3?.challengeTitle}
                    </h3>
                    <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                      {lpT.section3?.challengeText}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {lpT.section3?.designTitle}
                    </h3>
                    <p className="mb-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                      {lpT.section3?.designIntro}
                    </p>

                    <ul className="space-y-4 font-light text-[18px] text-foreground/80 leading-relaxed">
                      <li className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                          <svg
                            className="h-6 w-6 text-secondary-text"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <strong className="font-medium text-foreground">
                            {lpT.section3?.chunking?.title}
                          </strong>{" "}
                          {lpT.section3?.chunking?.text}
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                          <svg
                            className="h-6 w-6 text-secondary-text"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <strong className="font-medium text-foreground">
                            {lpT.section3?.cognitiveLoad?.title}
                          </strong>{" "}
                          {lpT.section3?.cognitiveLoad?.text}
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[0.5px] border-ui-element-border bg-ui-element-bg">
                          <svg
                            className="h-6 w-6 text-secondary-text"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <strong className="font-medium text-foreground">
                            {lpT.section3?.scalability?.title}
                          </strong>{" "}
                          {lpT.section3?.scalability?.text}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right: Photo Placeholder */}
                <div className="flex items-center justify-center">
                  <MediaCard
                    alt="Longevity Passport Section 3 design"
                    className="min-h-[280px] w-full rounded-lg bg-ui-element-bg shadow-black/20 shadow-lg lg:h-full lg:min-h-0 lg:w-[calc(100%-100px)]"
                    imageSrc="/assets/media/main/Longevity-passport-03.png"
                  />
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {lpT.section4?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.section4?.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {lpT.section4?.realityTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {lpT.section4?.realityText}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-display text-[20px] text-foreground">
                    {lpT.section4?.systemTitle}
                  </h3>
                  <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                    {lpT.section4?.systemText}
                  </p>
                </div>

                <div className="rounded-lg bg-ui-element-bg p-6 shadow-black/20 shadow-lg">
                  <h3 className="mb-3 font-medium text-[14px] text-foreground/60">
                    {lpT.section4?.impactLabel}
                  </h3>
                  <p className="font-light text-[16px] text-foreground leading-relaxed">
                    {lpT.section4?.impactText}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-[28px] text-accent-text">
                      {lpT.section4?.reduction}
                    </span>
                    <span className="font-light text-[18px] text-foreground/80">
                      {lpT.section4?.reductionLabel}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-[18px] text-foreground/40">
                  {lpT.section5?.number}
                </span>
                <hr className="h-px flex-1 border-0 bg-accent-text/30" />
              </div>
              <h2 className="mb-12 font-display text-[32px] text-foreground lg:text-[42px]">
                {lpT.section5?.title}
              </h2>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Photo */}
                <div className="flex items-center justify-start">
                  <MediaCard
                    alt="Longevity Passport Section 5 design"
                    className="min-h-[280px] w-full rounded-lg bg-ui-element-bg shadow-black/20 shadow-lg lg:h-full lg:min-h-0 lg:w-[calc(100%-100px)]"
                    imageSrc="/assets/media/main/Longevity-passport-05.png"
                  />
                </div>

                {/* Right: Text Content */}
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {lpT.section5?.learnedTitle}
                    </h3>
                    <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                      {lpT.section5?.learnedText}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-display text-[20px] text-foreground">
                      {lpT.section5?.iterationTitle}
                    </h3>
                    <p className="font-light text-[18px] text-foreground/80 leading-relaxed">
                      {lpT.section5?.iterationText}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Navigation Footer */}
          <section className="border-separator border-t px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto w-full max-w-6xl">
              <h3 className="mb-8 font-display text-[24px] text-foreground">
                {common.moreProjects}
              </h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {otherProjects.map((proj) => (
                  <Link
                    className="group rounded-xl bg-ui-element-bg p-6 shadow-black/20 shadow-lg transition-shadow hover:shadow-black/30 hover:shadow-xl"
                    href={`/projects/${proj.slug}`}
                    key={proj.slug}
                  >
                    <h4 className="mb-2 font-display text-[20px] text-foreground transition-colors group-hover:text-accent-text">
                      {proj.title}
                    </h4>
                    <div className="flex items-center gap-2 font-medium text-[14px] text-foreground/60 transition-colors group-hover:text-foreground/80">
                      <span>{common.viewCaseStudy}</span>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  className="inline-flex items-center gap-2 font-medium text-foreground/60 transition-colors hover:text-foreground"
                  href="/#projects"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  {common.viewAllProjects}
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-separator border-t px-6 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-4xl space-y-2 text-center text-sm">
              <p className="font-light text-foreground/70">
                {common.footer.name} &middot; {common.footer.role}
              </p>
              <p className="font-light text-foreground/50">
                {common.footer.tagline}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4 text-foreground/30 text-xs">
                <span>&copy; {common.footer.copyright}</span>
                <span>&middot;</span>
                <span>{common.footer.builtWith}</span>
                <span>&middot;</span>
                <span>{common.footer.thanks}</span>
              </div>
            </div>
          </footer>
        </div>
      </ProjectContentWrapper>
    );
  }

  // Fallback - should never reach here due to validation
  return null;
}
