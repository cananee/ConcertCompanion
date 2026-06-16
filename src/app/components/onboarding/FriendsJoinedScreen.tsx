import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const friends = [
  { name: "Mert", avatar: "🎸", color: "bg-sky-400" },
  { name: "Lina", avatar: "🎭", color: "bg-pink-400" },
  { name: "Deniz", avatar: "🎪", color: "bg-violet-400" },
];

interface FriendsJoinedScreenProps {
  groupName: string;
  onContinue: () => void;
}

export function FriendsJoinedScreen({ groupName, onContinue }: FriendsJoinedScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Stagger friend avatars in
    friends.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), 400 + i * 600);
    });
    // Show CTA after all avatars shown
    setTimeout(() => setShowCTA(true), 400 + friends.length * 600 + 400);
  }, []);

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col items-center justify-center px-8">
      {/* Notification pill at top */}
      <div className="mb-10 flex items-center gap-2 px-4 py-2 bg-lime-400/15 border border-lime-400/30 rounded-full">
        <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
        <span className="text-sm text-lime-400">Group activity</span>
      </div>

      {/* Group name */}
      <h2 className="text-2xl text-zinc-300 mb-1 text-center">
        3 friends joined
      </h2>
      <h1 className="text-4xl text-white mb-12 text-center">
        {groupName}
      </h1>

      {/* Friend avatars appearing one by one */}
      <div className="flex items-end gap-4 mb-14">
        {friends.map((friend, i) => (
          <div
            key={friend.name}
            className={`flex flex-col items-center gap-2 transition-all duration-500 ${
              visibleCount > i ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-75"
            }`}
          >
            {/* Joined badge */}
            <div className="px-2 py-0.5 bg-lime-400/20 border border-lime-400/40 rounded-full">
              <span className="text-lime-400 text-xs">joined</span>
            </div>

            {/* Avatar */}
            <div className={`w-16 h-16 rounded-full ${friend.color} flex items-center justify-center text-3xl border-4 border-zinc-900 shadow-lg`}>
              {friend.avatar}
            </div>

            {/* Name */}
            <span className="text-sm text-zinc-300">{friend.name}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className={`w-full transition-all duration-500 ${
          showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={onContinue}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
        >
          <span>See your crew on the map</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
