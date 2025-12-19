import { useState, useEffect } from "react";
import Button from "../uiComponents/button.jsx";
import Checkbox from "../uiComponents/checkboxes/checkbox.jsx";
import VirtualKeyboard from "../uiComponents/virtualKeyboard.jsx";
import ConfigFooter from "../uiComponents/ConfigFooter.jsx";

import { VIEWS } from "./pageHandler.jsx";
import {
  getCurrentGame,
  commitArrowBindings,
  commitDevPool,
  setDevProfile,
} from "../gameComponents/config.js";
import {
  defaultArrowBinds,
  arrowWASDBinds,
} from "../gameComponents/templates.js";

const MIN_DEV_KEYS = 5;

const arrowDirections = [
  { dir: "up", label: "↑" },
  { dir: "left", label: "←" },
  { dir: "right", label: "→" },
  { dir: "down", label: "↓" },
];

export default function KeybindPage({ setView }) {
  const game = getCurrentGame();
  const mode = game.keyset; // "arrows" | "dev"

  // ----- draft states -----
  const [draftArrowBindings, setDraftArrowBindings] = useState(game.bindings);
  const [draftDevPool, setDraftDevPool] = useState(game.pool);

  const [useWASD, setUseWASD] = useState(false);
  const [disableShift, setDisableShift] = useState(
    game.devProfile === "noshift"
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Arrow remap listening state
  const [listeningFor, setListeningFor] = useState(null);
  // null | "up" | "down" | "left" | "right"

  // ----- validation (DEV MODE ONLY) -----
  const tooFewDevKeys =
    mode === "dev" && draftDevPool.length < MIN_DEV_KEYS;

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

  // ----- Disable Shift toggle -----
  function handleDisableShiftChange(e) {
    const isChecked = e.target.checked;
    setDisableShift(isChecked);
    setDevProfile(isChecked ? "noshift" : "default");
    setHasChanges(true);
  }

  // ----- Arrow remap listener -----
  useEffect(() => {
    if (!listeningFor) return;

    function handleKeyDown(e) {
      e.preventDefault();

      const code = e.code;

      setDraftArrowBindings((prev) => ({
        ...prev,
        [listeningFor]: code,
      }));

      setListeningFor(null);
      setHasChanges(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [listeningFor]);

  // ----- Commit -----
  function handleDone() {
    if (tooFewDevKeys) return;

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
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            keybinds
          </h1>

          <Button
            onClick={handleDone}
            variant="grey"
            size="small"
            disabled={tooFewDevKeys}
          >
            done
          </Button>
        </div>

        {/* ---------- ARROW MODE ---------- */}
        {mode === "arrows" && (
        <div className="mb-10 flex justify-center">
          <div className="flex gap-14 items-center">

            {/* D-Pad */}
            <div className="relative grid grid-cols-3 grid-rows-3 gap-2">
              {/* Up */}
              <Button
                className="col-start-2 row-start-1"
                variant={listeningFor === "up" ? "primary" : "grey"}
                onClick={() => setListeningFor("up")}
              >
                ↑
              </Button>

              {/* Left */}
              <Button
                className="col-start-1 row-start-2"
                variant={listeningFor === "left" ? "primary" : "grey"}
                onClick={() => setListeningFor("left")}
              >
                ←
              </Button>

              {/* Right */}
              <Button
                className="col-start-3 row-start-2"
                variant={listeningFor === "right" ? "primary" : "grey"}
                onClick={() => setListeningFor("right")}
              >
                →
              </Button>

              {/* Down */}
              <Button
                className="col-start-2 row-start-3"
                variant={listeningFor === "down" ? "primary" : "grey"}
                onClick={() => setListeningFor("down")}
              >
                ↓
              </Button>
            </div>

            {/* Mapping panel */}
            <div className="flex flex-col gap-4 text-sm">
              {arrowDirections.map(({ dir, label }) => (
                <div
                  key={dir}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg
                    ${
                      listeningFor === dir
                        ? "bg-cyan-500/10 border border-cyan-400/40"
                        : "bg-black/30 border border-white/10"
                    }
                  `}
                >
                  <span className="w-4 text-lg text-white">{label}</span>

                  <span className="text-gray-400">
                    mapped to
                  </span>

                  <span className="font-mono text-white">
                    {draftArrowBindings[dir]}
                  </span>

                  {listeningFor === dir && (
                    <span className="ml-2 text-cyan-400 text-xs">
                      press a key…
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

        {/* ---------- DEV MODE ---------- */}
        {mode === "dev" && (
          <>
            <div className="mb-4">
              <Checkbox
                id="disable-shift"
                label="Disable Shift"
                checked={disableShift}
                onChange={handleDisableShiftChange}
              />
            </div>

            {tooFewDevKeys && (
              <div className="mb-4 rounded-md border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                Too few characters (min {MIN_DEV_KEYS})
              </div>
            )}

            <VirtualKeyboard
              selectedKeys={draftDevPool}
              onKeyClick={handleKeyClick}
            />
          </>
        )}
      </div>

      <div/>
    </div>
  );
}