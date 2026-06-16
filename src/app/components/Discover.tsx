import { useState } from "react";
import { Search, MapPin, Calendar, Users, CheckCircle, Circle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

type Tab = "week" | "recommended" | "friends";

interface DiscoverEvent {
  id: string;
  name: string;
  date: string;
  dateStart: string; // ISO YYYY-MM-DD for filtering
  location: string;
  emoji: string;
  gradient: string;
  stages: string[];
  friends: number;
  genre: string;
  tabs: Tab[]; // which tabs this event appears in
}

// Today: June 16 2026. "This week" = June 16–29
const EXTRA_EVENTS: DiscoverEvent[] = [
  {
    id: "glastonbury",
    name: "Glastonbury 2026",
    date: "June 24–28, 2026",
    dateStart: "2026-06-24",
    location: "Somerset, UK",
    emoji: "🌿",
    gradient: "from-green-500/20 to-emerald-500/20",
    stages: ["Pyramid Stage", "Other Stage", "Park Stage"],
    friends: 5,
    genre: "Multi-genre",
    tabs: ["week", "recommended", "friends"],
  },
  {
    id: "roskilde",
    name: "Roskilde Festival 2026",
    date: "June 27–July 4, 2026",
    dateStart: "2026-06-27",
    location: "Roskilde, Denmark",
    emoji: "🌅",
    gradient: "from-amber-500/20 to-yellow-500/20",
    stages: ["Orange Stage", "Arena", "Apollo"],
    friends: 0,
    genre: "World / Alternative",
    tabs: ["week", "recommended"],
  },
  {
    id: "tomorrowland",
    name: "Tomorrowland 2026",
    date: "July 17–26, 2026",
    dateStart: "2026-07-17",
    location: "Boom, Belgium",
    emoji: "🔮",
    gradient: "from-purple-500/20 to-pink-500/20",
    stages: ["Mainstage", "Freedom", "Core"],
    friends: 1,
    genre: "Electronic / EDM",
    tabs: ["recommended", "friends"],
  },
  {
    id: "lollapalooza",
    name: "Lollapalooza 2026",
    date: "July 30–Aug 2, 2026",
    dateStart: "2026-07-30",
    location: "Chicago, USA",
    emoji: "🏙️",
    gradient: "from-orange-500/20 to-red-500/20",
    stages: ["Grant Park Stage", "Perry's Stage", "Bud Light Stage"],
    friends: 2,
    genre: "Rock / Pop / Electronic",
    tabs: ["recommended", "friends"],
  },
  {
    id: "primavera",
    name: "Primavera Sound 2026",
    date: "June 4–8, 2026",
    dateStart: "2026-06-04",
    location: "Barcelona, Spain",
    emoji: "🌊",
    gradient: "from-blue-500/20 to-indigo-500/20",
    stages: ["Primavera Stage", "Pitchfork Stage", "Ray-Ban Stage"],
    friends: 3,
    genre: "Indie / Alternative",
    tabs: ["friends"],
  },
  {
    id: "coachella",
    name: "Coachella 2026",
    date: "April 10–19, 2026",
    dateStart: "2026-04-10",
    location: "Indio, California",
    emoji: "🌴",
    gradient: "from-rose-500/20 to-orange-500/20",
    stages: ["Coachella Stage", "Outdoor Theatre", "Sahara"],
    friends: 4,
    genre: "Pop / Electronic / Hip-Hop",
    tabs: ["friends"],
  },
];

export function Discover() {
  const { events } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [joining, setJoining] = useState<Set<string>>(new Set(["sziget"]));

  const toggleJoin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoining((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // The context event (Sziget) tabs
  const szigetTabs: Tab[] = ["week", "recommended", "friends"];

  const filteredContext = events.filter(() => szigetTabs.includes(activeTab));
  const filteredExtra = EXTRA_EVENTS.filter(
    (e) =>
      e.tabs.includes(activeTab) &&
      (searchQuery === "" ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const tabs: { id: Tab; label: string; count: number }[] = [
    {
      id: "week",
      label: "This Week",
      count:
        events.length +
        EXTRA_EVENTS.filter((e) => e.tabs.includes("week")).length,
    },
    {
      id: "recommended",
      label: "Recommended",
      count:
        events.length +
        EXTRA_EVENTS.filter((e) => e.tabs.includes("recommended")).length,
    },
    {
      id: "friends",
      label: "Friends Going",
      count:
        events.length +
        EXTRA_EVENTS.filter((e) => e.tabs.includes("friends")).length,
    },
  ];

  return (
    <div className="min-h-full bg-[#0A0A0F] text-white pb-28">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 bg-gradient-to-b from-[#141420] to-[#0A0A0F]">
        <h1 className="text-3xl font-bold mb-1">Discover</h1>
        <p className="text-[#A0A0B8] text-sm">Find your next adventure</p>
      </div>

      <div className="px-5">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, artists, cities…"
            className="w-full pl-11 pr-4 py-3.5 bg-[#141420] border border-white/10 rounded-2xl text-white text-sm placeholder-[#A0A0B8]/60 focus:outline-none focus:border-[#7B5EA7] transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm transition-all shrink-0 active:scale-95 ${
                activeTab === tab.id
                  ? "bg-lime-400 text-black font-semibold"
                  : "bg-[#141420] text-[#A0A0B8] border border-white/10"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? "bg-black/20 text-black" : "bg-white/10 text-[#A0A0B8]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredContext.length === 0 && filteredExtra.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white font-semibold mb-1">No events found</p>
            <p className="text-[#A0A0B8] text-sm">Try a different search or tab</p>
          </div>
        )}

        {/* Event cards */}
        <div className="space-y-4">
          {/* Context events (Sziget) */}
          {filteredContext.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="relative bg-[#141420] border border-white/8 rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            >
              <button
                onClick={(e) => toggleJoin(event.id, e)}
                className="absolute top-3 right-3 z-10"
              >
                {joining.has(event.id) ? (
                  <CheckCircle className="w-7 h-7 text-lime-400" />
                ) : (
                  <Circle className="w-7 h-7 text-[#A0A0B8]" />
                )}
              </button>
              <div className="h-40 bg-gradient-to-br from-lime-400/20 to-cyan-400/15 flex items-center justify-center">
                <span className="text-5xl">🎪</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold leading-tight">{event.name}</h3>
                  {joining.has(event.id) && (
                    <span className="shrink-0 text-xs px-2 py-0.5 bg-lime-400/15 text-lime-400 border border-lime-400/30 rounded-lg">Going</span>
                  )}
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>2 friends going</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {event.stages.slice(0, 3).map((s) => (
                    <div key={s.id} className="px-2.5 py-1 rounded-lg text-xs border border-white/10 text-[#A0A0B8] bg-[#1E1E2E]">
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Extra events */}
          {filteredExtra.map((event) => (
            <div
              key={event.id}
              className="relative bg-[#141420] border border-white/8 rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
            >
              <button
                onClick={(e) => toggleJoin(event.id, e)}
                className="absolute top-3 right-3 z-10"
              >
                {joining.has(event.id) ? (
                  <CheckCircle className="w-7 h-7 text-lime-400" />
                ) : (
                  <Circle className="w-7 h-7 text-[#A0A0B8]" />
                )}
              </button>
              <div className={`h-40 bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                <span className="text-5xl">{event.emoji}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold leading-tight">{event.name}</h3>
                  {joining.has(event.id) && (
                    <span className="shrink-0 text-xs px-2 py-0.5 bg-lime-400/15 text-lime-400 border border-lime-400/30 rounded-lg">Going</span>
                  )}
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  {event.friends > 0 && (
                    <div className="flex items-center gap-2 text-[#A0A0B8] text-xs">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.friends} friend{event.friends !== 1 ? "s" : ""} going</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {event.stages.slice(0, 2).map((stage) => (
                      <div key={stage} className="px-2.5 py-1 rounded-lg text-xs border border-white/10 text-[#A0A0B8] bg-[#1E1E2E]">
                        {stage}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[#A0A0B8]/60 shrink-0">{event.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
