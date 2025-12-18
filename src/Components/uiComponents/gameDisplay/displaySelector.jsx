import { getCurrentGame } from "../../gameComponents/config.js";
import ArrowDisplay from "./arrowDisplay.jsx";
import DevDisplay from "./devDisplay.jsx";

export default function DisplaySelector({ sequence = [], currentIndex = 0, failed = false, failureTime = null, failedIndex = null }) {
  const currentGame = getCurrentGame();
  const keyset = currentGame.keyset;

  if (keyset === "dev") {
    return (
      <DevDisplay
        sequence={sequence}
        currentIndex={currentIndex}
        failed={failed}
        failureTime={failureTime}
        failedIndex={failedIndex}
      />
    );
  }

  // Default to arrows for "arrows" keyset or any other keyset
  return (
    <ArrowDisplay
      arrows={sequence}
      currentIndex={currentIndex}
      failed={failed}
      failureTime={failureTime}
      failedIndex={failedIndex}
    />
  );
}
