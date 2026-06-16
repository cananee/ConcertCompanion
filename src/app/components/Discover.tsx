import { useState } from "react";
import { Search, MapPin, Calendar, Users, CheckCircle, Circle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

interface DiscoverEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  emoji: string;
  gradient: string;
  stages: string[];
  friends: number;
  genre: string;
}

const EXTRA_EVENTS: DiscoverEvent[] = [
  {
    id: "primavera",
    name: "Primavera Sound 2026",
    date: "June 4–8, 2026",
    location: "Barcelona, Spain",
    emoji: "🌊",
    gradient: "from-blue-500/20 to-indigo-500/20",
    stages: ["Primavera Stage", "Pitchfork Stage", "Ray-Ban Stage"],
    friends: 3,
    genre: "Indie / Alternative",
  },
  {
    id: "tomorrowland",
    name: "Tomorrowland 2026",
    date: "July 17–26, 2026",
    location: "Boom, Belgium",
    emoji: "🔮",
    gradient: "from-purple-500/20 to-pink-500/20",
    stages: ["Mainstage", "Freedom", "Core"],
    friends: 1,
    genre: "Electronic / EDM",
  },
  {
    id: "glastonbury",
    name: "Glastonbury 2026",
    date: "June 24–28, 2026",
    location: "Somerset, UK",
    emoji: "🌿",
    gradient: "from-green-500/20 to-emerald-500/20",
    stages: ["Pyramid Stage", "Other Stage", "Park Stage"],
    friends: 5,
    genre: "Multi-genre",
  },
  {
    id: "lollapalooza",
    name: "Lollapalooza 2026",
    date: "July 30–Aug 2, 2026",
    location: "Chicago, USA",
    emoji: "🏙️",
    gradient: "from-orange-500/20 to-red-500/20",
    stages: ["Grant Park Stage", "Perry's Stage", "Bud Light Stage"],
    friends: 2,
    genre: "Rock / Pop / Electronic",
  },
  {
    id: "roskilde",
    name: "Roskilde Festival 2026",
    date: "June 27–July 4, 2026",
    location: "Roskilde, Denmark",
    emoji: "🌅",
    gradient: "from-amber-500/20 to-yellow-500/20",
    stages: ["Orange Stage", "Arena", "Apollo"],
    friends: 0,
    genre: "World / Alternative",
  },
  {
    id: "coachella",
    name: "Coachella 2026",
    date: "April 10–19, 2026",
    location: "Indio, California",
    emoji: "🌴",
    gradient: "from-rose-500/20 to-orange-500/20",
    stages: ["Coachella Stage", "Outdoor Theatre", "Sahara"],
    friends: 4,
    genre: "Pop / Electronic / Hip-Hop",
  },
];

export function Discover() {
  const { events } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"week" | "recommended" | "friends">("week");
  const [joining, setJoining] = useState<Set<string>>(new Set(["sziget"]));

  const tabs = [
    { id: "week" as const,        label: "This Week" },
    { id: "recommended" as const, label: "Recommended" },
    { id: "friends" as const,     label: "Friends Going" },
  ];

  const toggleJoin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoining(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="bg-gradient-to-b from-zinc-900 to-black px-4 pt-12 pb-5">
        <h1 className="text-3xl mb-1">Discover</h1>
        <p className="text-zinc-400 text-sm">Find your next adventure</p>
      </div>

      <div className="px-4">
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search events, artists…"
            className="w-full pl-11 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-lime-400 text-black"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event cards */}
        <div className="space-y-4">
          {/* ── Sziget from context ── */}
          {events.map(event => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            >
              {/* Join toggle */}
              <button
                onClick={e => toggleJoin(event.id, e)}
                className="absolute top-3 right-3 z-10"
              >
                {joining.has(event.id) ? (
                  <CheckCircle className="w-7 h-7 text-lime-400 drop-shadow-lg" />
                ) : (
                  <Circle className="w-7 h-7 text-zinc-400" />
                )}
              </button>

              <div className="h-40 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 flex items-center justify-center">
                <span className="text-5xl">🎪</span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white leading-tight">{event.name}</h3>
                  {joining.has(event.id) && (
                    <span className="shrink-0 text-xs px-2 py-0.5 bg-lime-400/15 text-lime-400 border border-lime-400/30 rounded-lg">
                      Going
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>2 friends going</span>
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {event.stages.slice(0, 3).map(stage => (
                    <div
                      key={stage.id}
                      className="px-2.5 py-1 rounded-lg text-xs border border-zinc-700 text-zinc-400 bg-zinc-800"
                    >
                      {stage.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ── 6 extra events ── */}
          {EXTRA_EVENTS.map(event => (
            <div
              key={event.id}
              className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
            >
              {/* Join toggle */}
              <button
                onClick={e => toggleJoin(event.id, e)}
                className="absolute top-3 right-3 z-10"
              >
                {joining.has(event.id) ? (
                  <CheckCircle className="w-7 h-7 text-lime-400 drop-shadow-lg" />
                ) : (
                  <Circle className="w-7 h-7 text-zinc-500" />
                )}
              </button>

              <div className={`h-40 bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                <span className="text-5xl">{event.emoji}</span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white leading-tight">{event.name}</h3>
                  {joining.has(event.id) && (
                    <span className="shrink-0 text-xs px-2 py-0.5 bg-lime-400/15 text-lime-400 border border-lime-400/30 rounded-lg">
                      Going
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  {event.friends > 0 && (
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.friends} friend{event.friends !== 1 ? "s" : ""} going</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {event.stages.slice(0, 2).map(stage => (
                      <div
                        key={stage}
                        className="px-2.5 py-1 rounded-lg text-xs border border-zinc-700 text-zinc-400 bg-zinc-800"
                      >
                        {stage}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 shrink-0">{event.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
