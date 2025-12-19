import { codeToDisplayChar } from "./uiTranslator.jsx";
import { getCurrentGame } from "../../gameComponents/config.js";

export default function DevDisplay({
  sequence = [],
  currentIndex = 0,
  failed = false,
  failureTime = null,
  failedIndex = null,
}) {
  const { devProfile } = getCurrentGame();
  const disableShift = devProfile === "noshift";

  const getKeyColor = (idx) => {
    if (failed && failedIndex !== null && idx === failedIndex) {
      return "#ef4444";
    }
    if (idx < currentIndex) {
      return "#22c55e";
    } else if (idx === currentIndex) {
      return "#9ca3af";
    } else {
      return "#6b7280";
    }
  };

  const shouldShake = failed && failureTime;

  return (
    <div
      className={`bg-gray-800 border-4 border-gray-600 rounded-lg p-8 min-h-40 flex items-center justify-center ${
        shouldShake ? "shake" : ""
      }`}
    >
      <div className="w-full flex justify-evenly items-center">
        {sequence.length > 0 ? (
          sequence.map((key, idx) => (
            <div
              key={idx}
              className="w-24 h-24 flex items-center justify-center rounded font-bold transition-colors flex-shrink-0"
              style={{
                backgroundColor: getKeyColor(idx),
                color: "#ffffff",
                fontSize: "4.5rem",
                fontFamily: "monospace",
                lineHeight: "1",
              }}
            >
              {codeToDisplayChar(key, disableShift)}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">Ready?</p>
        )}
      </div>
    </div>
  );
}