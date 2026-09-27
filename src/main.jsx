// ============================================
// main.jsx — Application Entry Point
// ============================================
// This is where React gets mounted to the DOM.
// Nothing fancy here — just standard Vite + React setup.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
