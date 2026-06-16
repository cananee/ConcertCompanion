import { ChevronRight } from "lucide-react";

interface IntroScreenProps {
  onNext: () => void;
}

export function IntroScreen({ onNext }: IntroScreenProps) {
  return (
    <div className="h-full bg-black text-white flex flex-col items-center justify-between p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl flex items-center justify-center text-6xl shadow-2xl shadow-lime-400/30">
            📍
          </div>
          <h1 className="text-4xl mb-4 leading-tight">Never Lose Your Friends Again</h1>
          <p className="text-xl text-zinc-400 max-w-sm">
            Find your crew in real-time at any festival or event
          </p>
        </div>

        <div className="space-y-6 max-w-md">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-lime-400/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <h3 className="text-lg mb-1">Live Location</h3>
              <p className="text-sm text-zinc-400">See exactly where your friends are in real-time</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-lime-400/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="text-lg mb-1">Group Coordination</h3>
              <p className="text-sm text-zinc-400">Create meetup points and stay connected with your crew</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-lime-400/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎪</span>
            </div>
            <div>
              <h3 className="text-lg mb-1">Festival Mode</h3>
              <p className="text-sm text-zinc-400">Overlay event maps, stages, and schedules</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-md px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
      >
        <span>Start Exploring</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
