"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Flame,
  Search,
  Star,
  X,
} from "lucide-react";
import { useWorkoutPlan } from "./WorkoutPlanProvider";

const sortOptions = {
  duration: (a, b) => Number(a.duration) - Number(b.duration),
  calories: (a, b) => Number(a.caloriesBurned) - Number(b.caloriesBurned),
  rating: (a, b) => Number(a.rating) - Number(b.rating),
};

function Stat({ icon: Icon, children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}>
      <Icon aria-hidden="true" className="size-3.5 text-[#ccff00]" />
      {children}
    </span>
  );
}

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("planned");
  const [sortBy, setSortBy] = useState("duration");
  const [search, setSearch] = useState("");
  const {
    planned,
    saved,
    doneIds,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useWorkoutPlan();
  const currentItems = activeTab === "planned" ? planned : saved;
  const query = search.trim().toLowerCase();
  const items = useMemo(() => {
    return currentItems
      .filter((workout) => {
        const searchable = [workout.name, ...workout.muscleGroups]
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      })
      .sort(sortOptions[sortBy]);
  }, [currentItems, query, sortBy]);
  const minutes = planned.reduce((total, workout) => total + Number(workout.duration || 0), 0);
  const calories = planned.reduce((total, workout) => total + Number(workout.caloriesBurned || 0), 0);

  return (
    <section className="min-h-[60vh] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="display-heading text-3xl uppercase leading-tight tracking-wide sm:text-4xl">
            MY PLAN
          </h1>
          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        <section
          aria-label="Today's plan summary"
          className="mb-6 grid grid-cols-1 divide-y divide-[#242630] rounded-xl border border-[#242630] bg-[#12141a] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <div className="px-5 py-4 sm:py-5">
            <p className="text-[10px] text-gray-400">Exercises</p>
            <p className="display-heading mt-1 text-3xl leading-none text-[#ccff00]">{planned.length}</p>
          </div>
          <div className="px-5 py-4 sm:py-5">
            <p className="text-[10px] text-gray-400">Minutes</p>
            <p className="display-heading mt-1 text-3xl leading-none text-white">{minutes}</p>
          </div>
          <div className="px-5 py-4 sm:py-5">
            <p className="text-[10px] text-gray-400">Calories</p>
            <p className="display-heading mt-1 text-3xl leading-none text-white">{calories}</p>
          </div>
        </section>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="My workout lists" className="flex w-fit gap-1 rounded-lg border border-[#242630] bg-[#111216] p-1">
            <button
              id="planned-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "planned"}
              aria-controls="workout-list"
              onClick={() => setActiveTab("planned")}
              className={`rounded-md px-3.5 py-2 text-[11px] font-semibold transition-colors ${activeTab === "planned" ? "bg-[#20232b] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Today&apos;s Plan
            </button>
            <button
              id="saved-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              aria-controls="workout-list"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-3.5 py-2 text-[11px] font-semibold transition-colors ${activeTab === "saved" ? "bg-[#20232b] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Saved
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <label className="relative min-w-0 sm:w-48">
              <Search aria-hidden="true" className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-500" />
              <span className="sr-only">Search workouts by name or tag</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search workouts"
                className="h-9 w-full rounded-lg border border-[#242630] bg-[#12141a] pl-9 pr-3 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00]"
              />
            </label>
            <label className="flex items-center gap-2 text-[10px] text-gray-400">
              Sort By
              <span className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-9 appearance-none rounded-lg border border-[#242630] bg-[#12141a] py-0 pl-3 pr-8 text-[11px] text-gray-200 outline-none transition-colors hover:border-[#3b414d] hover:bg-[#181a21] focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]"
                >
                  <option className="bg-[#12141a] text-gray-200" value="duration">Duration</option>
                  <option className="bg-[#12141a] text-gray-200" value="calories">Calories</option>
                  <option className="bg-[#12141a] text-gray-200" value="rating">Rating</option>
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌄</span>
              </span>
            </label>
          </div>
        </div>

        <div id="workout-list" role="tabpanel" aria-labelledby={activeTab === "planned" ? "planned-tab" : "saved-tab"}>
          {items.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-[#30323b] bg-[#0e0f12] px-5 py-12 text-center">
              <h2 className="display-heading text-lg uppercase text-white">NOTHING HERE YET</h2>
              <p className="mt-1 max-w-sm text-[11px] text-gray-400">
                {query ? "No workouts match your search. Try another name or tag." : "Browse the library and add a lift to get today moving."}
              </p>
              {!query && (
                <Link href="/#library" className="mt-4 inline-flex min-h-9 items-center rounded-full bg-[#ccff00] px-5 text-[10px] font-bold text-black transition-colors hover:bg-[#b7e600]">
                  Go to workouts
                </Link>
              )}
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((workout) => {
                const isDone = doneIds.includes(workout.id);
                return (
                  <li key={workout.id} className={`flex min-w-0 flex-col gap-3 rounded-xl border bg-[#12141a] p-3 sm:flex-row sm:items-center sm:gap-4 ${isDone ? "border-[#303a19]" : "border-[#242630]"}`}>
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[#1a1c23] sm:h-15 sm:w-27">
                      <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 639px) 100vw, 108px" className="object-cover object-top" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-xs font-bold uppercase text-white">{workout.name}</h2>
                      <p className="mt-0.5 truncate text-[10px] text-gray-400">{workout.equipment}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-300">
                        <Stat icon={Clock3}>{workout.duration} min</Stat>
                        <Stat icon={Flame}>{workout.caloriesBurned} kcal</Stat>
                        <Stat icon={Star}>{workout.rating}</Stat>
                        {isDone && <span className="font-semibold text-[#ccff00]">DONE</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                      <Link href={`/FitData/${workout.id}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#343740] px-3.5 text-[10px] text-gray-200 transition-colors hover:bg-[#1a1c23]">
                        View Details <ArrowUpRight aria-hidden="true" className="size-3" />
                      </Link>
                      {activeTab === "planned" && (
                        <button type="button" disabled={isDone} onClick={() => markAsDone(workout.id)} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 text-[10px] font-bold text-black transition-colors hover:bg-[#b7e600] disabled:cursor-default disabled:bg-[#252a19] disabled:text-[#ccff00]">
                          {isDone ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : <Check aria-hidden="true" className="size-3.5" />}
                          {isDone ? "Done" : "Mark as Done"}
                        </button>
                      )}
                      <button type="button" aria-label={`Remove ${workout.name} from ${activeTab === "planned" ? "today’s plan" : "saved workouts"}`} onClick={() => activeTab === "planned" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)} className="inline-flex size-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-[#20232b] hover:text-white">
                        <X aria-hidden="true" className="size-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
