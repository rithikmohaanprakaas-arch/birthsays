// ============================================
// MemoryGallery.jsx — Immersive Photo Memory Reel
// ============================================
// A cinematic, full-screen photo gallery with floating
// polaroid cards, parallax effects, and sweet captions.
// Each photo fades in as the user scrolls/clicks through.

import { useState, useEffect } from "react";
import "./MemoryGallery.css";

const baseUrl = import.meta.env.BASE_URL || "/";
const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

const MEMORIES = [
  {
    photo: `${cleanBase}photo6.png`,
    caption: "The little queen 👑",
    subtitle: "Where it all began... look at you! 🥹",
    tag: "Childhood ✨",
  },
  {
    photo: `${cleanBase}photo2.png`,
    caption: "That gorgeous smile 💫",
    subtitle: "The one that lights up every room you walk into",
    tag: "Stunning 🌟",
  },
  {
    photo: `${cleanBase}photo3.png`,
    caption: "Vibes on point 🔥",
    subtitle: "Always slaying, always shining, always YOU",
    tag: "Queen Mode 👑",
  },
  {
    photo: `${cleanBase}photo4.png`,
    caption: "Golden hour glow ☀️",
    subtitle: "Even the light can't help but follow you",
    tag: "Aesthetic 🌅",
  },
  {
    photo: `${cleanBase}photo5.png`,
    caption: "Mirror, mirror... 🪞",
    subtitle: "...who's the most beautiful of them all? Obviously you.",
    tag: "Prettiest 💕",
  },
  {
    photo: `${cleanBase}photo1.png`,
    caption: "Main character energy 🎬",
    subtitle: "Living life like the whole world's watching",
    tag: "Iconic 🖤",
  },
];

export default function MemoryGallery({ onNext }) {
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = intro state
  const [transitioning, setTransitioning] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [allSeen, setAllSeen] = useState(false);

  // Auto-start after intro
  const startGallery = () => {
    setShowIntro(false);
    setTimeout(() => setActiveIndex(0), 400);
  };

  // Navigate to next photo
  const goNext = () => {
    if (transitioning) return;
    if (activeIndex >= MEMORIES.length - 1) {
      setAllSeen(true);
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      setTransitioning(false);
    }, 500);
  };

  // Navigate to previous photo
  const goPrev = () => {
    if (transitioning || activeIndex <= 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => prev - 1);
      setTransitioning(false);
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const currentMemory = MEMORIES[activeIndex];

  return (
    <div className="screen memory-gallery-screen">
      {/* Background glow that changes color per photo */}
      <div
        className="gallery-bg-glow"
        style={{
          opacity: activeIndex >= 0 ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 30%, ${
            ["rgba(236,72,153,0.12)", "rgba(139,92,246,0.12)", "rgba(245,158,11,0.12)",
             "rgba(6,182,212,0.12)", "rgba(236,72,153,0.1)", "rgba(139,92,246,0.1)"][activeIndex] || "transparent"
          } 0%, transparent 70%)`,
        }}
      />

      {/* Floating sparkles */}
      <div className="gallery-sparkles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${0.5 + Math.random() * 0.8}rem`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* ---- Intro State ---- */}
      {showIntro && (
        <div className="gallery-intro animate-fadeInUp">
          <div className="intro-icon-row">
            <span className="intro-icon">📸</span>
            <span className="intro-icon" style={{ animationDelay: "0.2s" }}>💝</span>
            <span className="intro-icon" style={{ animationDelay: "0.4s" }}>✨</span>
          </div>
          <h1 className="heading-lg">Your Memory Reel</h1>
          <p className="text-muted intro-desc">
            A little collection of moments that make you, YOU.
            <br />
            Each one is special. Just like you. 💫
          </p>
          <button className="btn-primary gallery-start-btn" onClick={startGallery}>
            Open Memories 💌
          </button>
        </div>
      )}

      {/* ---- Photo Display ---- */}
      {!showIntro && activeIndex >= 0 && !allSeen && currentMemory && (
        <div className={`memory-showcase ${transitioning ? "fading-out" : "fading-in"}`}>
          {/* Photo counter */}
          <div className="photo-counter">
            <div className="counter-dots">
              {MEMORIES.map((_, i) => (
                <div
                  key={i}
                  className={`counter-dot ${i === activeIndex ? "active" : ""} ${i < activeIndex ? "seen" : ""}`}
                />
              ))}
            </div>
            <span className="counter-text">{activeIndex + 1} / {MEMORIES.length}</span>
          </div>

          {/* The polaroid card */}
          <div className="polaroid-card">
            <div className="polaroid-tag">{currentMemory.tag}</div>
            <div className="polaroid-photo-frame">
              <img
                src={currentMemory.photo}
                alt={currentMemory.caption}
                className="polaroid-photo"
              />
              <div className="photo-shine" />
            </div>
            <div className="polaroid-text">
              <h2 className="polaroid-caption">{currentMemory.caption}</h2>
              <p className="polaroid-subtitle">{currentMemory.subtitle}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="gallery-nav">
            <button
              className="nav-btn nav-prev"
              onClick={goPrev}
              disabled={activeIndex <= 0}
            >
              ← Back
            </button>
            <button className="nav-btn nav-next" onClick={goNext}>
              {activeIndex >= MEMORIES.length - 1 ? "Finish ✨" : "Next →"}
            </button>
          </div>

          <p className="nav-hint">Use arrow keys or click to navigate</p>
        </div>
      )}

      {/* ---- All Seen — Final Collage ---- */}
      {allSeen && (
        <div className="gallery-finale animate-fadeInUp">
          <div className="collage-grid">
            {MEMORIES.map((mem, i) => (
              <div
                key={i}
                className="collage-item"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <img src={mem.photo} alt={mem.caption} />
              </div>
            ))}
          </div>
          <div className="finale-text">
            <h2 className="heading-md">Every moment with you is a memory worth keeping 💝</h2>
            <p className="text-muted">
              From childhood to now, you've always been amazing.
            </p>
          </div>
          <button className="btn-primary" onClick={onNext}>
            CONTINUE →
          </button>
        </div>
      )}
    </div>
  );
}
