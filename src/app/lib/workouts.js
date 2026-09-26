const WORKOUTS_API_URL = "https://api.abcz.workers.dev/api/fitlog";

function isWorkout(workout) {
  return (
    workout !== null &&
    typeof workout === "object" &&
    (typeof workout.id === "number" || typeof workout.id === "string") &&
    typeof workout.name === "string" &&
    typeof workout.image === "string" &&
    typeof workout.equipment === "string" &&
    typeof workout.difficulty === "string" &&
    typeof workout.description === "string" &&
    typeof workout.reps === "string" &&
    Number.isFinite(workout.duration) &&
    Number.isFinite(workout.caloriesBurned) &&
    Number.isFinite(workout.sets) &&
    Number.isFinite(workout.rating) &&
    Array.isArray(workout.muscleGroups) &&
    workout.muscleGroups.every((group) => typeof group === "string") &&
    Array.isArray(workout.instructions) &&
    workout.instructions.every((instruction) => typeof instruction === "string")
  );
}

export async function getWorkouts() {
  const response = await fetch(WORKOUTS_API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load workouts: ${response.status}`);
  }

  const workouts = await response.json();

  if (!Array.isArray(workouts) || !workouts.every(isWorkout)) {
    throw new Error("The workout API returned invalid workout data.");
  }

  return workouts;
}
