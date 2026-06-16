import { ChevronRight, Navigation, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface MapPreviewProps {
  onNext: () => void;
}

export function MapPreview({ onNext }: MapPreviewProps) {
  const [activeUsers, setActiveUsers] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => (prev % 5) + 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const demoFriends = [
    { id: 1, name: "Alex", x: 45, y: 35, avatar: "🎸" },
    { id: 2, name: "Sam", x: 60, y: 50, avatar: "🎭" },
    { id: 3, name: "Jordan", x: 30, y: 60, avatar: "🎨" },
  ];

  return (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="flex-1 relative bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.15),transparent_70%)]"></div>

        <div className="absolute top-8 left-0 right-0 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/20 backdrop-blur-lg border border-lime-400/30 rounded-full">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-lime-400">{activeUsers} friends nearby</span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {demoFriends.map(friend => (
            <div
              key={friend.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${friend.x}%`,
                top: `${friend.y}%`,
              }}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center text-2xl border-4 border-lime-300 shadow-lg shadow-lime-400/50">
                  {friend.avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900/95 backdrop-blur-lg border border-zinc-700 rounded-lg px-3 py-1">
                  <p className="text-white text-sm">{friend.name}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping"></div>
              <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-lg text-xs">
                  <Navigation className="w-3 h-3" />
                  <span>You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-zinc-950">
        <h2 className="text-2xl mb-3 text-center">See Everyone in Real-Time</h2>
        <p className="text-zinc-400 text-center mb-6">
          Know exactly where your friends are, how far away, and when they last checked in
        </p>

        <button
          onClick={onNext}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
