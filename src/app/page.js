import { Suspense } from "react";
import HeroBanner from "./components/HeroBanner";
import WorkoutLibraryLoading from "./components/WorkoutLibraryLoading";
import FitData from "./FitData/page";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Suspense fallback={<WorkoutLibraryLoading />}>
        <FitData />
      </Suspense>
    </>
  );
};

export default Home;
