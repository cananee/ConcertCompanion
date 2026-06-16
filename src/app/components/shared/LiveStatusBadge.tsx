import { WifiOff } from "lucide-react";

type StatusType = "live" | "offline" | "low-power" | "degraded";

interface LiveStatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: "sm" | "md";
}

export function LiveStatusBadge({ status, label, size = "md" }: LiveStatusBadgeProps) {
  const sizeClasses = size === "sm"
    ? "px-2 py-0.5 text-xs gap-1"
    : "px-3 py-1.5 text-sm gap-1.5";

  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  const config = {
    live: {
      icon: <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF77] animate-pulse inline-block" />,
      text: label ?? "Live",
      cls: "text-[#4CAF77] bg-[#4CAF77]/15 border-[#4CAF77]/30",
    },
    offline: {
      icon: <WifiOff className={iconSize} />,
      text: label ?? "Offline",
      cls: "text-[#F5A623] bg-[#F5A623]/15 border-[#F5A623]/30",
    },
    "low-power": {
      icon: <span>⚡</span>,
      text: label ?? "Low power",
      cls: "text-[#F5A623] bg-[#F5A623]/15 border-[#F5A623]/30",
    },
    degraded: {
      icon: <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] inline-block" />,
      text: label ?? "Degraded",
      cls: "text-[#F5A623] bg-[#F5A623]/15 border-[#F5A623]/30",
    },
  };

  const cfg = config[status];

  return (
    <div className={`inline-flex items-center rounded-full border font-medium ${sizeClasses} ${cfg.cls}`}>
      {cfg.icon}
      <span>{cfg.text}</span>
    </div>
  );
}
