
import { useEffect, useState } from "react";
import Card from "../uiComponents/card.jsx";
import DisplaySelector from "../uiComponents/gameDisplay/displaySelector.jsx";
import Button from "../uiComponents/button.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { getCurrentGame } from "../gameComponents/config.js";
import {
  startGame,
  stopGame,
  handleKeyPress,
  subscribe,
  getTiming,
  PHASES
} from "../gameComponents/engine.js";

export default function PlayPage({ setView }) {
  const [engineState, setEngineState] = useState(null);
  const [timeLeft, setTimeLeft] = useState("∞");

  // Mount: subscribe first, then start game
  useEffect(() => {
    const unsubscribe = subscribe(setEngineState);

    const onKeyDown = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unsubscribe();
    };
  }, []);

  // Timer display (engine owns truth)
  useEffect(() => {
  const interval = setInterval(() => {
    const { startTime, duration } = getTiming();

    if (!startTime || !duration) {
      setTimeLeft("∞");
      return;
    }

    const elapsed = Date.now() - startTime;
    const remainingMs = Math.max(0, duration - elapsed);

    const remainingTenths = Math.ceil(remainingMs / 100) / 10;

    setTimeLeft(remainingTenths.toFixed(1));
  }, 50);

  return () => clearInterval(interval);
}, []);

  // Semantic end-game transition
  useEffect(() => {
    if (engineState?.phase === PHASES.ENDED) {
      setView(VIEWS.END);
    }
  }, [engineState?.phase]);

  if (!engineState) return null;

  const handleDone = () => {
    stopGame();
    setView(VIEWS.END);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 ${engineState.phase === PHASES.FAILED ? 'shake' : ''}`}>
      {/* Countdown Overlay */}
      {engineState.phase === PHASES.COUNTDOWN && (
        <div
          className="fixed flex items-center justify-center z-50"
          style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(200px, 50vw, 500px)",
              fontWeight: "bold",
              color: "white",
              lineHeight: "1",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            {engineState.countdownValue}
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button onClick={handleDone} variant="grey" size="small">
            done
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Card title="Score" value={engineState.score} />
          <Card title="Mistakes" value={engineState.mistakes} />
          <Card title="Time Left" value={`${timeLeft}s`} />
        </div>

        {/* Sequence */}
        <DisplaySelector
          sequence={engineState.sequence}
          currentIndex={engineState.index}
          failed={engineState.phase === PHASES.FAILED}
          failureTime={engineState.failureTime}
          failedIndex={engineState.failedIndex}
        />

      </div>
    </div>
  );
}