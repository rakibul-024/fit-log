
const getWorkoutList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.workouts)) {
    return payload.workouts;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
};

export const loadWorkouts = async () => {
  const response = await fetch( "https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Workout API returned ${response.status}`);
  };

  const payload = await response.json();
  const workouts = getWorkoutList(payload);

  if (!Array.isArray(workouts) || workouts.length === 0) {
    throw new Error("Workout API returned no usable list");
  }

  return { workouts };
}
