import { Outlet, NavLink } from "react-router";
import { Users, Compass, Calendar, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";

export function Layout() {
  const { hasCompletedOnboarding, completeOnboarding } = useApp();

  if (!hasCompletedOnboarding) {
    return (
      <div className="h-screen w-full max-w-[390px] mx-auto bg-black overflow-hidden">
        <OnboardingFlow onComplete={completeOnboarding} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-[390px] mx-auto flex flex-col bg-black text-white relative overflow-hidden">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[#0E0E18]/95 backdrop-blur-xl border-t border-white/8"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex justify-around items-center h-16 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-lime-400" : "text-zinc-400"
              }`
            }
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">People</span>
          </NavLink>

          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-lime-400" : "text-zinc-400"
              }`
            }
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-lime-400" : "text-zinc-400"
              }`
            }
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">My Events</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-lime-400" : "text-zinc-400"
              }`
            }
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
