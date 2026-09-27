// ============================================
// FriendshipScreen.jsx — Page 3: Compliment Cards
// ============================================
// Displays animated cards with friendly compliments.
// Cards appear one by one with staggered animations.
// Purely platonic — celebrates friendship qualities.

import { useState, useEffect } from "react";
import { COMPLIMENTS } from "../config";
import "./FriendshipScreen.css";

export default function FriendshipScreen({ onNext }) {
  // Controls whether the cards are visible (for stagger animation)
  const [showCards, setShowCards] = useState(false);

  // Trigger card animations after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="screen friendship-screen">
      {/* Background decoration */}
      <div className="friendship-glow" />

      <div className="friendship-content">
        {/* Heading */}
        <div className="friendship-header animate-fadeInUp">
          <h1 className="heading-lg">
            Things That Make You Awesome <span className="star-emoji">⭐</span>
          </h1>
          <p className="text-muted">
            Just a few reasons why you're a great friend
          </p>
        </div>

        {/* Compliment cards grid */}
        <div className="compliment-grid">
          {COMPLIMENTS.map((item, index) => (
            <div
              key={index}
              className={`glass-card compliment-card ${
                showCards ? "animate-fadeInUp" : ""
              }`}
              style={{
                // Stagger each card's animation
                animationDelay: showCards ? `${index * 0.15}s` : "0s",
                opacity: showCards ? undefined : 0,
              }}
            >
              <span className="compliment-emoji">{item.emoji}</span>
              <p className="compliment-text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Continue button */}
        <button
          className="btn-primary animate-fadeInUp"
          style={{ animationDelay: "1s", opacity: 0 }}
          onClick={onNext}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}
