// ============================================
// CakeCuttingScreen.jsx — Birthday Cake Celebration
// ============================================
// An interactive cake cutting experience before the final surprise.
// Oveka can:
// 1. Make a wish and blow out the candles (interactive flames + smoke)
// 2. Cut the birthday cake with an animated knife
// 3. Reveal the cake interior, get a slice on a plate
// 4. Enjoy confetti and unlock the final birthday surprise!

import { useState, useRef } from "react";
import Confetti from "./Confetti";
import "./CakeCuttingScreen.css";

// Web Audio sound synthesizer for realistic interactive feedback
function playSound(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (type === "blow") {
      // White noise puff + soft lowpass filter sweep for breath/blowout
      const bufferSize = ctx.sampleRate * 0.7;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } else if (type === "slice") {
      // Crispy slice swoosh & metallic chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "fanfare") {
      // Cheerful birthday arpeggio chord (C - E - G - C - E)
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.75);
      });
    }
  } catch {
    // Audio context not allowed or unsupported — fail gracefully
  }
}

export default function CakeCuttingScreen({ onNext }) {
  // Steps:
  // "lit" -> candles are burning, prompt: make a wish & blow candles
  // "blown" -> candles blown out, knife ready, prompt: cut the cake
  // "cutting" -> knife animation slicing through the cake
  // "cut" -> cake sliced, plate with slice appears, confetti explodes
  const [stage, setStage] = useState("lit");
  const [showConfetti, setShowConfetti] = useState(false);
  const [sliceProgress, setSliceProgress] = useState(0); // For knife slide
  const cakeRef = useRef(null);

  // Step 1: Blow out candles
  const handleBlowCandles = () => {
    if (stage !== "lit") return;
    playSound("blow");
    setStage("blown");
  };

  // Step 2: Cut the cake
  const handleCutCake = () => {
    if (stage !== "blown") return;
    setStage("cutting");
    playSound("slice");

    // Animate knife down through the cake
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setSliceProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStage("cut");
        setShowConfetti(true);
        playSound("fanfare");
      }
    }, 60);
  };

  return (
    <div className="screen cake-screen">
      {/* Confetti blast when cake is cut */}
      {showConfetti && <Confetti count={110} />}

      {/* Ambient background glows */}
      <div className="cake-ambient-glow" />
      <div className="cake-ambient-glow-2" />

      {/* Floating party decorations */}
      <div className="cake-decorations">
        <span className="party-balloon b1">🎈</span>
        <span className="party-balloon b2">🎈</span>
        <span className="party-sparkle s1">✨</span>
        <span className="party-sparkle s2">⭐</span>
        <span className="party-sparkle s3">💖</span>
        <span className="party-sparkle s4">✨</span>
      </div>

      <div className="cake-content-container animate-fadeInUp">
        {/* Header Badge & Title */}
        <div className="cake-header">
          <div className="cake-badge">
            <span className="badge-dot" />
            <span>Special Celebration 🎂</span>
          </div>

          <h1 className="cake-main-title">
            {stage === "lit" && "Make a Wish, Oveka! ✨"}
            {stage === "blown" && "Now Cut the Birthday Cake! 🔪"}
            {(stage === "cutting" || stage === "cut") && "🎉 Happy Birthday Oveka! 🎉"}
          </h1>

          <p className="cake-sub-text">
            {stage === "lit" && "Close your eyes, make a secret wish, and blow out the candles!"}
            {stage === "blown" && "Your wish is locked in! 💫 Now slice your birthday cake!"}
            {stage === "cutting" && "Cutting the cake with love and blessings..."}
            {stage === "cut" && "The first slice is served! May your year be as sweet as this cake! 🍰"}
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="cake-steps-bar">
          <div className={`step-item ${stage === "lit" ? "active" : "done"}`}>
            <span className="step-circle">{stage === "lit" ? "1" : "✓"}</span>
            <span className="step-label">Make a Wish</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${stage === "blown" || stage === "cutting" ? "active" : stage === "cut" ? "done" : ""}`}>
            <span className="step-circle">{stage === "cut" ? "✓" : "2"}</span>
            <span className="step-label">Cut the Cake</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${stage === "cut" ? "active" : ""}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Get Surprise</span>
          </div>
        </div>

        {/* The Interactive Birthday Cake Area */}
        <div className="cake-stage-wrapper" ref={cakeRef}>
          {/* Animated Knife (visible during blown/cutting stages) */}
          {(stage === "blown" || stage === "cutting") && (
            <div
              className={`cutting-knife ${stage === "cutting" ? "slicing-down" : "knife-ready"}`}
              style={{
                top: stage === "cutting" ? `${40 + sliceProgress * 1.5}px` : "30px",
              }}
              onClick={handleCutCake}
              title="Click to cut the cake!"
            >
              <div className="knife-blade">
                <div className="blade-shine" />
              </div>
              <div className="knife-handle" />
              <div className="knife-tooltip">Click to cut! 🔪</div>
            </div>
          )}

          {/* SVG Artwork for the Birthday Cake */}
          <div
            className={`cake-svg-container ${stage === "cut" ? "cake-is-cut" : ""}`}
            onClick={stage === "lit" ? handleBlowCandles : stage === "blown" ? handleCutCake : undefined}
          >
            <svg
              viewBox="0 0 500 400"
              className="cake-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow filter for candles and text */}
                <filter id="cakeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="icingShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(190, 24, 93, 0.7)" />
                </filter>
                <filter id="plateShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0, 0, 0, 0.5)" />
                </filter>

                {/* Cake Stand Gradient */}
                <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="25%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="75%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Bottom Tier Base Gradient (Chocolate / Velvet) */}
                <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a044e" />
                  <stop offset="30%" stopColor="#701a75" />
                  <stop offset="50%" stopColor="#86198f" />
                  <stop offset="80%" stopColor="#701a75" />
                  <stop offset="100%" stopColor="#4a044e" />
                </linearGradient>

                {/* Top Tier Base Gradient (Strawberry Cream) */}
                <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9d174d" />
                  <stop offset="25%" stopColor="#be185d" />
                  <stop offset="50%" stopColor="#db2777" />
                  <stop offset="75%" stopColor="#be185d" />
                  <stop offset="100%" stopColor="#831843" />
                </linearGradient>

                {/* Frosting Glaze Drip Gradient */}
                <linearGradient id="dripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffe4e6" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fecdd3" />
                </linearGradient>

                {/* Edible Sugar Plaque Gradient */}
                <linearGradient id="plaqueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#fff1f2" />
                  <stop offset="100%" stopColor="#fce7f3" />
                </linearGradient>

                {/* Golden Candle Flame Gradient */}
                <radialGradient id="flameGrad" cx="50%" cy="65%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </radialGradient>

                {/* Candle Stripe Pattern */}
                <pattern id="candleStripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="4" height="8" fill="#f43f5e" />
                  <rect x="4" width="4" height="8" fill="#fef08a" />
                </pattern>
                <pattern id="candleStripe2" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="4" height="8" fill="#3b82f6" />
                  <rect x="4" width="4" height="8" fill="#ffffff" />
                </pattern>
                <pattern id="candleStripe3" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="4" height="8" fill="#10b981" />
                  <rect x="4" width="4" height="8" fill="#fef08a" />
                </pattern>
              </defs>

              {/* 1. Cake Stand & Shadow */}
              <g id="cake-stand" filter="url(#plateShadow)">
                {/* Stand Base */}
                <ellipse cx="250" cy="385" rx="130" ry="12" fill="url(#standGrad)" />
                {/* Stand Stem */}
                <path d="M 235 340 L 230 380 Q 250 385 270 380 L 265 340 Z" fill="url(#standGrad)" />
                {/* Main Plate */}
                <ellipse cx="250" cy="342" rx="210" ry="24" fill="url(#standGrad)" />
                <ellipse cx="250" cy="340" rx="198" ry="20" fill="#1e293b" opacity="0.25" />
              </g>

              {/* 2. Bottom Tier */}
              <g id="bottom-tier">
                {/* Cylinder Side */}
                <path
                  d="M 85 250 A 165 28 0 0 0 415 250 L 415 328 A 165 28 0 0 1 85 328 Z"
                  fill="url(#tierBottomGrad)"
                />
                {/* Bottom Frosting Border (Cream Pearls) */}
                <g fill="#fdf2f8">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const angle = (i / 14) * Math.PI;
                    const cx = 250 - Math.cos(angle) * 160;
                    const cy = 328 + Math.sin(angle) * 20;
                    return <circle key={i} cx={cx} cy={cy} r="7" fill="#ffffff" opacity="0.9" />;
                  })}
                </g>
                {/* Cylinder Top Surface */}
                <ellipse cx="250" cy="250" rx="165" ry="28" fill="#a21caf" />
                {/* White Cream Trim on top rim */}
                <path
                  d="M 85 250 A 165 28 0 0 0 415 250"
                  fill="none"
                  stroke="#fce7f3"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>

              {/* 3. Top Tier */}
              <g id="top-tier">
                {/* Cylinder Side */}
                <path
                  d="M 125 150 A 125 22 0 0 0 375 150 L 375 225 A 125 22 0 0 1 125 225 Z"
                  fill="url(#tierTopGrad)"
                />
                {/* Cylinder Top Surface */}
                <ellipse cx="250" cy="150" rx="125" ry="22" fill="#be185d" />

                {/* Frosting Drip Overlay (Glaze flowing down) */}
                <path
                  d="M 125 150 
                     Q 140 178 150 162
                     Q 165 190 175 160
                     Q 190 185 205 158
                     Q 225 195 240 162
                     Q 260 192 275 158
                     Q 295 186 310 160
                     Q 330 190 345 162
                     Q 360 175 375 150
                     A 125 22 0 0 1 125 150 Z"
                  fill="url(#dripGrad)"
                />

                {/* Fresh Strawberries on Top */}
                <g id="strawberries">
                  <path d="M 160 142 Q 170 125 180 142 Q 170 155 160 142 Z" fill="#e11d48" />
                  <path d="M 168 128 L 172 125 L 170 131 Z" fill="#22c55e" />

                  <path d="M 320 142 Q 330 125 340 142 Q 330 155 320 142 Z" fill="#e11d48" />
                  <path d="M 328 128 L 332 125 L 330 131 Z" fill="#22c55e" />

                  <circle cx="215" cy="148" r="5" fill="#fbcfe8" />
                  <circle cx="285" cy="148" r="5" fill="#fbcfe8" />
                </g>

                {/* Colorful Sprinkles on the Cake Body */}
                <g className="cake-sprinkles">
                  <circle cx="150" cy="205" r="3" fill="#facc15" />
                  <circle cx="170" cy="218" r="2.5" fill="#38bdf8" />
                  <circle cx="210" cy="222" r="3" fill="#4ade80" />
                  <circle cx="290" cy="222" r="3" fill="#fb7185" />
                  <circle cx="330" cy="216" r="2.5" fill="#facc15" />
                  <circle cx="355" cy="205" r="3" fill="#c084fc" />
                  <circle cx="105" cy="290" r="3" fill="#f43f5e" />
                  <circle cx="130" cy="310" r="3" fill="#38bdf8" />
                  <circle cx="370" cy="310" r="3" fill="#facc15" />
                  <circle cx="395" cy="290" r="3" fill="#4ade80" />
                </g>

                {/* ⭐ INSCRIPTION ON THE CAKE: "Happy Birthday Oveka" ⭐ */}
                <g className="cake-inscription-group">
                  {/* Decorative edible sugar plaque */}
                  <rect
                    x="130"
                    y="172"
                    width="240"
                    height="40"
                    rx="20"
                    fill="url(#plaqueGrad)"
                    stroke="#fbcfe8"
                    strokeWidth="2"
                    filter="url(#plateShadow)"
                  />
                  {/* Plaque inner border pearls */}
                  <rect
                    x="134"
                    y="176"
                    width="232"
                    height="32"
                    rx="16"
                    fill="none"
                    stroke="#f472b6"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />

                  {/* Main Piped Frosting Text */}
                  <text
                    x="250"
                    y="198"
                    textAnchor="middle"
                    className="cake-icing-text"
                  >
                    Happy Birthday Oveka
                  </text>

                  {/* Little edible hearts next to the text */}
                  <text x="146" y="198" fill="#e11d48" fontSize="13">💖</text>
                  <text x="342" y="198" fill="#e11d48" fontSize="13">💖</text>
                </g>
              </g>

              {/* 4. Slice Cut Overlay (Appears when sliced or cutting) */}
              {(stage === "cutting" || stage === "cut") && (
                <g className={`cake-slice-wedge ${stage === "cut" ? "slice-moved" : ""}`}>
                  {/* Cut Line Glow */}
                  <line
                    x1="250"
                    y1="140"
                    x2="250"
                    y2="330"
                    stroke="#fde047"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    className="cut-laser-line"
                  />
                  <line
                    x1="250"
                    y1="140"
                    x2="295"
                    y2="335"
                    stroke="#fde047"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    className="cut-laser-line"
                  />
                </g>
              )}

              {/* 5. Birthday Candles */}
              <g id="candles">
                {/* Left Candle */}
                <g className="candle-group">
                  <rect x="192" y="95" width="10" height="42" rx="3" fill="url(#candleStripe)" />
                  <line x1="197" y1="95" x2="197" y2="88" stroke="#1e293b" strokeWidth="2" />
                  {stage === "lit" && (
                    <g className="flame-group flame-1" filter="url(#cakeGlow)">
                      <path d="M 197 70 Q 204 80 197 88 Q 190 80 197 70 Z" fill="url(#flameGrad)" />
                      <circle cx="197" cy="82" r="8" fill="#ffedd5" opacity="0.35" />
                    </g>
                  )}
                  {stage !== "lit" && (
                    <g className="smoke-puff smoke-1">
                      <circle cx="197" cy="80" r="4" fill="#cbd5e1" opacity="0.5" />
                      <circle cx="195" cy="72" r="6" fill="#cbd5e1" opacity="0.3" />
                      <circle cx="199" cy="62" r="7" fill="#cbd5e1" opacity="0.15" />
                    </g>
                  )}
                </g>

                {/* Center Candle (Tallest) */}
                <g className="candle-group">
                  <rect x="245" y="85" width="10" height="50" rx="3" fill="url(#candleStripe2)" />
                  <line x1="250" y1="85" x2="250" y2="78" stroke="#1e293b" strokeWidth="2" />
                  {stage === "lit" && (
                    <g className="flame-group flame-2" filter="url(#cakeGlow)">
                      <path d="M 250 58 Q 258 70 250 78 Q 242 70 250 58 Z" fill="url(#flameGrad)" />
                      <circle cx="250" cy="72" r="10" fill="#ffedd5" opacity="0.4" />
                    </g>
                  )}
                  {stage !== "lit" && (
                    <g className="smoke-puff smoke-2">
                      <circle cx="250" cy="70" r="5" fill="#cbd5e1" opacity="0.5" />
                      <circle cx="248" cy="60" r="7" fill="#cbd5e1" opacity="0.3" />
                      <circle cx="253" cy="48" r="8" fill="#cbd5e1" opacity="0.15" />
                    </g>
                  )}
                </g>

                {/* Right Candle */}
                <g className="candle-group">
                  <rect x="298" y="95" width="10" height="42" rx="3" fill="url(#candleStripe3)" />
                  <line x1="303" y1="95" x2="303" y2="88" stroke="#1e293b" strokeWidth="2" />
                  {stage === "lit" && (
                    <g className="flame-group flame-3" filter="url(#cakeGlow)">
                      <path d="M 303 70 Q 310 80 303 88 Q 296 80 303 70 Z" fill="url(#flameGrad)" />
                      <circle cx="303" cy="82" r="8" fill="#ffedd5" opacity="0.35" />
                    </g>
                  )}
                  {stage !== "lit" && (
                    <g className="smoke-puff smoke-3">
                      <circle cx="303" cy="80" r="4" fill="#cbd5e1" opacity="0.5" />
                      <circle cx="305" cy="72" r="6" fill="#cbd5e1" opacity="0.3" />
                      <circle cx="301" cy="62" r="7" fill="#cbd5e1" opacity="0.15" />
                    </g>
                  )}
                </g>
              </g>
            </svg>
          </div>

          {/* Dessert Plate with Served Slice (Pops in when cake is cut) */}
          {stage === "cut" && (
            <div className="served-slice-card animate-scaleIn">
              <div className="slice-plate">
                <span className="slice-emoji">🍰</span>
                <div className="slice-sparkles">✨</div>
              </div>
              <div className="slice-info">
                <div className="slice-title">Here is your slice, Oveka! 💖</div>
                <div className="slice-text">Extra sweet, made with love!</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Section */}
        <div className="cake-actions-section">
          {stage === "lit" && (
            <button className="btn-primary blow-btn animate-pulse" onClick={handleBlowCandles}>
              <span className="btn-icon">🌬️</span>
              <span>Make a Wish & Blow Candles</span>
            </button>
          )}

          {stage === "blown" && (
            <button className="btn-primary cut-btn animate-bounce" onClick={handleCutCake}>
              <span className="btn-icon">🔪</span>
              <span>Cut the Cake!</span>
            </button>
          )}

          {stage === "cutting" && (
            <button className="btn-primary cut-btn" disabled>
              <span className="btn-icon">✨</span>
              <span>Slicing the Cake...</span>
            </button>
          )}

          {stage === "cut" && (
            <div className="surprise-ready-container animate-fadeInUp">
              <div className="celebration-cheer">
                🎉 Cake cut successfully! Your grand surprise is ready! 🎁
              </div>
              <button className="btn-primary open-surprise-btn" onClick={onNext}>
                <span>OPEN YOUR SURPRISE 🎁</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
