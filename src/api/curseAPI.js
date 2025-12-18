/**
 * Check if a name contains profanity using the PurgoMalum API
 * @param {string} name - The name to check
 * @returns {Promise<boolean>} true if profanity is detected, false otherwise
 */
export async function containsProfanity(name) {
  try {
    const trimmedName = name.trim();
    const encodedName = encodeURIComponent(trimmedName);
    
    const response = await fetch(
      `https://www.purgomalum.com/service/containsprofanity?text=${encodedName}`
    );

    if (!response.ok) {
      console.warn("[containsProfanity] API request failed, failing closed");
      return true;
    }

    const result = await response.text();
    return result === "true";
  } catch (error) {
    console.warn("[containsProfanity] Error checking profanity, failing closed:", error);
    return true;
  }
}
