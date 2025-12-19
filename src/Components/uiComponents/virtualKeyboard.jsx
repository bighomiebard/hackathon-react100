import { useMemo, useState, useEffect } from "react";
import { codeToDisplayChar } from "./gameDisplay/uiTranslator.jsx";
import { getCurrentGame } from "../gameComponents/config.js";

// Keyboard layout using KeyboardEvent.code (DO NOT store chars)
const keyRows = [
  ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal"],
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
  ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
];

export default function VirtualKeyboard({ selectedKeys = [], onKeyClick }) {
  const { devProfile } = getCurrentGame();

  // "noshift" profile should always disable shift display
  const profileDisablesShift = devProfile === "noshift";

  // UI-only shift preview toggle (never sent to engine, never stored in pool)
  const [shiftPreview, setShiftPreview] = useState(false);

  // Force shiftPreview to false when profile disables shift
  useEffect(() => {
    if (profileDisablesShift && shiftPreview) {
      setShiftPreview(false);
    }
  }, [profileDisablesShift]);

  // If profile disables shift, force display unshifted
  const disableShiftForDisplay = profileDisablesShift ? true : !shiftPreview;

  const modifierCodes = useMemo(
    () =>
      new Set([
        "ShiftLeft",
        "ShiftRight",
        "ControlLeft",
        "ControlRight",
        "AltLeft",
        "AltRight",
        "CapsLock",
      ]),
    []
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2">
        {keyRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 justify-center flex-wrap">
            {row.map((code) => {
              const isShiftLeft = code === "ShiftLeft";
              const isModifier =
                modifierCodes.has(code) ||
                code.startsWith("Control") ||
                code.startsWith("Alt") ||
                code === "CapsLock" ||
                // ShiftLeft is special: not a selectable pool key, but a display toggle
                (code.startsWith("Shift") && !isShiftLeft);

              const isSelected = selectedKeys.includes(code);

              const isSpace = code === "Space";

              // ShiftLeft label should be "Shift" and reflect shiftPreview visually
              const label = isShiftLeft
                ? "Shift"
                : isSpace
                ? "␣"
                : codeToDisplayChar(code, disableShiftForDisplay);

              const isShiftActive = !profileDisablesShift && shiftPreview;

              return (
                <button
                  key={code}
                  type="button"
                  onClick={(e) => {
                    // Remove focus after click
                    e.currentTarget.blur();
                    
                    // ShiftLeft toggles display only
                    if (isShiftLeft) {
                      if (!profileDisablesShift) setShiftPreview((p) => !p);
                      return;
                    }

                    // All other modifiers are disabled
                    if (!isModifier) onKeyClick(code);
                  }}
                  disabled={isModifier && !isShiftLeft}
                  className={`
                    px-4 py-3 rounded font-semibold text-sm
                    transition-all duration-200 select-none focus:outline-none
                    ${
                      // ShiftLeft uses its own active styling based on shiftPreview
                      isShiftLeft
                        ? profileDisablesShift
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-70"
                          : isShiftActive
                          ? "bg-cyan-500 text-black shadow-md ring-2 ring-cyan-300/70"
                          : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                        : isSelected
                        ? "bg-green-500 text-white shadow-md ring-2 ring-green-300/60"
                        : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                    }
                    ${
                      // Disabled modifiers (except ShiftLeft) styling
                      isModifier && !isShiftLeft
                        ? "opacity-40 cursor-not-allowed hover:bg-gray-600"
                        : ""
                    }
                    ${isSpace ? "px-20" : isShiftLeft ? "px-6" : "px-4"}
                  `}
                  aria-pressed={
                    isShiftLeft
                      ? profileDisablesShift
                        ? false
                        : isShiftActive
                      : isModifier
                      ? undefined
                      : isSelected
                  }
                  title={
                    isShiftLeft
                      ? profileDisablesShift
                        ? "No-Shift preset: shifted display is disabled"
                        : "Toggle shifted display"
                      : isModifier
                      ? "Modifier keys are disabled"
                      : undefined
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}