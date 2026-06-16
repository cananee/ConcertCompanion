import { ChevronRight } from "lucide-react";

interface PermissionScreenProps {
  title: string;
  description: string;
  illustration: string;
  onAllow: () => void;
  onSkip?: () => void;
}

export function PermissionScreen({ title, description, illustration, onAllow, onSkip }: PermissionScreenProps) {
  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-64 h-64 mb-8 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-3xl flex items-center justify-center">
          <span className="text-9xl">{illustration}</span>
        </div>

        <h2 className="text-3xl mb-4 text-center max-w-sm">{title}</h2>
        <p className="text-lg text-zinc-400 text-center max-w-md">{description}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onAllow}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
        >
          <span>Allow Permission</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full px-8 py-4 bg-transparent border border-zinc-700 text-white rounded-2xl"
          >
            Skip for Now
          </button>
        )}
      </div>
    </div>
  );
}
