// ============================================
// FinalScreen.jsx — Page 5: Birthday Surprise!
// ============================================
// Shows a dramatic countdown (3...2...1...),
// then reveals the big birthday message with
// confetti and a final surprise button.

import { useState, useEffect } from "react";
import { FRIEND_NAME, FINAL_MESSAGE } from "../config";
import Confetti from "./Confetti";
import "./FinalScreen.css";

export default function FinalScreen() {
  // Phases: "countdown" → "reveal" → "surprise"
  const [phase, setPhase] = useState("countdown");
  const [countdownNum, setCountdownNum] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  // Countdown animation: 3 → 2 → 1 → reveal
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdownNum > 0) {
      const timer = setTimeout(() => {
        setCountdownNum((prev) => prev - 1);
      }, 800); // 800ms per number
      return () => clearTimeout(timer);
    } else {
      // Countdown finished — show the birthday reveal
      setTimeout(() => {
        setPhase("reveal");
        setShowConfetti(true);
      }, 400);
    }
  }, [phase, countdownNum]);

  // Handle the "OPEN SURPRISE" button click
  const handleSurprise = () => {
    setPhase("surprise");
    // Trigger another burst of confetti
    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 100);
  };

  return (
    <div className="screen final-screen">
      {/* Confetti overlay */}
      {showConfetti && <Confetti count={100} />}

      {/* Background effects */}
      <div className="final-glow-1" />
      <div className="final-glow-2" />

      <div className="final-content">
        {/* ---- Countdown Phase ---- */}
        {phase === "countdown" && (
          <div className="countdown-display" key={countdownNum}>
            <span className="countdown-number animate-scaleIn">
              {countdownNum > 0 ? countdownNum : "🎉"}
            </span>
          </div>
        )}

        {/* ---- Reveal Phase — the big moment ---- */}
        {phase === "reveal" && (
          <div className="reveal-section">
            <h1 className="birthday-title animate-scaleIn">
              🎉 HAPPY BIRTHDAY {FRIEND_NAME}! 🎉
            </h1>

            <div className="animate-fadeInUp" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <div className="mission-complete-badge">
                <span>Mission Completed</span>
                <span className="check-mark">✅</span>
              </div>
            </div>

            <p
              className="gift-text animate-fadeInUp"
              style={{ animationDelay: "0.8s", opacity: 0 }}
            >
              Your actual gift is waiting for you 🎁
            </p>

            <button
              className="btn-primary surprise-btn animate-fadeInUp"
              style={{ animationDelay: "1.2s", opacity: 0 }}
              onClick={handleSurprise}
            >
              OPEN SURPRISE 🎁
            </button>
          </div>
        )}

        {/* ---- Surprise Phase — final message ---- */}
        {phase === "surprise" && (
          <div className="surprise-section animate-scaleIn">
            <div className="surprise-emoji-burst">
              🎂🎉🥳🎊🎈
            </div>

            <div className="glass-card final-message-card">
              <h2 className="heading-md">From one friend to another ✨</h2>
              <p className="final-message-text">{FINAL_MESSAGE}</p>
              <div className="final-signature">
                <span className="text-mono text-muted">— your friend & birthday project developer 💻</span>
              </div>
            </div>

            <div className="final-footer animate-fadeInUp" style={{ animationDelay: "0.6s", opacity: 0 }}>
              <p className="text-muted footer-note">
                made with code, caffeine, and friendship ☕
              </p>
              <p className="footer-year text-mono">
                © {new Date().getFullYear()} Birthday.exe v1.0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
