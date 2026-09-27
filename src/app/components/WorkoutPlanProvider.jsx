"use client";

import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PLAN_LIMIT = 5;
const WorkoutPlanContext = createContext(null);

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState({
    planned: [],
    saved: [],
    doneIds: [],
  });

  const addWorkout = (workout) => {
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
  };

  const saveWorkout = (workout) => {
    if (plan.saved.some((item) => Number(item.id) === Number(workout.id))) {
      toast.info("This workout is already saved.");
      return;
    }

    setPlan({
      ...plan,
      saved: [...plan.saved, workout],
    });
    toast.success("Workout saved for later.");
  };

  const finishWorkout = (workoutId) => {
    if (plan.doneIds.includes(workoutId)) {
      toast.info("This workout is already marked as done.");
      return;
    }

    setPlan({
      ...plan,
      doneIds: [...plan.doneIds, workoutId],
    });
    toast.success("Workout marked as done.");
  };

  const removeWorkout = (workoutId) => {
    if (!plan.planned.some((item) => item.id === workoutId)) {
      return;
    }

    setPlan({
      ...plan,
      planned: plan.planned.filter((item) => item.id !== workoutId),
      doneIds: plan.doneIds.filter((id) => id !== workoutId),
    });
    toast.success("Removed from today’s plan.");
  };

  const removeSavedWorkout = (workoutId) => {
    if (!plan.saved.some((item) => item.id === workoutId)) {
      return;
    }

    setPlan({
      ...plan,
      saved: plan.saved.filter((item) => item.id !== workoutId),
    });
    toast.success("Removed from saved workouts.");
  };

  return (
    <WorkoutPlanContext.Provider
      value={{
        planned: plan.planned,
        saved: plan.saved,
        doneIds: plan.doneIds,
        addWorkout,
        saveWorkout,
        finishWorkout,
        removeWorkout,
        removeSavedWorkout,
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
};

export const usePlan = () => {
  const context = useContext(WorkoutPlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider.");
  }
  return context;
};
