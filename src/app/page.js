import { Suspense } from "react";
import HeroBanner from "./components/HeroBanner";
import WorkoutLibraryLoading from "./components/WorkoutLibraryLoading";
import FitData from "./FitData/page";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Suspense fallback={<WorkoutLibraryLoading />}>
        <FitData />
      </Suspense>
    </>
  );
}
