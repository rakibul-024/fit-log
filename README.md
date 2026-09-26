# FITLOG

### Train with intent. Log every set.

FitLog is a responsive workout library and daily planner for finding your next lift, checking how to do it, and organizing the session ahead. Browse exercise details, build a plan of up to five workouts, and keep useful lifts saved for later.

---

## At a glance

- **Workout library** — Browse 12 exercises with images, muscle groups, equipment, duration, calories, and ratings.
- **Exercise details** — Check difficulty, sets, reps, and step-by-step instructions before training.
- **Today's plan** — Add up to five lifts, mark them done, and see exercise, time, and calorie totals update.
- **Saved workouts** — Keep exercises for later and manage them from the My Plan page.
- **Search and sort** — Find workouts by name or muscle group; sort by duration, calories, or rating.
- **Responsive layout** — Use the library and planner on mobile, tablet, or desktop.
- **Helpful feedback** — Toast notifications confirm actions, and loading, not-found, and error states guide the way.
- **Ready when the API isn't** — A built-in workout list keeps the library and exercise pages available when the live API is unavailable.

## Built with

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) and [React 19](https://react.dev/) | App framework, routing, and interactive UI |
| [Tailwind CSS 4](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) | Responsive styling |
| [Lucide React](https://lucide.dev/) | Interface icons |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Action notifications |
| [FitLog Workout API](https://api.abcz.workers.dev/api/fitlog) | Live workout data |
| React Context | Shared plan and saved-workout state |

## Get started

You'll need Node.js and npm installed.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful commands

```bash
npm run lint   # Check the code
npm run build  # Create a production build
npm run start  # Serve the production build
```

## Project notes

- Plan, saved, and completed workout state is held in React Context and resets when the page is refreshed.
- The workout library uses live API data when available and falls back to the built-in list otherwise.

---

**FITLOG** · Train hard, log honest.
