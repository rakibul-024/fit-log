import React from "react";
import HeroBanner from "./components/HeroBanner";
import FitData from "./FitData/page";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FitData></FitData>
    
      <div id="library" className="scroll-mt-6" aria-hidden="true" />
    </>
  );
}
