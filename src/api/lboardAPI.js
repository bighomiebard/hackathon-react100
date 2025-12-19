import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const LEADERBOARD_COLLECTION = "leaderboard";

/**
 * Submit a score to the leaderboard
 * Backend-level enforcement of ranked eligibility.
 *
 * @param {Object} scoreData
 * @param {string} scoreData.name
 * @param {number} scoreData.score
 * @param {string} scoreData.difficulty
 * @param {string} scoreData.keyset
 * @param {string|null} scoreData.devProfile
 */
export async function submitScore({
  name,
  score,
  difficulty,
  keyset,
  devProfile,
}) {
  // Allowlists
  const validDifficulties = ["normal", "hard", "impossible"];
  const validKeysets = ["arrows", "dev"];
  const validDevProfiles = ["default", "noshift"];

  // Validate difficulty
  if (!validDifficulties.includes(difficulty)) {
    console.warn(
      `[submitScore] Invalid difficulty: "${difficulty}". Allowed: ${validDifficulties.join(", ")}`
    );
    return;
  }

  // Validate keyset
  if (!validKeysets.includes(keyset)) {
    console.warn(
      `[submitScore] Invalid keyset: "${keyset}". Allowed: ${validKeysets.join(", ")}`
    );
    return;
  }

  // Validate dev profile if using dev keyset
  if (keyset === "dev") {
    if (!validDevProfiles.includes(devProfile)) {
      console.warn(
        `[submitScore] Invalid devProfile: "${devProfile}". Custom dev configs are not ranked.`
      );
      return;
    }
  }

  try {
    await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      name,
      score,
      difficulty,
      keyset,
      devProfile: keyset === "dev" ? devProfile : null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
}

/**
 * Fetch top scores from the leaderboard
 * @param {number} topLimit
 * @returns {Promise<Array>}
 */
export async function fetchTopScores(topLimit = 25) {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy("score", "desc"),
      limit(topLimit)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching top scores:", error);
    throw error;
  }
}