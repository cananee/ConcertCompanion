import { ReactNode } from "react";
import { Camera } from "lucide-react";

interface AROverlayProps {
  topContent?: ReactNode;
  centerContent?: ReactNode;
  bottomContent?: ReactNode;
  onClose?: () => void;
}

export function AROverlay({ topContent, centerContent, bottomContent }: AROverlayProps) {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      {/* Simulated camera feed */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute bottom-32 left-0 right-0 h-32 bg-zinc-800/40" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-600/40" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-zinc-700/20" />
        {/* AR indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-black/30 rounded-lg">
          <Camera className="w-3 h-3 text-white/60" />
          <span className="text-white/60 text-xs font-medium">AR</span>
        </div>
        {/* Corner guides */}
        <div className="absolute top-12 left-6 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl" />
        <div className="absolute top-12 right-6 w-6 h-6 border-t-2 border-r-2 border-white/20 rounded-tr" />
        <div className="absolute bottom-28 left-6 w-6 h-6 border-b-2 border-l-2 border-white/20 rounded-bl" />
        <div className="absolute bottom-28 right-6 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br" />
      </div>

      {/* HUD slots */}
      <div className="absolute inset-0 flex flex-col items-center">
        <div className="mt-16 pointer-events-auto">
          {topContent}
        </div>
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          {centerContent}
        </div>
        <div className="mb-32 px-6 w-full pointer-events-auto">
          {bottomContent}
        </div>
      </div>
    </div>
  );
}
