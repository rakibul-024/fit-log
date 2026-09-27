"use client";

import { useEffect } from "react";

const AppError = ({ error, reset }) => {
  useEffect(() => {
    console.error("FitLog page failed to load.", error);
  }, [error]);

  return (
    <section className="container mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center text-white">
      <h1 className="text-2xl font-bold">We couldn&apos;t load this page.</h1>
      <p className="mt-2 max-w-md text-sm text-gray-400">
        Check your connection and try again. Your saved workouts are kept on
        this device.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-md bg-[#ccff00] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#b7e600]"
      >
        Try again
      </button>
    </section>
  );
};

export default AppError;
