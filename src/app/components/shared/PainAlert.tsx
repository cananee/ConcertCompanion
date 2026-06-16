import { X, Users, Battery, WifiOff } from "lucide-react";

type AlertType = "separation" | "low-battery" | "signal-lost";

interface PainAlertProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const ALERT_CONFIG = {
  separation: {
    icon: <Users className="w-4 h-4 flex-shrink-0" />,
    cls: "bg-[#E05C5C]/15 border-[#E05C5C]/40 text-[#E05C5C]",
  },
  "low-battery": {
    icon: <Battery className="w-4 h-4 flex-shrink-0" />,
    cls: "bg-[#F5A623]/15 border-[#F5A623]/40 text-[#F5A623]",
  },
  "signal-lost": {
    icon: <WifiOff className="w-4 h-4 flex-shrink-0" />,
    cls: "bg-[#F5A623]/15 border-[#F5A623]/40 text-[#F5A623]",
  },
};

export function PainAlert({ type, message, onDismiss, onAction, actionLabel }: PainAlertProps) {
  const { icon, cls } = ALERT_CONFIG[type];

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-lg mx-4 ${cls}`}>
      {icon}
      <span className="flex-1 text-sm">{message}</span>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="text-sm font-semibold underline decoration-dotted underline-offset-2 flex-shrink-0"
        >
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} className="opacity-60 hover:opacity-100 flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
