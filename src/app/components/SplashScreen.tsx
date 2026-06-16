import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-400 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
    <div className="relative w-full max-w-[390px] h-full flex flex-col items-center justify-center bg-zinc-950">
      {/* Logo mark */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-lime-400/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900 ring-2 ring-lime-400/40">
          {/* Waveform / festival icon */}
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="16" width="4" height="12" rx="2" fill="#84cc16" />
            <rect x="12" y="8" width="4" height="28" rx="2" fill="#84cc16" />
            <rect x="20" y="4" width="4" height="36" rx="2" fill="#84cc16" />
            <rect x="28" y="10" width="4" height="24" rx="2" fill="#84cc16" />
            <rect x="36" y="18" width="4" height="10" rx="2" fill="#84cc16" />
          </svg>
        </div>
      </div>

      {/* App name */}
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight text-white">
          fest<span className="text-lime-400">r</span>
        </h1>
        <p className="mt-1 text-sm text-zinc-500">find your crew</p>
      </div>

      {/* Loading dots */}
      <div className="mt-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
