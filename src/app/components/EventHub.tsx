import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Download, MapPin, Users, MessageCircle, Image as ImageIcon, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ArtistSheet } from "./ArtistSheet";

export function EventHub() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, updateEventOfflineMap, setActiveEvent, setFestivalMode } = useApp();
  const event = events.find(e => e.id === eventId);
  const [activeTab, setActiveTab] = useState<"overview" | "map" | "social">("overview");
  const [selectedArtist, setSelectedArtist] = useState<{ id: string; name: string; stage: string; time: string; genre: string } | null>(null);

  if (!event) {
    return <div className="h-screen bg-black text-white flex items-center justify-center">Event not found</div>;
  }

  const handleDownloadMap = () => {
    updateEventOfflineMap(event.id, true);
    setTimeout(() => {
      setActiveEvent(event);
      setFestivalMode(true);
    }, 500);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "map" as const, label: "Map" },
    { id: "social" as const, label: "Social" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="relative h-64 bg-gradient-to-br from-lime-400/30 to-cyan-400/30">
        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          🎪
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 w-10 h-10 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 py-6">
        <h1 className="text-3xl mb-2">{event.name}</h1>
        <div className="flex items-center gap-4 text-zinc-400 mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">{event.date}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-zinc-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 transition-all relative ${
                activeTab === tab.id
                  ? "text-lime-400"
                  : "text-zinc-400"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl text-white mb-4">Lineup</h3>
              <div className="space-y-3">
                {event.artists.map(artist => (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtist(artist)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white">{artist.name}</h4>
                      <Star className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span>{artist.time}</span>
                      <span>•</span>
                      <span>{artist.stage}</span>
                    </div>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-[#7B5EA7]/10 border border-[#7B5EA7]/20 rounded-lg text-[#7B5EA7] text-xs">
                        {artist.genre}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "map" && (
          <div className="space-y-4">
            {!event.hasOfflineMap ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
                <MapPin className="w-16 h-16 text-lime-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Offline Map</h3>
                <p className="text-zinc-400 mb-6">Download the festival map for offline navigation</p>
                <button
                  onClick={handleDownloadMap}
                  className="w-full px-6 py-4 bg-lime-400 rounded-xl text-black flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download for Offline Use</span>
                </button>
              </div>
            ) : (
              <div className="bg-lime-400/10 border border-lime-400/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl text-lime-400 mb-2">Map Downloaded</h3>
                <p className="text-zinc-400 mb-6">Offline map is ready. Return to People tab to enable Festival Mode.</p>
                <button
                  onClick={() => {
                    setActiveEvent(event);
                    setFestivalMode(true);
                    navigate('/');
                  }}
                  className="w-full px-6 py-4 bg-lime-400 rounded-xl text-black"
                >
                  Go to Festival Mode
                </button>
              </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <h4 className="text-white mb-3">Stages</h4>
              <div className="space-y-2">
                {event.stages.map(stage => (
                  <div key={stage.id} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: stage.color }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">{stage.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedArtist && (
          <ArtistSheet
            artist={selectedArtist}
            onClose={() => setSelectedArtist(null)}
          />
        )}

        {activeTab === "social" && (
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-lime-400" />
                <h4 className="text-white">Friends Attending</h4>
              </div>
              <div className="space-y-3">
                {["Mert", "Lina"].map(friend => (
                  <div key={friend} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center">
                      {friend === "Mert" ? "🎸" : "🎭"}
                    </div>
                    <span className="text-white">{friend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-lime-400" />
                <h4 className="text-white">Event Chat</h4>
              </div>
              <p className="text-zinc-400 text-sm">Connect with other festival-goers</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-lime-400" />
                <h4 className="text-white">Event Feed</h4>
              </div>
              <p className="text-zinc-400 text-sm">Photos and updates from attendees</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
