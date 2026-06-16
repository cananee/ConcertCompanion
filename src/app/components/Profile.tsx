import { useState } from "react";
import { User, Eye, Bell, Download, Settings, LogOut, Share2, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Profile() {
  const { visibilityMode, setVisibilityMode, userGroups } = useApp();
  const [showVisibilitySettings, setShowVisibilitySettings] = useState(false);

  const handleResetApp = () => {
    if (confirm("Reset app to empty state? (For testing purposes)")) {
      localStorage.removeItem("user_groups");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="bg-gradient-to-b from-zinc-900 to-black px-6 pt-12 pb-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-lime-400 flex items-center justify-center text-5xl mb-4">
            🎨
          </div>
          <h1 className="text-2xl mb-1">Ada</h1>
          <p className="text-zinc-400">@ada_festival</p>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl text-white mb-1">12</p>
              <p className="text-zinc-400 text-sm">Events</p>
            </div>
            <div>
              <p className="text-2xl text-white mb-1">4</p>
              <p className="text-zinc-400 text-sm">Friends</p>
            </div>
            <div>
              <p className="text-2xl text-white mb-1">{userGroups.length}</p>
              <p className="text-zinc-400 text-sm">Groups</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl text-white mb-4">Privacy & Visibility</h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowVisibilitySettings(true)}
              className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-lime-400" />
                <div className="text-left">
                  <p className="text-white">Default Visibility</p>
                  <p className="text-zinc-400 text-sm capitalize">{visibilityMode}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-lime-400" />
                <div className="text-left">
                  <p className="text-white">Allow Sharing</p>
                  <p className="text-zinc-400 text-sm">Control who can share your location</p>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-lime-400" />
                <div className="text-left">
                  <p className="text-white">Notifications</p>
                  <p className="text-zinc-400 text-sm">Manage notification preferences</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl text-white mb-4">Account</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-lime-400" />
                <div className="text-left">
                  <p className="text-white">Offline Maps</p>
                  <p className="text-zinc-400 text-sm">Manage downloaded maps</p>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-lime-400" />
                <div className="text-left">
                  <p className="text-white">Settings</p>
                  <p className="text-zinc-400 text-sm">App preferences</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleResetApp}
              className="w-full flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-orange-400" />
                <div className="text-left">
                  <p className="text-orange-400">Reset App (Testing)</p>
                  <p className="text-orange-300 text-sm">Clear groups & see empty state</p>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <p className="text-red-400">Sign Out</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {showVisibilitySettings && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowVisibilitySettings(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl text-white mb-6">Default Visibility</h2>
            <div className="space-y-3 mb-6">
              {(["precise", "approximate", "ghost"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setVisibilityMode(mode);
                    setShowVisibilitySettings(false);
                  }}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    visibilityMode === mode
                      ? "bg-lime-400/10 border-lime-400 text-lime-400"
                      : "bg-zinc-800 border-zinc-700 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="capitalize mb-1">{mode}</p>
                      <p className="text-xs text-zinc-400">
                        {mode === "precise" && "Show exact location"}
                        {mode === "approximate" && "Show general area"}
                        {mode === "ghost" && "Hide your location"}
                      </p>
                    </div>
                    {visibilityMode === mode && (
                      <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
