"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "fitlog-workout-plan";
const PLAN_LIMIT = 5;
const EMPTY_WORKOUTS = {
  planned: [],
  saved: [],
  doneIds: [],
  isLoaded: false,
};
const listeners = new Set();
let workouts = EMPTY_WORKOUTS;
let hasReadStorage = false;
const WorkoutPlanContext = createContext(null);

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function readSavedWorkouts() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return { ...EMPTY_WORKOUTS, isLoaded: true };
    }

    const parsedValue = JSON.parse(storedValue);
    if (
      !parsedValue ||
      !Array.isArray(parsedValue.planned) ||
      !Array.isArray(parsedValue.saved)
    ) {
      throw new Error("Saved workout data has an invalid format.");
    }

    return {
      planned: parsedValue.planned.slice(0, PLAN_LIMIT),
      saved: parsedValue.saved,
      doneIds: Array.isArray(parsedValue.doneIds) ? parsedValue.doneIds : [],
      isLoaded: true,
    };
  } catch (error) {
    console.error("Could not load saved FitLog workouts.", error);
    return { ...EMPTY_WORKOUTS, isLoaded: true };
  }
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_WORKOUTS;
  }

  if (!hasReadStorage) {
    workouts = readSavedWorkouts();
    hasReadStorage = true;
  }

  return workouts;
}

function getServerSnapshot() {
  return EMPTY_WORKOUTS;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function handleStorageChange(event) {
  if (event.key !== STORAGE_KEY && event.key !== null) {
    return;
  }

  workouts = readSavedWorkouts();
  hasReadStorage = true;
  notifyListeners();
}

export function WorkoutPlanProvider({ children }) {
  const currentWorkouts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const updateWorkouts = useCallback((update) => {
    const nextWorkouts = update(getSnapshot());
    if (nextWorkouts === workouts) return;

    workouts = { ...nextWorkouts, isLoaded: true };
    hasReadStorage = true;
    notifyListeners();

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          planned: workouts.planned,
          saved: workouts.saved,
          doneIds: workouts.doneIds,
        }),
      );
    } catch (error) {
      console.error("Could not save FitLog workouts.", error);
      setToast("Your changes could not be saved on this device.");
    }
  }, []);

  const addToPlan = useCallback((workout) => {
    const current = getSnapshot();
    if (current.planned.some((item) => item.id === workout.id)) {
      setToast("This workout is already in today’s plan.");
    } else if (current.planned.length >= PLAN_LIMIT) {
      setToast("Your plan is full. Finish a lift before adding another.");
    } else {
      updateWorkouts((state) => ({
        ...state,
        planned: [...state.planned, workout],
      }));
      setToast("Added to today’s plan.");
    }
  }, [updateWorkouts]);

  const saveForLater = useCallback((workout) => {
    const alreadySaved = getSnapshot().saved.some((item) => item.id === workout.id);
    if (!alreadySaved) {
      updateWorkouts((state) => ({
        ...state,
        saved: [...state.saved, workout],
      }));
    }
    setToast(alreadySaved ? "This workout is already saved." : "Workout saved for later.");
  }, [updateWorkouts]);

  const markAsDone = useCallback((workoutId) => {
    updateWorkouts((state) => state.doneIds.includes(workoutId)
      ? state
      : { ...state, doneIds: [...state.doneIds, workoutId] });
    setToast("Workout marked as done.");
  }, [updateWorkouts]);

  const removeFromPlan = useCallback((workoutId) => {
    updateWorkouts((state) => ({
      ...state,
      planned: state.planned.filter((item) => item.id !== workoutId),
      doneIds: state.doneIds.filter((id) => id !== workoutId),
    }));
    setToast("Removed from today’s plan.");
  }, [updateWorkouts]);

  const removeFromSaved = useCallback((workoutId) => {
    updateWorkouts((state) => ({
      ...state,
      saved: state.saved.filter((item) => item.id !== workoutId),
    }));
    setToast("Removed from saved workouts.");
  }, [updateWorkouts]);

  const value = useMemo(() => ({
    planned: currentWorkouts.planned,
    saved: currentWorkouts.saved,
    doneIds: currentWorkouts.doneIds,
    isLoaded: currentWorkouts.isLoaded,
    addToPlan,
    saveForLater,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  }), [currentWorkouts, addToPlan, saveForLater, markAsDone, removeFromPlan, removeFromSaved]);

  return (
    <WorkoutPlanContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-4 bottom-6 z-100 flex justify-center"
      >
        {toast && (
          <p className="rounded-lg border border-[#343740] bg-[#17191f] px-4 py-3 text-sm text-white shadow-xl">
            {toast}
          </p>
        )}
      </div>
    </WorkoutPlanContext.Provider>
  );
}

export function useWorkoutPlan() {
  const context = useContext(WorkoutPlanContext);
  if (!context) {
    throw new Error("useWorkoutPlan must be used inside WorkoutPlanProvider.");
  }
  return context;
}
