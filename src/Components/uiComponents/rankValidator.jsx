import { getRankedEligibility } from "../gameComponents/rankedPolicy.js";
import { getCurrentGame } from "../gameComponents/config.js";

export default function RankValidator() {
  const gameConfig = getCurrentGame();
  const result = getRankedEligibility(gameConfig);

  if (gameConfig.mode.name !== "ranked") return null;

  if (result.eligible) {
    return (
      <p className="text-green-400">
        ✓ Your game is eligible for leaderboard submission
      </p>
    );
  }

  if (result.reason === "difficulty") {
    return (
      <p className="text-yellow-400">
        Leaderboard ineligible. Difficulty too low.
      </p>
    );
  }

  if (result.reason === "devProfile") {
    return (
      <p className="text-yellow-400">
        Leaderboard ineligible. Custom dev keybinds are not ranked.
      </p>
    );
  }

  return (
    <p className="text-yellow-400">
      Leaderboard ineligible. Unsupported keyset.
    </p>
  );
}