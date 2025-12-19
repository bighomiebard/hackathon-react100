import { useState, useEffect, useRef } from "react";
import Button from "../uiComponents/button.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { restartGame, subscribe, getState, PHASES } from "../gameComponents/engine.js";
import { getPlayerName } from "../gameComponents/playerName.js";
import { submitScore } from "../../api/lboardAPI.js";
import { getCurrentGame } from "../gameComponents/config.js";
import { getRankedEligibility } from "../gameComponents/rankedPolicy.js";

export default function EndPage({ setView }) {
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const submittedRef = useRef(false);
  //uncomment in final product
  //const playerName = getPlayerName();
  const playerName = "Test User"; //temporary for testing purposes

  // Helper function to attempt submission
const trySubmit = (engineState) => {
  const gameConfig = getCurrentGame();
  const eligibility = getRankedEligibility(gameConfig);

  if (
    engineState.phase === PHASES.ENDED && // end phase
    !submittedRef.current && // not yet submitted
    playerName && // has name
    // turn on in final product
    // engineState.score > 0 && // positive score
    eligibility.eligible // ranked-eligible config (mode/difficulty/devProfile)
  ) {
    submittedRef.current = true;

    submitScore({
      name: playerName,
      score: engineState.score,
      difficulty: gameConfig.difficulty.name,
      keyset: gameConfig.keyset,
      devProfile: gameConfig.keyset === "dev" ? gameConfig.devProfile : null,
    }).catch((err) => {
      console.error("Failed to submit score:", err);
    });
  }

  // Reset submission flag when game returns to active
  if (engineState.phase === PHASES.ACTIVE) {
    submittedRef.current = false;
  }
};

  useEffect(() => {
    // Try to submit on mount with current engine state
    trySubmit(getState());

    // Subscribe to future state changes
    const unsubscribe = subscribe((engineState) => {
      setScore(engineState.score);
      setMistakes(engineState.mistakes);
      trySubmit(engineState);
    });

    return unsubscribe;
  }, [playerName]);

  const handleRetry = () => {
    restartGame();
    setView(VIEWS.PLAY);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold text-white mb-8">game over</h1>

        <p className="text-gray-300 text-lg mb-6">{playerName}</p>

        <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 mb-12">
          <p className="text-white text-2xl font-semibold mb-2">your score</p>
          <p className="text-green-400 text-5xl font-bold">{score}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={handleRetry} variant="grey" size="medium">
            retry
          </Button>

          <Button
            onClick={() => setView(VIEWS.LEADERBOARD)}
            variant="grey"
            size="medium"
          >
            leaderboard
          </Button>

          <Button
            onClick={() => setView(VIEWS.MENU)}
            variant="grey"
            size="medium"
          >
            menu
          </Button>
        </div>
      </div>
    </div>
  );
}