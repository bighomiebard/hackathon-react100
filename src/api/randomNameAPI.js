/**
 * Fetch a random username from randomuser.me API
 * Returns the login.username from the first result
 * Silently fails on error and returns null
 */
export async function generateRandomName() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0].login.username;
  } catch (err) {
    console.error("Error generating random name:", err);
    return null;
  }
}
