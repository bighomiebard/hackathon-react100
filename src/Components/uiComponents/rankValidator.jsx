/**
 * Informational component showing ranked leaderboard eligibility
 * Does not block gameplay or modify any game logic
 */
export default function RankValidator({ mode, difficulty, keyset }) {
  // Only show for ranked mode
  if (mode.name !== "ranked") {
    return null;
  }

  const validDifficulties = ["normal", "hard", "impossible"];
  const validKeysets = ["arrows", "dev", "devNoShift"];

  const isDifficultyValid = validDifficulties.includes(difficulty.name);
  const isKeysetValid = validKeysets.includes(keyset);

  // Both valid
  if (isDifficultyValid && isKeysetValid) {
    return (
      <div>
        <p className="text-green-400">
          ✓ Your game is eligible for leaderboard submission
        </p>
      </div>
    );
  }

  // Difficulty invalid
  if (!isDifficultyValid) {
    return (
      <div>
        <p className="text-yellow-400">
          Leaderboard ineligible. Difficulty too low. 
        </p>
      </div>
    );
  }

  // Keyset invalid
  if (!isKeysetValid) {
    return (
      <div>
        <p className="text-yellow-400">
          Leaderboard ineligible. Unsupported keyset.
        </p>
      </div>
    );
  }

  return null;
}
