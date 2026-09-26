export default function WorkoutLibraryLoading() {
  return (
    <section className="container mx-auto flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-4 text-center text-gray-400">
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-[#30323b] border-t-[#ccff00]"
      />
      <p className="mt-4 text-sm">workouts Data Loading...</p>
    </section>
  );
}
