"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { ToastContainer, toast } from "react-toastify";

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

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateWorkouts = useCallback((update) => {
    const nextWorkouts = update(getSnapshot());
    if (nextWorkouts === workouts) {
      return true;
    }

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
      return true;
    } catch (error) {
      console.error("Could not save FitLog workouts.", error);
      return false;
    }
  }, []);

  const addToPlan = useCallback((workout) => {
    const current = getSnapshot();
    if (current.planned.some((item) => item.id === workout.id)) {
      toast.info("This workout is already in today’s plan.");
      return;
    }
    if (current.planned.length >= PLAN_LIMIT) {
      toast.warning("Your plan is full. Finish a lift before adding another.");
      return;
    }

    const saved = updateWorkouts((state) => ({
      ...state,
      planned: [...state.planned, workout],
    }));
    if (saved) {
      toast.success("Added to today’s plan.");
    } else {
      toast.error("Added, but could not save on this device.");
    }
  }, [updateWorkouts]);

  const saveForLater = useCallback((workout) => {
    if (getSnapshot().saved.some((item) => item.id === workout.id)) {
      toast.info("This workout is already saved.");
      return;
    }

    const saved = updateWorkouts((state) => ({
      ...state,
      saved: [...state.saved, workout],
    }));
    if (saved) {
      toast.success("Workout saved for later.");
    } else {
      toast.error("Saved, but could not save on this device.");
    }
  }, [updateWorkouts]);

  const markAsDone = useCallback((workoutId) => {
    if (getSnapshot().doneIds.includes(workoutId)) {
      toast.info("This workout is already marked as done.");
      return;
    }

    const saved = updateWorkouts((state) => ({
      ...state,
      doneIds: [...state.doneIds, workoutId],
    }));
    if (saved) {
      toast.success("Workout marked as done.");
    } else {
      toast.error("Marked done, but could not save on this device.");
    }
  }, [updateWorkouts]);

  const removeFromPlan = useCallback((workoutId) => {
    if (!getSnapshot().planned.some((item) => item.id === workoutId)) {
      return;
    }

    const saved = updateWorkouts((state) => ({
      ...state,
      planned: state.planned.filter((item) => item.id !== workoutId),
      doneIds: state.doneIds.filter((id) => id !== workoutId),
    }));
    if (saved) {
      toast.success("Removed from today’s plan.");
    } else {
      toast.error("Removed, but could not save on this device.");
    }
  }, [updateWorkouts]);

  const removeFromSaved = useCallback((workoutId) => {
    if (!getSnapshot().saved.some((item) => item.id === workoutId)) {
      return;
    }

    const saved = updateWorkouts((state) => ({
      ...state,
      saved: state.saved.filter((item) => item.id !== workoutId),
    }));
    if (saved) {
      toast.success("Removed from saved workouts.");
    } else {
      toast.error("Removed, but could not save on this device.");
    }
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
  }), [
    currentWorkouts,
    addToPlan,
    saveForLater,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  ]);

  return (
    <WorkoutPlanContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="dark"
        toastClassName="fitlog-toast"
      />
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
