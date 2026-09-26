"use client";

import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PLAN_LIMIT = 5;
const WorkoutPlanContext = createContext(null);

export function WorkoutPlanProvider({ children }) {
  const [plan, setPlan] = useState({
    planned: [],
    saved: [],
    doneIds: [],
  });

  function addToPlan(workout) {
    if (plan.planned.some((item) => item.id === workout.id)) {
      toast.info("This workout is already in today’s plan.");
      return;
    }

    if (plan.planned.length >= PLAN_LIMIT) {
      toast.warning("Your plan is full. Finish a lift before adding another.");
      return;
    }

    setPlan({
      ...plan,
      planned: [...plan.planned, workout],
    });
    toast.success("Added to today’s plan.");
  }

  function saveForLater(workout) {
    if (plan.saved.some((item) => number(item.id) === number(workout.id))) {
      toast.info("This workout is already saved.");
      return;
    }

    setPlan({
      ...plan,
      saved: [...plan.saved, workout],
    });
    toast.success("Workout saved for later.");
  }

  function markAsDone(workoutId) {
    if (plan.doneIds.includes(workoutId)) {
      toast.info("This workout is already marked as done.");
      return;
    }

    setPlan({
      ...plan,
      doneIds: [...plan.doneIds, workoutId],
    });
    toast.success("Workout marked as done.");
  }

  function removeFromPlan(workoutId) {
    if (!plan.planned.some((item) => item.id === workoutId)) {
      return;
    }

    setPlan({
      ...plan,
      planned: plan.planned.filter((item) => item.id !== workoutId),
      doneIds: plan.doneIds.filter((id) => id !== workoutId),
    });
    toast.success("Removed from today’s plan.");
  }

  function removeFromSaved(workoutId) {
    if (!plan.saved.some((item) => item.id === workoutId)) {
      return;
    }

    setPlan({
      ...plan,
      saved: plan.saved.filter((item) => item.id !== workoutId),
    });
    toast.success("Removed from saved workouts.");
  }

  return (
    <WorkoutPlanContext.Provider
      value={{
        planned: plan.planned,
        saved: plan.saved,
        doneIds: plan.doneIds,
        addToPlan,
        saveForLater,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
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
