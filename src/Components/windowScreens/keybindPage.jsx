import { useState } from "react";
import Button from "../uiComponents/button.jsx";
import Checkbox from "../uiComponents/checkboxes/checkbox.jsx";
import VirtualKeyboard from "../uiComponents/virtualKeyboard.jsx";
import { VIEWS } from "./pageHandler.jsx";
import {
  getCurrentGame,
  commitArrowBindings,
  commitDevPool,
} from "../gameComponents/config.js";
import {
  defaultArrowBinds,
  arrowWASDBinds,
} from "../gameComponents/templates.js";

export default function KeybindPage({ setView }) {
  const game = getCurrentGame();
  const mode = game.keyset; // "arrows" | "dev"

  //draft states 
  const [draftArrowBindings, setDraftArrowBindings] = useState(
    game.bindings
  );
  const [draftDevPool, setDraftDevPool] = useState(
    game.pool
  );

  const [useWASD, setUseWASD] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // ----- Arrow remapping -----
  function remapArrow(direction, key) {
    setDraftArrowBindings((prev) => ({
      ...prev,
      [direction]: key,
    }));
    setHasChanges(true);
  }

  // ----- Dev pool toggling -----
  function toggleDevKey(key) {
    setDraftDevPool((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
    setHasChanges(true);
  }

  // ----- WASD preset -----
  function handleToggleWASD(checked) {
    setUseWASD(checked);

    setDraftArrowBindings(
      structuredClone(checked ? arrowWASDBinds : defaultArrowBinds)
    );

    setHasChanges(true);
  }

  // ----- Commit -----
  function handleDone() {
    if (hasChanges) {
      if (mode === "arrows") {
        commitArrowBindings(draftArrowBindings);
      }
      if (mode === "dev") {
        commitDevPool(draftDevPool);
      }
    }

    setView(VIEWS.KEYSET);
  }

  // ----- Keyboard click handler -----
  function handleKeyClick(key) {
    if (mode === "dev") {
      toggleDevKey(key);
    }
    // Arrow remapping is intentionally explicit via UI controls,
    // not raw key clicks (prevents accidental remaps)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            keybinds
          </h1>
          <Button onClick={handleDone} variant="grey" size="small">
            done
          </Button>
        </div>

        {/* Arrow-mode options */}
        {mode === "arrows" && (
          <div className="mb-6">
            <Checkbox
              id="wasd-preset"
              label="use WASD preset"
              checked={useWASD}
              onChange={(e) => handleToggleWASD(e.target.checked)}
            />
          </div>
        )}

        {/* Virtual keyboard */}
        <VirtualKeyboard 
          selectedKeys={mode === "dev" ? draftDevPool : []}
          onKeyClick={handleKeyClick}
        />

      </div>
    </div>
  );
}