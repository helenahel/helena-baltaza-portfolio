"use client";

import { useEffect, useRef, useState } from "react";

interface MediaCardProps {
  imageSrc: string; // Path to static image
  videoSrc?: string; // Path to video (optional)
  hoverImageSrc?: string; // Path to hover image (optional, for image-to-image transitions)
  alt: string; // Accessibility description
  className?: string; // Optional additional styles
  priority?: boolean; // Preload for above-fold content
}

export function MediaCard({
  imageSrc,
  videoSrc,
  hoverImageSrc,
  alt,
  className = "",
  priority = false,
}: MediaCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverImageRef = useRef<HTMLImageElement>(null);
  const [isHoverMediaLoaded, setIsHoverMediaLoaded] = useState(false);
  const [showHoverMedia, setShowHoverMedia] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Determine transition type
  const isVideoTransition = !!videoSrc;
  const isImageTransition = !!hoverImageSrc;

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  // IntersectionObserver for lazy loading hover media
  useEffect(() => {
    if (isTouchDevice || (!isVideoTransition && !isImageTransition)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Load video
            if (
              isVideoTransition &&
              videoRef.current &&
              !videoRef.current.src
            ) {
              videoRef.current.src = videoSrc;
            }

            // Mark media as loaded for hover interactions
            setIsHoverMediaLoaded(true);
          }
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isTouchDevice, videoSrc, isVideoTransition]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (isTouchDevice || !isHoverMediaLoaded) {
      return;
    }

    setShowHoverMedia(true);

    // Play video if it's a video transition
    if (isVideoTransition && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) {
      return;
    }

    setShowHoverMedia(false);

    // Pause and reset video if it's a video transition
    if (isVideoTransition && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Hover handlers for media transitions, not keyboard navigation
    <div
      aria-label={alt}
      className={`relative overflow-hidden bg-background ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      role="img"
    >
      {/* Static Image */}
      {/* biome-ignore lint/performance/noImgElement: Raw img needed for smooth transitions */}
      {/* biome-ignore lint/correctness/useImageSize: Using CSS dimensions h-full w-full */}
      <img
        alt={alt}
        className={`h-full w-full object-cover ${isVideoTransition || isImageTransition ? `transition-opacity duration-700 ${showHoverMedia ? "opacity-0" : "opacity-100"}` : ""}`}
        loading={priority ? "eager" : "lazy"}
        src={imageSrc}
      />

      {/* Video (only on hover-capable devices with video transition) */}
      {!isTouchDevice && isVideoTransition && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showHoverMedia ? "opacity-100" : "opacity-0"}`}
          loop
          muted
          playsInline
          poster={imageSrc}
          ref={videoRef}
        />
      )}

      {/* Hover Image (only on hover-capable devices with image transition) */}
      {!isTouchDevice && isImageTransition && (
        <>
          {/* biome-ignore lint/performance/noImgElement: Raw img needed for smooth transitions */}
          {/* biome-ignore lint/correctness/useImageSize: Using CSS dimensions h-full w-full */}
          <img
            alt={`${alt} (hover state)`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              showHoverMedia ? "scale-105 opacity-100" : "scale-100 opacity-0"
            }`}
            loading={priority ? "eager" : "lazy"}
            ref={hoverImageRef}
            src={hoverImageSrc}
          />
        </>
      )}
    </div>
  );
}
