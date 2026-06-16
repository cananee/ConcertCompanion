import { WifiOff, MapPin, Users, Bell, Battery, X } from "lucide-react";
import { LiveStatusBadge } from "./shared";

interface OfflineStateProps {
  onClose: () => void;
}

const FEATURES = [
  {
    id: "group",
    icon: Users,
    label: "Group Tracker",
    status: "degraded" as const,
    detail: "Last known positions · 4 min ago",
    note: "Updates resume automatically when signal returns.",
  },
  {
    id: "map",
    icon: MapPin,
    label: "Festival Map",
    status: "live" as const,
    detail: "GPS + downloaded offline map active",
    note: "Wayfinding and stage locations work without signal.",
  },
  {
    id: "notify",
    icon: Bell,
    label: "Push Notifications",
    status: "offline" as const,
    detail: "Needs internet connection",
    note: "Rally pins and friend alerts resume when signal returns.",
  },
];

const STATUS_STYLE = {
  live:     { bg: "bg-[#4CAF77]/10", border: "border-[#4CAF77]/25", icon: "text-[#4CAF77]" },
  degraded: { bg: "bg-[#F5A623]/10", border: "border-[#F5A623]/25", icon: "text-[#F5A623]" },
  offline:  { bg: "bg-white/4",      border: "border-white/10",     icon: "text-[#A0A0B8]" },
};

export function OfflineState({ onClose }: OfflineStateProps) {
  return (
    <div className="absolute inset-0 bg-[#0A0A0F] z-50 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F5A623]/15 border border-[#F5A623]/25 flex items-center justify-center">
            <WifiOff className="w-5 h-5 text-[#F5A623]" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Offline mode</h1>
            <p className="text-[#A0A0B8] text-sm">Still on your side</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 bg-white/10 border border-white/10 rounded-full flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Calm message */}
      <div className="mx-6 mb-6 px-5 py-4 bg-[#141420] rounded-2xl border border-white/8">
        <p className="text-white/85 text-sm leading-relaxed">
          No network detected. Your core features are still running on the last known data.
          We'll sync as soon as signal returns — no action needed.
        </p>
      </div>

      {/* Feature cards */}
      <div className="px-6 space-y-3">
        <p className="text-[#A0A0B8] text-xs uppercase tracking-wider font-medium">Feature status</p>

        {FEATURES.map(feature => {
          const style = STATUS_STYLE[feature.status];
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className={`p-4 rounded-2xl border ${style.bg} ${style.border}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${style.icon}`} />
                  <div>
                    <p className="text-white font-medium text-sm">{feature.label}</p>
                    <p className="text-[#A0A0B8] text-xs mt-0.5">{feature.detail}</p>
                  </div>
                </div>
                <LiveStatusBadge status={feature.status} size="sm" />
              </div>
              <p className="text-[#A0A0B8] text-xs ml-8 leading-relaxed">{feature.note}</p>
            </div>
          );
        })}

        {/* Battery */}
        <div className="p-4 rounded-2xl border border-white/8 bg-[#141420] flex items-center gap-3">
          <Battery className="w-5 h-5 text-[#4CAF77] flex-shrink-0" />
          <div>
            <p className="text-white text-sm font-medium">Battery saver active</p>
            <p className="text-[#A0A0B8] text-xs mt-0.5">GPS polling reduced to extend battery life</p>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="px-6 py-6 mt-auto">
        <p className="text-[#A0A0B8] text-xs text-center leading-relaxed">
          ConcertCompanion never records, stores, or streams camera footage.
        </p>
      </div>
    </div>
  );
}
