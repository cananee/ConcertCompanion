import { X, Music, Star, Plus } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  stage: string;
  time: string;
  genre: string;
}

interface ArtistSheetProps {
  artist: Artist;
  onClose: () => void;
}

const BIOS: Record<string, string> = {
  "Arctic Monkeys":
    "Sheffield post-punk revivalists who became one of the defining British rock bands of the 21st century. Known for razor-sharp lyrics and relentless energy on stage.",
  "Billie Eilish":
    "Gen Z's voice of anxiety and authenticity, reinventing pop with haunting whisper-to-roar dynamics and a visual world unlike anything else.",
  "The Chemical Brothers":
    "Pioneering UK electronic duo who helped define big beat in the 90s. Live, they deliver an audiovisual spectacle that still destroys festival fields.",
  "Jamie xx":
    "The sonic architect of The xx, now solo. His sets move between aching intimacy and euphoric rave peaks in a way few producers can match.",
  "Tame Impala":
    "Kevin Parker's psychedelic vehicle — immaculate studio records that translate live into swirling, bass-heavy, lights-drenched experiences.",
};

const SETLISTS: Record<string, { title: string; status: "played" | "live" | "upcoming" }[]> = {
  "Arctic Monkeys": [
    { title: "Do I Wanna Know?", status: "played" },
    { title: "Snap Out of It", status: "played" },
    { title: "R U Mine?", status: "played" },
    { title: "505", status: "live" },
    { title: "I Bet You Look Good on the Dancefloor", status: "upcoming" },
    { title: "Teddy Picker", status: "upcoming" },
    { title: "Why'd You Only Call Me When You're High?", status: "upcoming" },
  ],
};

const DEFAULT_SETLIST = [
  { title: "Set opens", status: "played" as const },
  { title: "Fan favourite #1", status: "played" as const },
  { title: "Current track", status: "live" as const },
  { title: "Upcoming", status: "upcoming" as const },
  { title: "Upcoming", status: "upcoming" as const },
];

export function ArtistSheet({ artist, onClose }: ArtistSheetProps) {
  const bio =
    BIOS[artist.name] ??
    `${artist.name} is a ${artist.genre} artist known for captivating live performances and a devoted global following.`;

  const setlist = SETLISTS[artist.name] ?? DEFAULT_SETLIST;
  const nowPlaying = setlist.find(s => s.status === "live");

  return (
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl animate-slide-up overflow-hidden flex flex-col"
        style={{ maxHeight: "88vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-4 flex-shrink-0" />

        {/* Header */}
        <div className="flex items-start gap-4 px-6 pt-4 pb-4 flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-[#7B5EA7]/20 border border-[#7B5EA7]/25 flex items-center justify-center flex-shrink-0">
            <Music className="w-7 h-7 text-[#7B5EA7]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-xl font-bold">{artist.name}</h2>
            <p className="text-[#A0A0B8] text-sm">{artist.stage} · {artist.time}</p>
            <div className="mt-1.5">
              <span className="text-xs px-2 py-0.5 bg-[#7B5EA7]/15 text-[#7B5EA7] border border-[#7B5EA7]/25 rounded-lg">
                {artist.genre}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 pb-8">
          <div className="px-6 space-y-5">
            {/* Bio */}
            <div>
              <p className="text-[#A0A0B8] text-xs uppercase tracking-wider font-medium mb-2">About</p>
              <p className="text-white/85 text-sm leading-relaxed">{bio}</p>
            </div>

            {/* Now playing */}
            {nowPlaying && (
              <div className="flex items-center gap-4 bg-[#1E1E2E] border border-white/8 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-xl bg-[#7B5EA7]/20 border border-[#7B5EA7]/20 flex items-center justify-center flex-shrink-0">
                  <Music className="w-5 h-5 text-[#7B5EA7]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#4CAF77] text-xs font-semibold mb-0.5">● Now playing</p>
                  <p className="text-white font-semibold text-sm truncate">{nowPlaying.title}</p>
                  <p className="text-[#A0A0B8] text-xs">{artist.name}</p>
                </div>
                <button className="w-9 h-9 bg-[#7B5EA7]/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-[#7B5EA7]" />
                </button>
              </div>
            )}

            {/* Setlist */}
            <div>
              <p className="text-[#A0A0B8] text-xs uppercase tracking-wider font-medium mb-3">Setlist</p>
              <div className="space-y-1.5">
                {setlist.map((song, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                      song.status === "live"
                        ? "bg-[#7B5EA7]/15 border border-[#7B5EA7]/30"
                        : "bg-[#1E1E2E]"
                    }`}
                  >
                    <span className={`text-xs w-5 text-center flex-shrink-0 ${
                      song.status === "upcoming" ? "text-white/25" : "text-[#A0A0B8]"
                    }`}>
                      {i + 1}
                    </span>
                    <span className={`flex-1 text-sm ${
                      song.status === "live"
                        ? "text-white font-semibold"
                        : song.status === "played"
                        ? "text-[#A0A0B8] line-through decoration-white/20"
                        : "text-white/50"
                    }`}>
                      {song.title}
                    </span>
                    {song.status === "live" && (
                      <span className="text-[#7B5EA7] text-xs font-semibold flex-shrink-0">● LIVE</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Save to streaming */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3.5 bg-[#1DB954]/10 border border-[#1DB954]/25 rounded-xl text-[#1DB954] text-sm font-medium active:scale-95 transition-transform">
                <Plus className="w-4 h-4" />
                Spotify
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 bg-[#FC3C44]/10 border border-[#FC3C44]/25 rounded-xl text-[#FC3C44] text-sm font-medium active:scale-95 transition-transform">
                <Plus className="w-4 h-4" />
                Apple Music
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
