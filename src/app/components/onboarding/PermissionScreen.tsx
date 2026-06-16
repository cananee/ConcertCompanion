import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface PermissionScreenProps {
  title: string;
  description: string;
  illustration: string;
  onAllow: () => void | Promise<void>;
  onSkip?: () => void;
}

export function PermissionScreen({ title, description, illustration, onAllow, onSkip }: PermissionScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleAllow = async () => {
    setLoading(true);
    try {
      await onAllow();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#141420] to-[#0A0A0F] text-white flex flex-col p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-48 h-48 mb-8 bg-gradient-to-br from-[#7B5EA7]/20 to-lime-400/15 rounded-3xl flex items-center justify-center border border-white/10">
          <span className="text-8xl">{illustration}</span>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center max-w-sm">{title}</h2>
        <p className="text-lg text-[#A0A0B8] text-center max-w-md">{description}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleAllow}
          disabled={loading}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-lime-400/30 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Allow</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            disabled={loading}
            className="w-full px-8 py-4 bg-transparent border border-white/15 text-[#A0A0B8] rounded-2xl disabled:opacity-50"
          >
            Skip for Now
          </button>
        )}
      </div>
    </div>
  );
}
