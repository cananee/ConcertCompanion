import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";

interface InviteSheetProps {
  groupName: string;
  inviteCode: string;
  onClose: () => void;
}

export function InviteSheet({ groupName, inviteCode, onClose }: InviteSheetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join ${groupName} on Festival Friends`,
        text: `Use code ${inviteCode} to join our group and see where everyone is at the festival!`,
      });
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-zinc-900 rounded-t-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6"></div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-lime-400 rounded-3xl flex items-center justify-center text-4xl">
              👥
            </div>
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-purple-400 rounded-2xl flex items-center justify-center text-2xl">
              👤
            </div>
          </div>
        </div>

        <h2 className="text-2xl text-white mb-2 text-center">Invite</h2>
        <p className="text-zinc-400 text-center mb-8 max-w-sm mx-auto">
          Send this invite code to your friends or family. Adding members is always free.
        </p>

        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6">
          <p className="text-xs text-zinc-400 text-center mb-2">Invite Code</p>
          <div className="flex items-center justify-center gap-3">
            <p className="text-4xl text-white tracking-widest font-mono">{inviteCode}</p>
            <button
              onClick={handleCopy}
              className="w-10 h-10 rounded-xl bg-zinc-700 flex items-center justify-center text-lime-400"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30 mb-3"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>

        <button
          onClick={onClose}
          className="w-full px-8 py-4 bg-transparent text-zinc-400 rounded-2xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}
