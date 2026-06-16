import { ChevronRight, Check } from "lucide-react";
import { useState } from "react";

interface PersonalizationProps {
  onComplete: () => void;
}

export function Personalization({ onComplete }: PersonalizationProps) {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());

  const genres = [
    { id: "rock", name: "Rock", emoji: "🎸" },
    { id: "electronic", name: "Electronic", emoji: "🎧" },
    { id: "pop", name: "Pop", emoji: "🎤" },
    { id: "indie", name: "Indie", emoji: "🎭" },
    { id: "hip-hop", name: "Hip-Hop", emoji: "🎵" },
    { id: "jazz", name: "Jazz", emoji: "🎺" },
    { id: "folk", name: "Folk", emoji: "🪕" },
    { id: "metal", name: "Metal", emoji: "🤘" },
    { id: "classical", name: "Classical", emoji: "🎻" },
    { id: "reggae", name: "Reggae", emoji: "🥁" },
  ];

  const toggleGenre = (genreId: string) => {
    setSelectedGenres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(genreId)) {
        newSet.delete(genreId);
      } else {
        newSet.add(genreId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full bg-black text-white flex flex-col p-8">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl mb-3 text-center">Pick Your Favorite Genres</h1>
        <p className="text-zinc-400 text-center mb-10">
          We'll recommend events and artists you'll love
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full mb-8">
          {genres.map(genre => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`rounded-2xl border-2 transition-all ${ selectedGenres.has(genre.id) ? "bg-lime-400/10 border-lime-400" : "bg-zinc-900/50 border-zinc-800" } px-[16px] py-[4px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{genre.emoji}</span>
                {selectedGenres.has(genre.id) && (
                  <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
              <p className="text-left">{genre.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onComplete}
          disabled={selectedGenres.size === 0}
          className={`w-full px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all ${
            selectedGenres.size > 0
              ? "bg-lime-400 text-black shadow-lime-400/30"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={onComplete}
          className="w-full px-8 py-4 bg-transparent text-zinc-400 rounded-2xl"
        >
          Skip for Now
        </button>
      </div>
    </div>
  );
}
