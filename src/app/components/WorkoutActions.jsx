"use client";

import { BookmarkPlus, CalendarPlus } from "lucide-react";
import { useWorkoutPlan } from "./WorkoutPlanProvider";

export default function WorkoutActions({ workout }) {
  const { planned, addToPlan, saveForLater } = useWorkoutPlan();
  const planFull = planned.length >= 5;
  const alreadyPlanned = planned.some((item) => Number(item.id) === Number(workout.id));

  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <button type="button" disabled={planFull && !alreadyPlanned} onClick={() => addToPlan(workout)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 text-sm font-semibold text-black transition-colors hover:bg-[#b7e600] disabled:cursor-not-allowed disabled:bg-[#353a25] disabled:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]">
        <CalendarPlus aria-hidden="true" className="size-4" />
        {alreadyPlanned ? "Already in today’s plan" : "Add to today’s plan"}
      </button>
      <button type="button" onClick={() => saveForLater(workout)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#343740] px-5 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-[#17191f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]">
        <BookmarkPlus aria-hidden="true" className="size-4" />
        Save for later
      </button>
    </div>
  );
}
