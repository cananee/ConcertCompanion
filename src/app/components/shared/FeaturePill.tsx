import { Music, Navigation } from "lucide-react";

type PillType = "song" | "nav" | "ar";

interface FeaturePillProps {
  type: PillType;
  label: string;
  sublabel?: string;
  onPress?: () => void;
}

const PILL_CONFIG = {
  song: {
    icon: <Music className="w-3.5 h-3.5 text-[#7B5EA7]" />,
    cls: "bg-[#7B5EA7]/20 border-[#7B5EA7]/30",
  },
  nav: {
    icon: <Navigation className="w-3.5 h-3.5 text-[#4CAF77]" />,
    cls: "bg-[#4CAF77]/20 border-[#4CAF77]/30",
  },
  ar: {
    icon: <span className="text-xs font-bold text-white/70">AR</span>,
    cls: "bg-white/10 border-white/20",
  },
};

export function FeaturePill({ type, label, sublabel, onPress }: FeaturePillProps) {
  const { icon, cls } = PILL_CONFIG[type];

  return (
    <button
      onClick={onPress}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-sm text-white ${cls} active:scale-95 transition-transform`}
    >
      {icon}
      <span className="max-w-[160px] truncate text-xs">{label}</span>
      {sublabel && <span className="text-white/40 text-xs">{sublabel}</span>}
    </button>
  );
}
