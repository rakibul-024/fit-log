import fallbackWorkouts from "./fallbackWorkouts";

const WORKOUTS_API_URL = "https://api.abcz.workers.dev/api/fitlog";
const CACHE_SECONDS = 3600;

export async function getWorkouts() {
  try {
    const response = await fetch(WORKOUTS_API_URL, {
      next: { revalidate: CACHE_SECONDS },
    });

    if (!response.ok) {
      console.warn(
        `Workout API returned ${response.status}; using the built-in workout list.`,
      );
      return { workouts: fallbackWorkouts, usingFallback: true };
    }

    const workouts = await response.json();
    if (!Array.isArray(workouts) || workouts.length === 0) {
      console.warn("Workout API returned no usable list; using the built-in workout list.");
      return { workouts: fallbackWorkouts, usingFallback: true };
    }

    return { workouts, usingFallback: false };
  } catch (error) {
    console.warn("Workout API could not be reached; using the built-in workout list.", error);
    return { workouts: fallbackWorkouts, usingFallback: true };
  }
}
