interface AvatarPinProps {
  avatar: string;
  name: string;
  isCurrentUser?: boolean;
  status?: "online" | "offline";
  distance?: string;
  onClick?: () => void;
}

export function AvatarPin({ avatar, name, isCurrentUser, status = "online", distance, onClick }: AvatarPinProps) {
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      {isCurrentUser && (
        <div className="absolute w-14 h-14 rounded-full bg-lime-400/20 animate-ping scale-150" />
      )}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 shadow-lg ${
        isCurrentUser
          ? "bg-lime-400 border-lime-300 shadow-lime-400/50"
          : "bg-[#1E1E2E] border-white/10"
      }`}>
        {avatar}
      </div>
      <div className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#0A0A0F] ${
        status === "online" ? "bg-[#4CAF77]" : "bg-zinc-500"
      }`} />
      <div className="absolute top-full mt-2 whitespace-nowrap">
        <div className={`backdrop-blur-lg border rounded-xl px-3 py-1.5 ${
          isCurrentUser
            ? "bg-lime-400 border-lime-300"
            : "bg-[#141420]/95 border-white/10"
        }`}>
          <p className={`text-sm ${isCurrentUser ? "text-black font-medium" : "text-white"}`}>
            {isCurrentUser ? `${name} · You` : name}
          </p>
          {!isCurrentUser && distance && (
            <p className="text-[#4CAF77] text-xs">{distance}</p>
          )}
        </div>
      </div>
    </div>
  );
}
