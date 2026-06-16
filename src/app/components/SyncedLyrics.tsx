import { useState, useEffect } from "react";
import { X, Music, Camera, Mic, ChevronUp, ChevronDown } from "lucide-react";

interface SyncedLyricsProps {
  onClose: () => void;
  song?: { title: string; artist: string };
}

const MOCK_LYRICS = [
  "I bet you look good on the dance floor",
  "I don't know if you're looking for romance or",
  "I don't know what you're looking for",
  "Dancing to electro-pop like a robot from 1984",
  "Well, I never seen you before",
  "And I don't know what you're looking for",
  "I said, I bet you look good on the dance floor",
  "Dancing to electro-pop like a robot from 1984",
];

export function SyncedLyrics({
  onClose,
  song = { title: "I Bet You Look Good on the Dancefloor", artist: "Arctic Monkeys" },
}: SyncedLyricsProps) {
  const [currentLine, setCurrentLine] = useState(2);
  const [arMode, setArMode] = useState(true);
  const [karaoke, setKaraoke] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % MOCK_LYRICS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevLine = currentLine > 0 ? MOCK_LYRICS[currentLine - 1] : null;
  const currLine = MOCK_LYRICS[currentLine];
  const nextLine = currentLine < MOCK_LYRICS.length - 1 ? MOCK_LYRICS[currentLine + 1] : null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      {/* Background */}
      {arMode ? (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950" />
          <div className="absolute inset-0 bg-[#7B5EA7]/8" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />
          <div className="absolute bottom-32 left-0 right-0 h-24 bg-zinc-800/30" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-600/30" />
          {/* Corner AR guides */}
          <div className="absolute top-28 left-8 w-5 h-5 border-t-2 border-l-2 border-white/15 rounded-tl" />
          <div className="absolute top-28 right-8 w-5 h-5 border-t-2 border-r-2 border-white/15 rounded-tr" />
          <div className="absolute bottom-32 left-8 w-5 h-5 border-b-2 border-l-2 border-white/15 rounded-bl" />
          <div className="absolute bottom-32 right-8 w-5 h-5 border-b-2 border-r-2 border-white/15 rounded-br" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#0A0A0F]">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(123,94,167,0.2) 0%, transparent 70%)" }}
          />
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-14 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7B5EA7]/30 border border-[#7B5EA7]/30 flex items-center justify-center">
              <Music className="w-4 h-4 text-[#7B5EA7]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">{song.title}</p>
              <p className="text-[#A0A0B8] text-xs">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setArMode(m => !m)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs border transition-all ${
                arMode
                  ? "bg-[#7B5EA7]/25 border-[#7B5EA7]/40 text-[#7B5EA7]"
                  : "bg-white/10 border-white/15 text-white/60"
              }`}
            >
              <Camera className="w-3 h-3" />
              AR
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/10 border border-white/10 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Lyrics area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
          {/* Prev line */}
          <button
            onClick={() => setCurrentLine(l => Math.max(0, l - 1))}
            className="flex items-center gap-2 text-white/25 text-sm text-center leading-relaxed hover:text-white/40 transition-colors"
          >
            {prevLine ?? ""}
          </button>

          {/* Current line */}
          <div
            className="px-5 py-4 rounded-2xl text-center"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <p
              className="text-white text-2xl font-bold leading-snug"
              style={{ textShadow: "0 0 40px rgba(123,94,167,0.7)" }}
            >
              {currLine}
            </p>
          </div>

          {/* Next line */}
          <button
            onClick={() => setCurrentLine(l => Math.min(MOCK_LYRICS.length - 1, l + 1))}
            className="flex items-center gap-2 text-white/25 text-sm text-center leading-relaxed hover:text-white/40 transition-colors"
          >
            {nextLine ?? ""}
          </button>
        </div>

        {/* Bottom controls */}
        <div className="px-5 pb-28 space-y-3">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-[#A0A0B8] text-xs font-mono">2:14</span>
            <div className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#7B5EA7] rounded-full" style={{ width: "42%" }} />
            </div>
            <span className="text-[#A0A0B8] text-xs font-mono">5:03</span>
          </div>

          {/* Karaoke toggle */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-2xl border"
            style={{ background: "rgba(0,0,0,0.4)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#7B5EA7]" />
              <span className="text-white/70 text-sm">Karaoke mode</span>
            </div>
            <button
              onClick={() => setKaraoke(k => !k)}
              className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${karaoke ? "bg-[#7B5EA7]" : "bg-white/15"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${karaoke ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
