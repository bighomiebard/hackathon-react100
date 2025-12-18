import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

const LEADERBOARD_COLLECTION = "leaderboard";

/**
 * Submit a score to the leaderboard
 * Only valid ranked submissions are persisted to Firestore.
 * @param {Object} scoreData
 * @param {string} scoreData.name
 * @param {number} scoreData.score
 * @param {string} scoreData.difficulty
 * @param {string} scoreData.keyset
 */
export async function submitScore({ name, score, difficulty, keyset }) {
  // Validation: Allowlists for difficulty and keyset
  const validDifficulties = ["normal", "hard", "impossible"];
  const validKeysets = ["arrows", "dev", "devNoShift"];

  // Validate difficulty
  if (!validDifficulties.includes(difficulty)) {
    console.warn(
      `[submitScore] Invalid difficulty: "${difficulty}". Must be one of: ${validDifficulties.join(", ")}`
    );
    return;
  }

  // Validate keyset
  if (!validKeysets.includes(keyset)) {
    console.warn(
      `[submitScore] Invalid keyset: "${keyset}". Must be one of: ${VALID_KEYSETS.join(", ")}`
    );
    return;
  }

  try {
    await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      name,
      score,
      difficulty,
      keyset,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
}

/**
 * Fetch top scores from the leaderboard
 * @param {number} topLimit - Number of top scores to fetch (default: 10)
 * @returns {Promise<Array>} Array of score documents ordered by score descending
 */
export async function fetchTopScores(topLimit = 25) {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy("score", "desc"),
      limit(topLimit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching top scores:", error);
    throw error;
  }
}
