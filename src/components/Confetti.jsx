// ============================================
// Confetti.jsx — Confetti explosion effect
// ============================================
// Renders a burst of colorful confetti pieces that
// fall from the top of the screen. Used on the final
// birthday reveal screen.

import { useMemo } from "react";
import "./Confetti.css";

export default function Confetti({ count = 80 }) {
  // Generate random confetti pieces
  const pieces = useMemo(() => {
    const colors = [
      "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981",
      "#f59e0b", "#ec4899", "#ef4444", "#f97316",
      "#a855f7", "#14b8a6",
    ];
    const shapes = ["square", "circle", "strip"];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      left: Math.random() * 100,              // horizontal position %
      size: Math.random() * 8 + 5,            // 5px to 13px
      duration: Math.random() * 2 + 2,        // 2s to 4s fall time
      delay: Math.random() * 1.5,             // stagger start
      rotation: Math.random() * 360,           // initial rotation
      drift: (Math.random() - 0.5) * 200,     // horizontal drift in px
    }));
  }, [count]);

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`confetti-piece confetti-${p.shape}`}
          style={{
            left: `${p.left}%`,
            width: p.shape === "strip" ? `${p.size * 0.4}px` : `${p.size}px`,
            height: p.shape === "strip" ? `${p.size * 2}px` : `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
