import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";
import { loadWorkouts } from "../../data/workouts";

const FitDataDetailsPage = async ({ params }) => {
  const { fitDataId } = await params;
  const { workouts } = await loadWorkouts();
  const workout = workouts.find((item) => String(item.id) === String(fitDataId));

  if (!workout) {
    notFound();
  }

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <section className="px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-xl border border-[#252833] bg-[#14161d] md:aspect-auto md:min-h-[620px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 620px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="display-heading text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <dl className="mt-5 overflow-hidden rounded-xl border border-[#252833] bg-[#12141a]">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-[#252833] px-4 py-3 last:border-b-0"
                >
                  <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    {label}
                  </dt>
                  <dd className="text-right text-xs text-gray-100">{value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-6" aria-labelledby="instructions-heading">
              <h2
                id="instructions-heading"
                className="text-sm font-bold uppercase tracking-wide text-white"
              >
                Instructions
              </h2>
              <ol className="mt-3 space-y-2">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="flex gap-2.5 text-xs leading-5 text-gray-400"
                  >
                    <span className="shrink-0 text-gray-500">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-6">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitDataDetailsPage;
