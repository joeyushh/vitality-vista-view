
// Dashboard-style entry page: Food and Workout trackers, side-by-side, split screen, navigation at the top.

import FoodTracker from "@/components/FoodTracker";
import WorkoutTracker from "@/components/WorkoutTracker";

const NAV_LINKS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Food Tracker", href: "#food" },
  { label: "Workout Tracker", href: "#workouts" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full flex items-center px-10 py-4 shadow mb-8 bg-white/80 backdrop-blur-sm z-10">
        <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-800 via-blue-600 to-green-600 bg-clip-text text-transparent mr-10 select-none">
          TrackIt
        </div>
        <ul className="flex gap-2 text-base font-medium">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className={`story-link px-3 py-1 rounded ${
                  link.active
                    ? "bg-blue-100 text-blue-800 shadow"
                    : "hover:bg-blue-50 text-gray-600"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto text-sm text-gray-400 hidden md:block">
          {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </nav>

      <main className="flex flex-1 gap-8 px-6 pb-8" style={{maxWidth: 1600, width: "100%", margin: "0 auto"}}>
        {/* Desktop split grid, stack on mobile */}
        <section className="w-full md:w-1/2 mb-8 md:mb-0">
          <FoodTracker />
        </section>
        <section className="w-full md:w-1/2">
          <WorkoutTracker />
        </section>
      </main>
      <footer className="w-full text-center py-3 text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} TrackIt. Built with Lovable.
      </footer>
    </div>
  );
}
