// ============================================
// WelcomeScreen.jsx — Page 1: The landing page
// ============================================
// Shows a "hacker terminal" style loading animation,
// then reveals the welcome message with a typing effect.
// This is the first thing Oveka sees.

import { useState, useEffect } from "react";
import { FRIEND_NAME } from "../config";
import "./WelcomeScreen.css";

export default function WelcomeScreen({ onNext }) {
  // Track which phase of the welcome we're in
  const [phase, setPhase] = useState("loading"); // "loading" → "greeting" → "ready"
  const [loadPercent, setLoadPercent] = useState(0);
  const [typedText, setTypedText] = useState("");

  // The greeting message that gets "typed" out
  const greetingText = `Hey ${FRIEND_NAME} 👋\nI made something small for your birthday.`;

  // Phase 1: Loading bar animation (0% → 100%)
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Move to greeting phase after a brief pause
          setTimeout(() => setPhase("greeting"), 500);
          return 100;
        }
        // Increment by random amount for realistic feel
        return Math.min(prev + Math.random() * 3 + 1, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: Typing animation for the greeting
  useEffect(() => {
    if (phase !== "greeting") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < greetingText.length) {
        setTypedText(greetingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        // Show the button after typing finishes
        setTimeout(() => setPhase("ready"), 400);
      }
    }, 40); // 40ms per character — fast but readable

    return () => clearInterval(interval);
  }, [phase, greetingText]);

  return (
    <div className="screen welcome-screen">
      {/* Background gradient orbs */}
      <div className="welcome-orb welcome-orb-1" />
      <div className="welcome-orb welcome-orb-2" />

      <div className="welcome-content">
        {/* Terminal-style header — always visible */}
        <div className="terminal-badge animate-fadeInUp">
          <span className="terminal-icon">🔐</span>
          <span className="text-mono">SECRET BIRTHDAY PROJECT</span>
        </div>

        {/* Loading phase */}
        {phase === "loading" && (
          <div className="loading-section animate-fadeIn">
            <p className="text-mono loading-label">
              Birthday is ready...
            </p>
            {/* Progress bar */}
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <p className="text-mono loading-percent">
              {Math.floor(loadPercent)}%
            </p>
          </div>
        )}

        {/* Greeting phase — typing effect */}
        {(phase === "greeting" || phase === "ready") && (
          <div className="greeting-section animate-fadeIn">
            <div className="greeting-text">
              {typedText.split("\n").map((line, i) => (
                <p key={i} className={i === 0 ? "heading-lg" : "text-muted greeting-sub"}>
                  {line}
                </p>
              ))}
              {/* Blinking cursor while typing */}
              {phase === "greeting" && <span className="typing-cursor">|</span>}
            </div>
          </div>
        )}

        {/* Start button — appears after typing finishes */}
        {phase === "ready" && (
          <button
            className="btn-primary start-btn animate-scaleIn"
            onClick={onNext}
          >
            START THE MISSION 🚀
          </button>
        )}
      </div>
    </div>
  );
}
