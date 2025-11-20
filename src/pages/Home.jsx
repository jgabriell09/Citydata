import IntroSection from "../components/IntroSection";
import CityOverview from "../components/CityOverview";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">

      {}
      <IntroSection />

      {}
      <CityOverview />

    </div>
  );
}
