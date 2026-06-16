import { useEffect, useState } from "react";
import { Map, Compass, Calendar, User, Bell, ChevronRight } from "lucide-react";
import { DefaultMapLayer } from "../MapLayers";

interface SoloMapScreenProps {
  onNotificationTap: () => void;
}

export function SoloMapScreen({ onNotificationTap }: SoloMapScreenProps) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowNotification(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-full bg-black text-white flex flex-col overflow-hidden">
      {/* Top bar */}
      

      {/* Map area */}
      <div className="flex-1 relative bg-zinc-900 overflow-hidden">
        <DefaultMapLayer />

        {/* Ada's avatar — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-lime-400/30 animate-ping scale-150" />
            <div className="absolute inset-0 rounded-full bg-lime-400/10 animate-ping scale-200 animation-delay-300" />

            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center border-4 border-lime-300 shadow-xl shadow-lime-400/40 z-10">
              <span className="text-2xl">👩</span>
            </div>

            {/* You label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="flex items-center gap-1 bg-lime-400 px-2.5 py-1 rounded-lg text-xs text-black">
                <span>Ada · You</span>
              </div>
            </div>

            {/* Online dot */}
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 z-20" />
          </div>
        </div>

        {/* Push notification */}
        <div
          className={`absolute bottom-6 left-4 right-4 transition-all duration-500 ${
            showNotification ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={onNotificationTap}
            className="w-full bg-zinc-900/95 backdrop-blur-lg border border-zinc-700 rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-lime-400/20 flex items-center justify-center shrink-0">
              <span className="text-xl">🌍</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-sm">Your map looks a little lonely</p>
              <p className="text-zinc-400 text-xs mt-0.5">Create a group to see friends here</p>
            </div>
            <ChevronRight className="w-4 h-4 text-lime-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800">
        <div className="flex justify-around items-center h-20 px-2">
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-lime-400">
            <Map className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-500">
            <Compass className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-500">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">My Events</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-500">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
