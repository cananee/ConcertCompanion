import { X, Share2, MapPin, Users, Music, Clock, Trophy, Footprints } from "lucide-react";

interface NavigatorReportProps {
  event: {
    name: string;
    date: string;
    location: string;
  };
  onClose: () => void;
}

const STATS = [
  { icon: Clock,      label: "Time together",   value: "4h 32m",  color: "#7B5EA7" },
  { icon: Users,      label: "Regroupings",      value: "3",       color: "#E05C5C" },
  { icon: Music,      label: "Acts caught",      value: "6",       color: "#4CAF77" },
  { icon: MapPin,     label: "Stages visited",   value: "3 of 3",  color: "#F5A623" },
  { icon: Footprints, label: "Distance walked",  value: "8.4 km",  color: "#A0A0B8" },
  { icon: Trophy,     label: "First regrouping", value: "22 min",  color: "#F5A623" },
];

const ARTISTS = [
  "Arctic Monkeys", "Billie Eilish", "The Chemical Brothers",
  "Jamie xx", "Glass Animals", "Idles",
];

const CREW = [
  { avatar: "🎨", name: "You",   isYou: true },
  { avatar: "🎸", name: "Mert"  },
  { avatar: "🎭", name: "Lina"  },
  { avatar: "🎪", name: "Deniz" },
];

export function NavigatorReport({ event, onClose }: NavigatorReportProps) {
  return (
    <div className="absolute inset-0 bg-[#0A0A0F] z-50 overflow-y-auto">
      {/* Hero banner */}
      <div
        className="relative px-6 pt-14 pb-6"
        style={{ background: "linear-gradient(135deg, rgba(123,94,167,0.35) 0%, rgba(224,92,92,0.15) 60%, rgba(20,20,32,0) 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#F5A623]" />
              <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider">Navigator Report</span>
            </div>
            <h1 className="text-white text-2xl font-bold leading-tight">{event.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-[#A0A0B8] text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.location}</span>
              <span>·</span>
              <span>{event.date}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-12 space-y-6">
        {/* Crew */}
        <div>
          <h2 className="text-white font-semibold mb-4">Your crew</h2>
          <div className="flex items-start gap-4">
            {CREW.map(member => (
              <div key={member.name} className="flex flex-col items-center gap-1.5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 ${
                  member.isYou
                    ? "bg-lime-400 border-lime-300"
                    : "bg-[#1E1E2E] border-white/10"
                }`}>
                  {member.avatar}
                </div>
                <span className="text-[#A0A0B8] text-xs">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-white font-semibold mb-4">Festival stats</h2>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-[#141420] border border-white/8 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    <span className="text-[#A0A0B8] text-xs">{stat.label}</span>
                  </div>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Acts caught */}
        <div>
          <h2 className="text-white font-semibold mb-4">Acts you caught</h2>
          <div className="flex flex-wrap gap-2">
            {ARTISTS.map(artist => (
              <div
                key={artist}
                className="px-3 py-2 bg-[#141420] border border-white/8 rounded-xl text-sm text-white"
              >
                {artist}
              </div>
            ))}
          </div>
        </div>

        {/* Memory highlight */}
        <div className="bg-[#141420] border border-white/8 rounded-2xl p-5">
          <p className="text-[#A0A0B8] text-xs uppercase tracking-wider mb-3 font-medium">Best moment</p>
          <p className="text-white text-sm leading-relaxed">
            You and Mert found each other in under 3 minutes during Arctic Monkeys.
            That's your fastest regroup yet. 🤝
          </p>
        </div>

        {/* Next year */}
        <div
          className="rounded-2xl p-5 border border-[#7B5EA7]/30"
          style={{ background: "linear-gradient(135deg, rgba(123,94,167,0.15), rgba(20,20,32,1))" }}
        >
          <p className="text-white font-semibold mb-1">See you next year? 🎪</p>
          <p className="text-[#A0A0B8] text-sm mb-4">
            Sziget Festival 2027 · Budapest · Tickets available soon
          </p>
          <button className="w-full py-3 bg-[#7B5EA7] rounded-xl text-white font-semibold text-sm active:scale-95 transition-transform">
            Get notified for 2027
          </button>
        </div>

        {/* Share */}
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-[#141420] border border-white/10 rounded-2xl text-white active:scale-95 transition-transform">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share your Navigator Report</span>
        </button>
      </div>
    </div>
  );
}
