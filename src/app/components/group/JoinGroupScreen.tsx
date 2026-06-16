import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface JoinGroupScreenProps {
  onBack: () => void;
  onJoin: (code: string) => void;
}

export function JoinGroupScreen({ onBack, onJoin }: JoinGroupScreenProps) {
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (code.trim()) {
      onJoin(code.trim().toUpperCase());
    }
  };

  const formatCode = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  };

  return (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-32 h-32 mb-8 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-3xl flex items-center justify-center">
          <span className="text-6xl">🔑</span>
        </div>

        <h1 className="text-3xl mb-3 text-center">Enter Code to Join a Group</h1>
        <p className="text-zinc-400 text-center mb-10 max-w-sm">
          Group creator should have shared you an invitation code
        </p>

        <div className="w-full max-w-sm mb-8">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(formatCode(e.target.value))}
            placeholder="CODE"
            autoFocus
            className="w-full px-6 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl text-white text-center text-2xl tracking-widest placeholder-zinc-600 focus:outline-none focus:border-lime-400"
          />
          <p className="text-xs text-zinc-500 mt-2 text-center">Enter the 6-character code</p>
        </div>

        <button
          onClick={handleJoin}
          disabled={code.length !== 6}
          className={`w-full max-w-sm px-8 py-4 rounded-2xl transition-all ${
            code.length === 6
              ? "bg-lime-400 text-black shadow-lg shadow-lime-400/30"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Join Group
        </button>
      </div>
    </div>
  );
}
