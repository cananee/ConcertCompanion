import { Map, Compass, Calendar, User } from "lucide-react";

interface EmptyStateScreenProps {
  onCreateGroup: () => void;
}

export function EmptyStateScreen({ onCreateGroup }: EmptyStateScreenProps) {
  return (
    <div className="h-full bg-black text-white flex flex-col">
      {/* Top bar */}
      

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-56 h-56 mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 rounded-full blur-3xl" />
          <div className="relative flex items-center justify-center h-full">
            <span className="text-9xl">🌍</span>
            <div className="absolute bottom-12 right-12 text-5xl">😔</div>
          </div>
        </div>

        <h1 className="text-3xl mb-4 text-center">Your world looks a little empty...</h1>
        <p className="text-base text-zinc-400 text-center max-w-sm mb-10">
          This map is meant to be shared. Create a group and invite your friends to see each other live.
        </p>

        <button
          onClick={onCreateGroup}
          className="w-full max-w-sm px-8 py-4 bg-lime-400 text-black rounded-2xl shadow-lg shadow-lime-400/30"
        >
          Create a Group
        </button>
      </div>

      <nav className="bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800">
        <div className="flex justify-around items-center h-20 px-2">
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-lime-400">
            <Map className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-400">
            <Compass className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-400">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">My Events</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-zinc-400">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
