import FitDataCard from "../components/FitDataCard";
import { loadWorkouts } from "../data/workouts";

const FitData = async () => {
  const { workouts } = await loadWorkouts();

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="scroll-mt-6 px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2
            id="library-heading"
            className="text-2xl font-black uppercase tracking-wider text-white"
          >
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {workouts.map((item) => (
            <FitDataCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitData;