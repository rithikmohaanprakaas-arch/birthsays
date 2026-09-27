// ============================================
// PuzzleScreen.jsx — Photo Puzzle Challenge
// ============================================
// A 3x3 sliding puzzle using the childhood photo.
// The user must rearrange shuffled tiles by clicking
// tiles adjacent to the empty slot to slide them.

import { useState, useEffect, useCallback } from "react";
import "./PuzzleScreen.css";

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TOTAL_TILES - 1; // index 8 is the blank

// Check if a puzzle configuration is solvable
function isSolvable(tiles) {
  let inversions = 0;
  const filtered = tiles.filter((t) => t !== EMPTY_TILE);
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      if (filtered[i] > filtered[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}

// Shuffle tiles ensuring the puzzle is solvable
function shuffleTiles() {
  let tiles;
  do {
    tiles = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (
    !isSolvable(tiles) ||
    tiles.every((t, i) => t === i) // don't start solved
  );
  return tiles;
}

// Check if puzzle is solved
function isSolved(tiles) {
  return tiles.every((t, i) => t === i);
}

// Get the row/col from a flat index
function getPos(index) {
  return { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
}

// Check if two positions are adjacent (share an edge)
function isAdjacent(idx1, idx2) {
  const p1 = getPos(idx1);
  const p2 = getPos(idx2);
  return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col) === 1;
}

export default function PuzzleScreen({ onNext }) {
  const [tiles, setTiles] = useState(shuffleTiles);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (solved) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, solved]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Handle tile click
  const handleTileClick = useCallback(
    (clickedIndex) => {
      if (solved) return;
      const emptyIndex = tiles.indexOf(EMPTY_TILE);
      if (!isAdjacent(clickedIndex, emptyIndex)) return;

      const newTiles = [...tiles];
      [newTiles[clickedIndex], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[clickedIndex],
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);

      if (isSolved(newTiles)) {
        setSolved(true);
      }
    },
    [tiles, solved]
  );

  // Reset puzzle
  const handleReset = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setSolved(false);
  };

  return (
    <div className="screen puzzle-screen">
      {/* Header */}
      <div className="puzzle-header animate-fadeInUp">
        <h1 className="heading-lg">🧩 Photo Puzzle</h1>
        <p className="text-muted">
          Rearrange the tiles to reveal the hidden photo!
        </p>

        {/* Stats bar */}
        <div className="puzzle-stats">
          <div className="stat-item">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Puzzle grid */}
      <div className="puzzle-area animate-fadeInUp">
        {!solved ? (
          <>
            <div className="puzzle-grid">
              {tiles.map((tileValue, index) => {
                const isEmptyTile = tileValue === EMPTY_TILE;
                // Calculate the background position for each tile
                const originalRow = Math.floor(tileValue / GRID_SIZE);
                const originalCol = tileValue % GRID_SIZE;

                return (
                  <div
                    key={tileValue}
                    className={`puzzle-tile ${isEmptyTile ? "empty-tile" : ""} ${
                      isAdjacent(index, tiles.indexOf(EMPTY_TILE)) && !isEmptyTile
                        ? "movable"
                        : ""
                    }`}
                    onClick={() => handleTileClick(index)}
                    style={
                      !isEmptyTile
                        ? {
                            backgroundImage: "url(/puzzle-photo.png)",
                            backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                            backgroundPosition: `${(originalCol / (GRID_SIZE - 1)) * 100}% ${(originalRow / (GRID_SIZE - 1)) * 100}%`,
                          }
                        : {}
                    }
                  >
                    {isEmptyTile && <span className="empty-icon">✦</span>}
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="puzzle-controls">
              <button
                className="btn-secondary hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? "🙈 Hide Hint" : "💡 Show Hint"}
              </button>
              <button className="btn-secondary" onClick={handleReset}>
                🔄 Reset
              </button>
            </div>

            {/* Hint — shows the full image */}
            {showHint && (
              <div className="hint-container animate-fadeIn">
                <p className="hint-label">Target Image:</p>
                <img
                  src="/puzzle-photo.png"
                  alt="Hint"
                  className="hint-image"
                />
              </div>
            )}
          </>
        ) : (
          /* Solved state */
          <div className="puzzle-solved animate-scaleIn">
            <div className="solved-celebration">
              {["🎉", "✨", "🥳", "💫", "🎊"].map((emoji, i) => (
                <span
                  key={i}
                  className="celebration-emoji"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
            <img
              src="/puzzle-photo.png"
              alt="Revealed"
              className="revealed-photo"
            />
            <h2 className="heading-md">🏆 Puzzle Solved!</h2>
            <div className="solved-stats">
              <span>🎯 {moves} moves</span>
              <span>⏱️ {formatTime(elapsed)}</span>
            </div>
            <p className="text-muted">
              You revealed the hidden memory! 📸
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
