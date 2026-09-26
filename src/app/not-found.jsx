import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center text-white">
      <p className="text-xs font-bold tracking-[0.16em] text-[#ccff00]">404</p>
      <h1 className="display-heading mt-2 text-4xl uppercase">Workout not found</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-400">That page doesn&apos;t match a workout in the FitLog library.</p>
      <Link href="/" className="mt-6 inline-flex min-h-10 items-center rounded-full bg-[#ccff00] px-5 text-xs font-bold text-black hover:bg-[#b7e600]">Go to workouts</Link>
    </section>
  );
}
