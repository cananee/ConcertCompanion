import { useState } from "react";
import { X } from "lucide-react";

interface CreateGroupSheetProps {
  onClose: () => void;
  onCreate: (groupName: string) => void;
  initialName?: string;
}

export function CreateGroupSheet({ onClose, onCreate, initialName }: CreateGroupSheetProps) {
  const [groupName, setGroupName] = useState(initialName ?? "");

  const handleCreate = () => {
    if (groupName.trim()) {
      onCreate(groupName.trim());
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-zinc-900 rounded-t-3xl p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-white">Name your first group</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Tomorrowland´26"
            autoFocus
            className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
          />
          <p className="text-xs text-zinc-500 mt-2">You can always change this later</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={!groupName.trim()}
          className={`w-full px-8 py-4 rounded-2xl transition-all ${
            groupName.trim()
              ? "bg-lime-400 text-black shadow-lg shadow-lime-400/30"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
