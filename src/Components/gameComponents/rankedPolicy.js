export function getRankedEligibility(gameConfig) {
  // Only ranked mode can submit
  if (gameConfig.mode.name !== "ranked") {
    return { eligible: false, reason: "mode" };
  }

  // Difficulty gate
  const validDifficulties = ["normal", "hard", "impossible"];
  if (!validDifficulties.includes(gameConfig.difficulty.name)) {
    return { eligible: false, reason: "difficulty" };
  }

  // Keyset + devProfile gate
  if (gameConfig.keyset === "dev") {
    if (gameConfig.devProfile !== "default" && gameConfig.devProfile !== "noshift") {
      return { eligible: false, reason: "devProfile" };
    }
  }

  return { eligible: true };
}