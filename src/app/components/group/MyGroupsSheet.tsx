import { Plus, Users, Settings, ChevronRight, Eye } from "lucide-react";

interface MyGroupsSheetProps {
  groups: Array<{ id: string; name: string; memberCount: number; visibility: string }>;
  onClose: () => void;
  onCreateGroup: () => void;
  onJoinGroup: () => void;
  onGroupSettings: (groupId: string) => void;
}

export function MyGroupsSheet({ groups, onClose, onCreateGroup, onJoinGroup, onGroupSettings }: MyGroupsSheetProps) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-zinc-900 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6"></div>

        <h2 className="text-2xl text-white mb-6">My Groups</h2>

        <div className="space-y-3 mb-6">
          {groups.map(group => (
            <div key={group.id} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-lime-400/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-white">{group.name}</h3>
                    <p className="text-sm text-zinc-400">{group.memberCount} members</p>
                  </div>
                </div>
                <button
                  onClick={() => onGroupSettings(group.id)}
                  className="w-10 h-10 rounded-xl bg-zinc-700 flex items-center justify-center text-zinc-400"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-lime-400/10 border border-lime-400/20 rounded-xl">
                <Eye className="w-4 h-4 text-lime-400" />
                <span className="text-sm text-lime-400">{group.visibility}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCreateGroup}
            className="px-6 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-2xl flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
          <button
            onClick={onJoinGroup}
            className="px-6 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
          >
            <Users className="w-5 h-5" />
            <span>Join Group</span>
          </button>
        </div>
      </div>
    </div>
  );
}
