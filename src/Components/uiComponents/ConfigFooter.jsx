import { getCurrentGame } from "../gameComponents/config.js";
import { codeToDisplayChar } from "./gameDisplay/uiTranslator.jsx";

/**
 * ConfigFooter: Display-only footer showing current game configuration.
 * Appears on all pages except StartPage and LeaderboardPage.
 * Reads from getCurrentGame() as the single source of truth.
 */
export default function ConfigFooter() {
  const game = getCurrentGame();

  // Format mode (capitalize first letter)
  const modeLabel = game.mode?.name ? game.mode.name.charAt(0).toUpperCase() + game.mode.name.slice(1) : "Unknown";

  // Format difficulty (capitalize first letter)
  const difficultyLabel = game.difficulty?.name ? game.difficulty.name.charAt(0).toUpperCase() + game.difficulty.name.slice(1) : "Unknown";

  // Format keyset
  const keysetLabel = game.keyset === "arrows" ? "Arrows" : game.keyset === "dev" ? "Dev" : game.keyset;

  // Format dev profile (only shown in dev mode)
  const devProfileLabel = game.devProfile === "noshift" ? "No Shift" : game.devProfile === "custom" ? "Custom" : "Default";

  // Active dev pool count (only shown in dev mode)
  const devPoolCount = game.pool?.length ?? 0;

  return (
    <footer className="fixed inset-x-0 bottom-0 bg-gray-800 border-t-2 border-cyan-500 px-6 py-3 text-xs z-50">
      <div className="flex gap-6 max-w-full">
        {/* Mode */}
        <div className="flex gap-2">
          <span className="text-gray-400">Mode:</span>
          <span className="text-white font-semibold">{modeLabel}</span>
        </div>

        {/* Difficulty */}
        <div className="flex gap-2">
          <span className="text-gray-400">Difficulty:</span>
          <span className="text-white font-semibold">{difficultyLabel}</span>
        </div>

        {/* Keyset */}
        <div className="flex gap-2">
          <span className="text-gray-400">Keyset:</span>
          <span className="text-white font-semibold">{keysetLabel}</span>
        </div>

        {/* Dev Profile (only in dev mode) */}
        {game.keyset === "dev" && (
          <div className="flex gap-2">
            <span className="text-gray-400">Profile:</span>
            <span className="text-white font-semibold">{devProfileLabel}</span>
          </div>
        )}

        {/* Active Dev Pool (only in dev mode) */}
        {game.keyset === "dev" && (
          <div className="flex gap-2">
            <span className="text-gray-400">Keys:</span>
            <span className="text-white font-semibold">{devPoolCount}</span>
          </div>
        )}
      </div>
    </footer>
  );
}
