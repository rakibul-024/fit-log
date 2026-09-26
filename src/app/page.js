import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div id="library" className="scroll-mt-6" aria-hidden="true" />
    </>
  );
}
