import { WifiOff, MapPin, Users, Music } from "lucide-react";

type FeatureId = "map" | "group" | "lyrics";
type FeatureStatus = "ok" | "degraded" | "offline";

interface OfflineBannerProps {
  features?: { feature: FeatureId; status: FeatureStatus }[];
  onTap?: () => void;
}

const FEATURE_ICONS: Record<FeatureId, React.ReactNode> = {
  map: <MapPin className="w-3 h-3" />,
  group: <Users className="w-3 h-3" />,
  lyrics: <Music className="w-3 h-3" />,
};

const STATUS_COLOR: Record<FeatureStatus, string> = {
  ok: "text-[#4CAF77]",
  degraded: "text-[#F5A623]",
  offline: "text-white/30",
};

const DEFAULT_FEATURES: { feature: FeatureId; status: FeatureStatus }[] = [
  { feature: "map", status: "ok" },
  { feature: "group", status: "degraded" },
  { feature: "lyrics", status: "offline" },
];

export function OfflineBanner({ features = DEFAULT_FEATURES, onTap }: OfflineBannerProps) {
  return (
    <button
      onClick={onTap}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#F5A623]/15 border border-[#F5A623]/30 backdrop-blur-md rounded-2xl"
    >
      <WifiOff className="w-3 h-3 text-[#F5A623]" />
      <span className="text-[#F5A623] text-xs font-medium">Offline</span>
      <div className="w-px h-3 bg-white/20" />
      <div className="flex items-center gap-1.5">
        {features.map(f => (
          <span key={f.feature} className={STATUS_COLOR[f.status]}>
            {FEATURE_ICONS[f.feature]}
          </span>
        ))}
      </div>
    </button>
  );
}
