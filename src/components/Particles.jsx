// ============================================
// Particles.jsx — Floating background particles
// ============================================
// Creates ambient floating dots to give the background
// a "living" feel. Each particle has random size, position,
// and animation duration so they look organic.

import { useMemo } from "react";

export default function Particles({ count = 30 }) {
  // useMemo so particles don't re-randomize on every render
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      // Random size between 3px and 8px
      size: Math.random() * 5 + 3,
      // Random starting position
      left: Math.random() * 100,
      top: Math.random() * 100,
      // Random animation duration (10s to 25s)
      duration: Math.random() * 15 + 10,
      // Random delay so they don't all start together
      delay: Math.random() * 10,
      // Random color from our accent palette
      color: [
        "rgba(139, 92, 246, 0.15)",  // purple
        "rgba(59, 130, 246, 0.12)",   // blue
        "rgba(6, 182, 212, 0.12)",    // cyan
        "rgba(16, 185, 129, 0.1)",    // green
        "rgba(245, 158, 11, 0.1)",    // orange
      ][Math.floor(Math.random() * 5)],
    }));
  }, [count]);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
