

// makes a random sequence based on current game config
export function generateSequence(gameConfig) {
  const { keyset, difficulty, pool } = gameConfig;
  const { min, max } = difficulty;

  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  const sequence = [];

  // .bindings is not a pool, so we redefine
  const arrowDirections = ["up", "down", "left", "right"];

  for (let i = 0; i < length; i++) {
    if (keyset === "arrows") {
      sequence.push(
        arrowDirections[
          Math.floor(Math.random() * arrowDirections.length)
        ]
      );
    }

    if (keyset === "dev") {
      sequence.push(
        pool[Math.floor(Math.random() * pool.length)]
      );
    }
  }

  return sequence;
}