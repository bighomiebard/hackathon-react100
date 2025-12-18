import {
  modes,
  difficulty,
  defaultArrowBinds,
  defaultDevPool,
} from "./templates.js";

// current game settings
let currentGame = {
  mode: modes.practice,
  difficulty: difficulty.normal,
  keyset: "arrows", // "arrows" | "dev"
  bindings: structuredClone(defaultArrowBinds),
  pool: structuredClone(defaultDevPool),
};

//function to get current game settings
export function getCurrentGame() {
  return structuredClone(currentGame);
}

//update game mode
export function setGameMode(modeName) {
  if (!modes[modeName]) {
    throw new Error(`Invalid game mode: ${modeName}`);
  }
  currentGame.mode = structuredClone(modes[modeName]);
}

//update difficulty
export function setDifficulty(difficultyName) {
  if (!difficulty[difficultyName]) {
    throw new Error(`Invalid difficulty: ${difficultyName}`);
  }
  currentGame.difficulty = structuredClone(difficulty[difficultyName]);
}

//update keyset
export function setKeyset(keyset) {
  if (keyset !== "arrows" && keyset !== "dev") {
    throw new Error(`Invalid keyset: ${keyset}`);
  }
  currentGame.keyset = keyset;
}

//update keybindings (arrows)
export function commitArrowBindings(newBindings) {
  currentGame.bindings = structuredClone(newBindings);
}

//update pool (dev mode)
export function commitDevPool(newPool) {
  currentGame.pool = structuredClone(newPool);
}
