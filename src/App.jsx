// ============================================
// App.jsx — Main Application Component
// ============================================
// Controls which screen is currently visible using
// React state. Think of it as a simple page router.
// The flow: Welcome → Mission → Friendship → Memories → Final

import { useState } from "react";
import Particles from "./components/Particles";
import WelcomeScreen from "./components/WelcomeScreen";
import MissionScreen from "./components/MissionScreen";
import FriendshipScreen from "./components/FriendshipScreen";
import MemoryGallery from "./components/MemoryGallery";
import CakeCuttingScreen from "./components/CakeCuttingScreen";
import FinalScreen from "./components/FinalScreen";

// All possible screens in order
const SCREENS = ["welcome", "mission", "friendship", "memories", "cake", "final"];

export default function App() {
  // currentScreen controls which page is shown
  // We start at "welcome" (index 0)
  const [currentScreen, setCurrentScreen] = useState("welcome");

  // Navigate to the next screen in sequence
  const goToNextScreen = () => {
    const currentIndex = SCREENS.indexOf(currentScreen);
    if (currentIndex < SCREENS.length - 1) {
      setCurrentScreen(SCREENS[currentIndex + 1]);
      // Scroll to top when changing screens
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating particles — always visible in background */}
      <Particles count={25} />

      {/* Render the active screen based on state */}
      {currentScreen === "welcome" && (
        <WelcomeScreen onNext={goToNextScreen} />
      )}

      {currentScreen === "mission" && (
        <MissionScreen onNext={goToNextScreen} />
      )}

      {currentScreen === "friendship" && (
        <FriendshipScreen onNext={goToNextScreen} />
      )}

      {currentScreen === "memories" && (
        <MemoryGallery onNext={goToNextScreen} />
      )}

      {currentScreen === "cake" && (
        <CakeCuttingScreen onNext={goToNextScreen} />
      )}

      {currentScreen === "final" && (
        <FinalScreen />
      )}
    </>
  );
}

