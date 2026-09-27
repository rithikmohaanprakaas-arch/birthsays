// ============================================
// MissionScreen.jsx — Page 2: Birthday Challenges
// ============================================
// Three interactive mini-challenges that unlock sequentially.
// 1. Riddle with multiple choice
// 2. Emoji guessing game
// 3. Memory box with hidden messages

import { useState, useRef } from "react";
import {
  RIDDLE,
  MEMORY_BOX_MESSAGES,
} from "../config";
import "./MissionScreen.css";

export default function MissionScreen({ onNext }) {
  // Track which challenges are completed (1, 2, 3)
  const [completed, setCompleted] = useState([]);
  // Track which challenge is currently active
  const [activeChallenge, setActiveChallenge] = useState(1);
  // For showing wrong-answer shake animation
  const [shaking, setShaking] = useState(false);
  // For the memory box — which messages have been revealed
  const [revealedMessages, setRevealedMessages] = useState([]);
  // Success flash for correct answers
  const [showSuccess, setShowSuccess] = useState(false);
  // Audio player state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songPlayed, setSongPlayed] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  // Envelope / letter state
  const [letterOpened, setLetterOpened] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle answering the riddle (Challenge 1)
  const handleRiddleAnswer = (index) => {
    if (index === RIDDLE.correctIndex) {
      markCompleted(1);
    } else {
      triggerShake();
    }
  };



  // Handle revealing a memory box message (Challenge 3)
  const handleRevealMessage = (index) => {
    if (!revealedMessages.includes(index)) {
      setRevealedMessages((prev) => [...prev, index]);
      // Complete challenge 3 when all messages are revealed
      if (revealedMessages.length + 1 >= MEMORY_BOX_MESSAGES.length) {
        setTimeout(() => markCompleted(3), 600);
      }
    }
  };

  // Mark a challenge as completed and unlock the next one
  const markCompleted = (num) => {
    setShowSuccess(true);
    setTimeout(() => {
      setCompleted((prev) => [...prev, num]);
      setActiveChallenge(num + 1);
      setShowSuccess(false);
    }, 800);
  };

  // Shake animation for wrong answers
  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  // Check if all 3 challenges are done
  const allDone = completed.length >= 3;

  return (
    <div className="screen mission-screen">
      {/* Header */}
      <div className="mission-header animate-fadeInUp">
        <h1 className="heading-lg">
          🎯 Birthday Mission
        </h1>
        <p className="text-muted">
          Complete all 3 challenges to unlock your surprise
        </p>
        {/* Progress indicator */}
        <div className="mission-progress">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`progress-dot ${
                completed.includes(num) ? "dot-complete" : ""
              } ${activeChallenge === num ? "dot-active" : ""}`}
            >
              {completed.includes(num) ? "✅" : num}
            </div>
          ))}
        </div>
      </div>

      {/* Success flash overlay */}
      {showSuccess && (
        <div className="success-flash animate-scaleIn">
          <span className="success-emoji">🎉</span>
          <span>Nice one!</span>
        </div>
      )}

      {/* Challenge Cards */}
      <div className={`challenge-area ${shaking ? "animate-shake" : ""}`}>
        {/* ---- Challenge 1: Riddle ---- */}
        {activeChallenge === 1 && !completed.includes(1) && (
          <div className="glass-card challenge-card animate-fadeInUp">
            <div className="challenge-badge">Challenge 1</div>
            <h2 className="heading-md">💭 Memory Test</h2>
            <p className="challenge-question">{RIDDLE.question}</p>
            <div className="options-grid">
              {RIDDLE.options.map((option, i) => (
                <button
                  key={i}
                  className="btn-secondary option-btn"
                  onClick={() => handleRiddleAnswer(i)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---- Challenge 2: Delivering the Post ---- */}
        {activeChallenge === 2 && !completed.includes(2) && (
          <div className={`glass-card challenge-card animate-fadeInUp ${isPlaying ? "song-playing" : ""}`}>
            <div className="challenge-badge">Challenge 2</div>
            <h2 className="heading-md">📬 You've Got a Post!</h2>

            {/* Floating music notes — visible while playing */}
            {isPlaying && (
              <div className="floating-notes">
                {["♪", "♫", "♬", "♩", "🎵", "🎶", "💌", "✨"].map((note, i) => (
                  <span
                    key={i}
                    className="floating-note"
                    style={{
                      left: `${10 + i * 11}%`,
                      animationDelay: `${i * 0.4}s`,
                      fontSize: `${1.2 + Math.random() * 1.2}rem`,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}

            {/* Phase 1: Sealed envelope */}
            {!letterOpened && (
              <div className="envelope-container animate-slideInEnvelope">
                <div className="envelope" onClick={() => setLetterOpened(true)}>
                  <div className="envelope-back">
                    <div className="envelope-flap"></div>
                  </div>
                  <div className="envelope-front">
                    <div className="envelope-seal">💌</div>
                    <p className="envelope-to">To: Oveka</p>
                    <p className="envelope-from">From: Someone Special ❤️</p>
                    <div className="envelope-stamp">🎵</div>
                  </div>
                </div>
                <p className="tap-hint animate-pulse-text">✉️ Tap the envelope to open</p>
              </div>
            )}

            {/* Phase 2: Letter revealed with song */}
            {letterOpened && (
              <div className="letter-container animate-letterUnfold">
                <div className="letter">
                  <div className="letter-header">
                    <span className="letter-date">With love, for you</span>
                    <span className="letter-icon">💝</span>
                  </div>
                  <div className="letter-divider"></div>
                  <p className="letter-body">
                    I am going to dedicate this song to you...
                  </p>
                  <p className="song-title">🎵 Manadhoram Oru Kaayam</p>

                  {/* Equalizer bars — visible while playing */}
                  {isPlaying && (
                    <div className="equalizer">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="eq-bar"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="song-player">
                    <audio
                      ref={audioRef}
                      src={`${import.meta.env.BASE_URL}song.mp3`}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={() => {
                        if (audioRef.current) {
                          const { currentTime, duration } = audioRef.current;
                          setSongProgress(duration ? (currentTime / duration) * 100 : 0);
                          setSongCurrentTime(currentTime);
                          setSongDuration(duration || 0);
                        }
                      }}
                      onEnded={() => {
                        setIsPlaying(false);
                        setSongPlayed(true);
                        markCompleted(2);
                      }}
                    />

                    {/* Progress bar */}
                    {songDuration > 0 && (
                      <div className="song-progress-container">
                        <div className="song-progress-bar">
                          <div
                            className="song-progress-fill"
                            style={{ width: `${songProgress}%` }}
                          />
                        </div>
                        <div className="song-time">
                          <span>{formatTime(songCurrentTime)}</span>
                          <span>{formatTime(songDuration)}</span>
                        </div>
                      </div>
                    )}

                    <button
                      className={`btn-primary play-btn ${isPlaying ? "playing" : ""}`}
                      onClick={() => {
                        if (audioRef.current) {
                          if (isPlaying) {
                            audioRef.current.pause();
                          } else {
                            audioRef.current.play();
                          }
                        }
                      }}
                    >
                      {isPlaying ? "⏸️ Pause" : "▶️ Play Song"}
                    </button>
                  </div>

                  <div className="letter-footer">
                    <span>~ with all my heart ~</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- Challenge 3: Memory Box ---- */}
        {activeChallenge === 3 && !completed.includes(3) && (
          <div className="glass-card challenge-card animate-fadeInUp">
            <div className="challenge-badge">Challenge 3</div>
            <h2 className="heading-md">📦 Memory Box</h2>
            <p className="challenge-question">
              Click each box to reveal a hidden message!
            </p>
            <div className="memory-boxes">
              {MEMORY_BOX_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={`memory-box ${
                    revealedMessages.includes(i) ? "revealed" : ""
                  }`}
                  onClick={() => handleRevealMessage(i)}
                >
                  {revealedMessages.includes(i) ? (
                    <p className="memory-text animate-fadeIn">{msg}</p>
                  ) : (
                    <div className="mystery-content">
                      <span className="mystery-icon">🎁</span>
                      <span className="mystery-label">Tap to open</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- All challenges completed ---- */}
        {allDone && (
          <div className="glass-card challenge-card animate-scaleIn">
            <span className="complete-emoji">🏆</span>
            <h2 className="heading-md">Mission Progress: 100%</h2>
            <p className="text-muted">
              All challenges completed! You're ready for the next level.
            </p>
            <button className="btn-primary" onClick={onNext}>
              CONTINUE →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
