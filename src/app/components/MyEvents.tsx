import { useState } from "react";
import { Calendar, MapPin, Users, Image as ImageIcon, Download, CheckCircle, Map, Trophy } from "lucide-react";
import { useApp } from "../context/AppContext";
import { NavigatorReport } from "./NavigatorReport";

export function MyEvents() {
  const { events, updateEventOfflineMap, activeEvent } = useApp();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const sziget = events.find(e => e.id === "sziget");
  const hasMap = sziget?.hasOfflineMap ?? false;

  const handleDownloadMap = () => {
    if (!sziget || hasMap) return;
    setDownloading("sziget");
    setTimeout(() => {
      updateEventOfflineMap("sziget", true);
      setDownloading(null);
    }, 2200);
  };

  const attendedEvents = [
    { id: "1", name: "Coachella 2025",    date: "April 12–14, 2025", location: "Indio, California", friends: ["🎨", "🎸", "🎭"], photos: 24 },
    { id: "2", name: "Glastonbury 2025",  date: "June 25–29, 2025",  location: "Somerset, UK",       friends: ["🎸", "🎪"],        photos: 18 },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="bg-gradient-to-b from-zinc-900 to-black px-6 pt-12 pb-6">
        <h1 className="text-3xl mb-1">My Events</h1>
        <p className="text-zinc-400 text-sm">Your festival journey</p>
      </div>

      <div className="px-6 space-y-8">
        {/* ── Upcoming ── */}
        <div>
          <h2 className="text-xl text-white mb-4">Upcoming</h2>

          {sziget && (
            <div className="bg-zinc-900 border border-lime-400/30 rounded-2xl overflow-hidden">
              {/* Header banner */}
              <div className="relative h-28 bg-gradient-to-br from-violet-900/60 via-green-900/40 to-amber-900/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_80%,rgba(132,204,22,0.4),transparent_70%)]" />
                <span className="text-5xl relative z-10">🎪</span>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-lime-400 rounded-lg">
                  <span className="text-black text-xs">Active</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white text-lg mb-2">{sziget.name}</h3>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{sziget.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{sziget.location}</span>
                  </div>
                </div>

                {/* Stage chips */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {sziget.stages.map(stage => (
                    <div
                      key={stage.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-700 bg-zinc-800"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="text-zinc-300 text-xs">{stage.name}</span>
                    </div>
                  ))}
                </div>

                {/* Offline map download */}
                <button
                  onClick={handleDownloadMap}
                  disabled={hasMap || downloading === "sziget"}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-all mb-3 ${
                    hasMap
                      ? "bg-lime-400/10 border-lime-400/40 text-lime-400 cursor-default"
                      : downloading === "sziget"
                      ? "bg-zinc-800 border-zinc-600 text-zinc-400 cursor-wait"
                      : "bg-zinc-800 border-zinc-600 text-white active:scale-95"
                  }`}
                >
                  {hasMap ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Festival Map Downloaded</span>
                    </>
                  ) : downloading === "sziget" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-lime-400 rounded-full animate-spin" />
                      <span className="text-sm">Downloading…</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download Festival Map</span>
                    </>
                  )}
                </button>

                {!hasMap && (
                  <p className="text-zinc-500 text-xs text-center flex items-center justify-center gap-1">
                    <Map className="w-3 h-3" />
                    Download to unlock Festival view in the Map tab
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Past Events ── */}
        <div>
          <h2 className="text-xl text-white mb-4">Past Events</h2>
          <div className="space-y-4">
            {attendedEvents.map(event => (
              <div key={event.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 flex items-center justify-center">
                  <span className="text-5xl">🎉</span>
                </div>
                <div className="p-5">
                  <h3 className="text-white mb-2">{event.name}</h3>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {event.friends.map((f, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center border-2 border-zinc-900">
                            {f}
                          </div>
                        ))}
                      </div>
                      <span className="text-zinc-400 text-sm">{event.friends.length} friends</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400 text-sm">
                      <ImageIcon className="w-4 h-4" />
                      <span>{event.photos}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigator Report CTA */}
        <button
          onClick={() => setShowReport(true)}
          className="w-full bg-gradient-to-br from-[#7B5EA7]/15 to-[#141420] border border-[#7B5EA7]/25 rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-5 h-5 text-[#F5A623]" />
            <h3 className="text-white font-semibold">Sziget 2026 Navigator Report</h3>
          </div>
          <p className="text-[#A0A0B8] text-sm mb-4">Your festival in numbers — crew time, acts caught, km walked, and your best moments.</p>
          <div className="flex items-center gap-2">
            <span className="text-[#7B5EA7] text-sm font-semibold">View full report →</span>
          </div>
        </button>

        {showReport && (
          <NavigatorReport
            event={{ name: "Sziget Festival 2026", date: "Aug 10–15, 2026", location: "Budapest, Hungary" }}
            onClose={() => setShowReport(false)}
          />
        )}
      </div>
    </div>
  );
}
