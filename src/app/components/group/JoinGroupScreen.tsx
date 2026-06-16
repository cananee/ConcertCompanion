import { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface JoinGroupScreenProps {
  onBack: () => void;
  onJoin: (code: string) => void;
}

export function JoinGroupScreen({ onBack, onJoin }: JoinGroupScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const formatCode = (value: string) =>
    value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6) return;

    setError(null);
    setJoining(true);

    // Small delay to feel like a network lookup
    await new Promise((r) => setTimeout(r, 600));

    const raw = localStorage.getItem(`group_code_${trimmed}`);
    if (!raw) {
      setError("No group found with this code. Ask the group creator to check their invite code.");
      setJoining(false);
      return;
    }

    setJoining(false);
    onJoin(trimmed);
  };

  return (
    <div className="h-full bg-[#0A0A0F] text-white flex flex-col">
      <div className="p-6 pt-12">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#141420] border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-28 h-28 mb-8 bg-gradient-to-br from-[#7B5EA7]/20 to-lime-400/20 rounded-3xl flex items-center justify-center border border-white/10">
          <span className="text-6xl">🔑</span>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-center">Join a Group</h1>
        <p className="text-[#A0A0B8] text-center mb-10 max-w-sm">
          Enter the 6-character code your friend shared with you
        </p>

        <div className="w-full max-w-sm mb-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(formatCode(e.target.value)); setError(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            placeholder="XXXXXX"
            autoFocus
            className={`w-full px-6 py-5 bg-[#141420] border rounded-2xl text-white text-center text-2xl tracking-[0.35em] placeholder-[#A0A0B8]/30 focus:outline-none transition-colors ${
              error ? "border-[#E05C5C]" : code.length === 6 ? "border-lime-400" : "border-white/10 focus:border-[#7B5EA7]"
            }`}
          />
          {error && (
            <div className="flex items-start gap-2 mt-3 p-3 bg-[#E05C5C]/10 border border-[#E05C5C]/30 rounded-xl">
              <AlertCircle className="w-4 h-4 text-[#E05C5C] shrink-0 mt-0.5" />
              <p className="text-[#E05C5C] text-sm">{error}</p>
            </div>
          )}
          {!error && (
            <p className="text-xs text-[#A0A0B8] mt-2 text-center">
              {code.length}/6 characters
            </p>
          )}
        </div>

        <button
          onClick={handleJoin}
          disabled={code.length !== 6 || joining}
          className={`w-full max-w-sm px-8 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
            code.length === 6 && !joining
              ? "bg-lime-400 text-black shadow-lg shadow-lime-400/30 active:scale-[0.98]"
              : "bg-[#141420] text-[#A0A0B8] border border-white/10 cursor-not-allowed"
          }`}
        >
          {joining ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Looking up group…
            </>
          ) : "Join Group"}
        </button>

        <button
          onClick={onBack}
          className="mt-4 w-full max-w-sm px-8 py-4 bg-transparent border border-white/10 text-[#A0A0B8] rounded-2xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
