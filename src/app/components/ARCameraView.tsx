import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";

interface ARCameraViewProps {
  friendName?: string;
  friendAvatar?: string;
  distance?: string;
  onClose?: () => void;
  onReunited?: () => void;
}

export function ARCameraView({
  friendName = "Friend",
  friendAvatar = "🎸",
  distance = "140m",
  onClose,
  onReunited,
}: ARCameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
      })
      .catch(() => setCameraError(true));

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => onReunited?.(), 5000);
    return () => clearTimeout(t);
  }, [onReunited]);

  return (
    <div className="absolute inset-0 z-50 bg-zinc-950 overflow-hidden">
      {/* Live camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Simulated fallback if camera permission denied */}
      {cameraError && (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950">
          <div className="absolute bottom-32 left-0 right-0 h-32 bg-zinc-800/40" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-600/30" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-lg">
            <Camera className="w-3 h-3 text-white/40" />
            <span className="text-white/40 text-xs">Camera unavailable</span>
          </div>
        </div>
      )}

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />

      {/* Corner guides */}
      <div className="absolute top-14 left-6 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl pointer-events-none" />
      <div className="absolute top-14 right-16 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr pointer-events-none" />
      <div className="absolute bottom-28 left-6 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl pointer-events-none" />
      <div className="absolute bottom-28 right-6 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br pointer-events-none" />

      {/* AR overlays */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
        {/* Distance badge */}
        <div className="mt-16">
          <div className="px-5 py-2.5 bg-lime-400 rounded-full text-black shadow-lg shadow-lime-400/40 flex items-center gap-2">
            <span className="text-lg">{friendAvatar}</span>
            <span className="text-sm font-bold">→ {friendName} · {distance}</span>
          </div>
        </div>

        {/* Directional arrow */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "32px solid transparent",
                borderRight: "32px solid transparent",
                borderBottom: "64px solid rgba(132,204,22,0.85)",
                filter: "drop-shadow(0 0 16px rgba(132,204,22,0.6))",
                animation: "bounce 1.2s infinite",
              }}
            />
            <div className="w-0.5 h-16 bg-gradient-to-b from-lime-400/60 to-transparent" />
          </div>
        </div>

        {/* Bottom instruction */}
        <div className="mb-36 px-6 w-full pointer-events-auto">
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-white/70 text-sm">Walk straight ahead</p>
            <p className="text-white text-base font-semibold mt-0.5">Finding {friendName}…</p>
          </div>
        </div>
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-14 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
