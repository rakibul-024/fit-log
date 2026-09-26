# FitLog

**A focused workout library and daily planner.** Find a lift, check its instructions, and keep track of what you plan to do today.

## Built with

- Next.js 16 App Router and React 19
- Tailwind CSS 4 and DaisyUI
- Lucide React icons
- React Toastify notifications
- [FitLog Workout API](https://api.abcz.workers.dev/api/fitlog)
- React Context for the current workout plan
- Built-in workout data that keeps the library available when the API is down

## What you can do

1. Browse a responsive library of workouts and view their equipment, stats, and instructions.
2. Add up to five exercises to today's plan or save workouts for later.
3. Track completed workouts and see live totals for exercises, minutes, and calories.
4. Search workouts by name or muscle group, and sort them by duration, calories, or rating.
5. See plan and saved-workout counts update as you add or remove exercises.
6. Get clear feedback when an action succeeds or needs attention, with loading and not-found pages.
7. Keep browsing and viewing workout details when the live API is unavailable.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The workout plan is held in React state and resets when the page is refreshed.

## Production build

```bash
npm run build
npm run start
```
