// ============================================
// Timeline.jsx — Page 4: Memory Timeline
// ============================================
// A vertical timeline showing friendship milestones.
// Each item can be clicked to expand and reveal the
// description (and optional photo placeholder).

import { useState } from "react";
import { TIMELINE_MEMORIES } from "../config";
import "./Timeline.css";

export default function Timeline({ onNext }) {
  // Track which timeline items are expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle expand/collapse on click
  const toggleItem = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="screen timeline-screen">
      <div className="timeline-content">
        {/* Header */}
        <div className="timeline-header animate-fadeInUp">
          <h1 className="heading-lg">Our Timeline 📸</h1>
          <p className="text-muted">
            Click each moment to see the memory
          </p>
        </div>

        {/* Timeline track */}
        <div className="timeline-track">
          {TIMELINE_MEMORIES.map((memory, index) => (
            <div
              key={index}
              className={`timeline-item animate-fadeInUp ${
                expandedIndex === index ? "expanded" : ""
              } ${index % 2 === 0 ? "item-left" : "item-right"}`}
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              onClick={() => toggleItem(index)}
            >
              {/* The dot on the timeline line */}
              <div className="timeline-dot">
                <div className="dot-inner" />
              </div>

              {/* Content card */}
              <div className="glass-card timeline-card">
                <span className="timeline-year">{memory.year}</span>
                <h3 className="timeline-title">{memory.title}</h3>

                {/* Expanded content — shows on click */}
                {expandedIndex === index && (
                  <div className="timeline-detail animate-fadeIn">
                    <p className="timeline-description">
                      {memory.description}
                    </p>
                    {/* If the memory has an image, show it */}
                    {memory.image && (
                      <div className="timeline-image-wrapper">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="timeline-image"
                        />
                      </div>
                    )}
                    {/* Placeholder if no image yet */}
                    {!memory.image && (
                      <div className="timeline-image-placeholder">
                        📷 Add photo here
                      </div>
                    )}
                  </div>
                )}

                {/* Expand hint */}
                {expandedIndex !== index && (
                  <span className="expand-hint">tap to reveal ↓</span>
                )}
              </div>
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
