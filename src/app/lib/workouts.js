const WORKOUTS_API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const response = await fetch(WORKOUTS_API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load workouts: ${response.status}`);
  }

  const workouts = await response.json();

  if (!Array.isArray(workouts)) {
    throw new Error("The workout API did not return a list of workouts.");
  }

  return workouts;
}
