import Button from "../uiComponents/button.jsx";
import ButtonGroup from "../uiComponents/ButtonGroup.jsx";
import RankValidator from "../uiComponents/rankValidator.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { startGame } from "../gameComponents/engine.js";
import { getCurrentGame } from "../gameComponents/config.js";

export default function MenuPage({ setView }) {
  const currentGame = getCurrentGame();

  const handleBegin = () => {
    const configSnapshot = getCurrentGame();
    startGame(configSnapshot);        // 🔑 GAME STARTS HERE
    setView(VIEWS.PLAY);
  };

  const handleNavigate = (view) => {
    setView(view);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        {/* Current Settings Display */}
        <div className="bg-gray-700 border-2 border-gray-600 rounded-lg p-6 mb-12 inline-block">
          <h2 className="text-lg font-bold text-white mb-3">Current Settings</h2>
          <div className="text-white text-left space-y-2">
            <p className="text-gray-300">Mode: <span className="font-semibold text-gray-100">{currentGame.mode.name}</span></p>
            <p className="text-gray-300">Difficulty: <span className="font-semibold text-gray-100">{currentGame.difficulty.name}</span></p>
            <p className="text-gray-300">Keyset: <span className="font-semibold text-gray-100">{currentGame.keyset}</span></p>
          </div>
        </div>

        {/* Ranked Leaderboard Eligibility */}
        <div className="mb-8">
          <RankValidator
            mode={currentGame.mode}
            difficulty={currentGame.difficulty}
            keyset={currentGame.keyset}
          />
        </div>

        <h1 className="text-5xl font-bold text-white mb-16">
          Choose your fate
        </h1>

        <div className="flex gap-12 justify-between w-full">
          {/* Left side buttons */}
          <ButtonGroup gap="gap-8">
            <Button
              onClick={handleBegin}
              variant="grey"
              size="medium"
            >
              Begin
            </Button>

            <Button
              onClick={() => handleNavigate(VIEWS.DIFFICULTY)}
              variant="grey"
              size="medium"
            >
              Difficulty
            </Button>

            <Button
              onClick={() => handleNavigate(VIEWS.MODE)}
              variant="grey"
              size="medium"
            >
              Mode
            </Button>
          </ButtonGroup>

          {/* Right side buttons */}
          <ButtonGroup gap="gap-8">
            <Button
              onClick={() => handleNavigate(VIEWS.KEYSET)}
              variant="grey"
              size="medium"
            >
              Keyset
            </Button>

            <Button
              onClick={() => handleNavigate(VIEWS.LEADERBOARD)}
              variant="grey"
              size="medium"
            >
              Leaderboard
            </Button>

            <Button
              onClick={() => handleNavigate(VIEWS.HOME)}
              variant="grey"
              size="medium"
            >
              Homepage
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}