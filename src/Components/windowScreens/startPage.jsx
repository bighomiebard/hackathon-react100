import { useState } from "react";
import Button from "../uiComponents/button.jsx";
import ButtonGroup from "../uiComponents/ButtonGroup.jsx";
import { VIEWS } from "./pageHandler.jsx";
import { setPlayerName, getPlayerName } from "../gameComponents/playerName.js";
import { containsProfanity } from "../../api/curseAPI.js";

export default function StartPage({ setView }) {
  const [nameInput, setNameInput] = useState(getPlayerName());
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);
  
  const isNameValid = nameInput.trim().length > 0;
  
  const handleContinue = async () => {
    if (!isNameValid) return;

    setIsChecking(true);
    setError(null);

    try {
      const hasProfanity = await containsProfanity(nameInput);
      
      if (hasProfanity) {
        setError("That name isn't allowed. Try something else.");
        setIsChecking(false);
        return;
      }

      setPlayerName(nameInput);
      setView(VIEWS.MENU);
    } catch (err) {
      console.error("Error during profanity check:", err);
      setError("Something went wrong. Please try again.");
      setIsChecking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isNameValid) {
      handleContinue();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-12">
          Are you ready?
        </h1>

        <div className="mb-8">
          <label className="block text-white text-lg font-semibold mb-3">
            Enter your name
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your name"
            className="px-4 py-2 rounded text-center text-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
            disabled={isChecking}
          />
          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
        </div>

        <ButtonGroup>
          <Button
            onClick={handleContinue}
            disabled={!isNameValid || isChecking}
            variant="grey"
            size="medium"
          >
            Continue
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
