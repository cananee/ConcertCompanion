import { Eye, Edit2, Trash2, Share2 } from "lucide-react";

interface GroupSettingsSheetProps {
  groupName: string;
  visibility: string;
  onClose: () => void;
  onChangeVisibility: () => void;
  onChangeName: () => void;
  onInvite: () => void;
  onDelete: () => void;
}

export function GroupSettingsSheet({
  groupName,
  visibility,
  onClose,
  onChangeVisibility,
  onChangeName,
  onInvite,
  onDelete,
}: GroupSettingsSheetProps) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-zinc-900 rounded-t-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6"></div>

        <h2 className="text-2xl text-white mb-6">{groupName}</h2>

        <div className="space-y-3 mb-6">
          <button
            onClick={onChangeVisibility}
            className="w-full flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-lime-400" />
              <div className="text-left">
                <p className="text-white">My Visibility</p>
                <p className="text-sm text-zinc-400">{visibility}</p>
              </div>
            </div>
          </button>

          <button
            onClick={onChangeName}
            className="w-full flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Edit2 className="w-5 h-5 text-lime-400" />
              <p className="text-white">Change Group Name</p>
            </div>
          </button>

          <button
            onClick={onInvite}
            className="w-full flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-lime-400" />
              <p className="text-white">Invite Members</p>
            </div>
          </button>

          <button
            onClick={onDelete}
            className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-400" />
              <p className="text-red-400">Delete Group</p>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full px-8 py-4 bg-transparent border border-zinc-700 text-white rounded-2xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
