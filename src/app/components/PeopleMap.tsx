import { useState } from "react";
import {
  Plus, Eye, ChevronRight, MapPin, Navigation, Locate,
  MessageCircle, Radio, Layers, Map, Satellite, Compass, Camera, Zap, X,
  Lock, Music, Clock,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CreateGroupSheet } from "./group/CreateGroupSheet";
import { MyGroupsSheet } from "./group/MyGroupsSheet";
import { InviteSheet } from "./group/InviteSheet";
import { GroupSettingsSheet } from "./group/GroupSettingsSheet";
import { JoinGroupScreen } from "./group/JoinGroupScreen";
import {
  DefaultMapLayer,
  SatelliteMapLayer,
  FestivalMapLayer,
  CompassMapLayer,
} from "./MapLayers";
import { FeaturePill, OfflineBanner } from "./shared";
import { SyncedLyrics } from "./SyncedLyrics";
import { OfflineState } from "./OfflineState";

type MapView = "default" | "satellite" | "festival" | "compass" | "ar";

const MAP_OPTIONS: { id: MapView; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "default",   label: "Default",   icon: <Map className="w-5 h-5" />,       desc: "Street map" },
  { id: "satellite", label: "Satellite", icon: <Satellite className="w-5 h-5" />,  desc: "Aerial view" },
  { id: "festival",  label: "Festival",  icon: <Zap className="w-5 h-5" />,        desc: "Stages & grounds" },
  { id: "compass",   label: "Compass",   icon: <Compass className="w-5 h-5" />,    desc: "Heading-locked" },
  { id: "ar",        label: "AR",        icon: <Camera className="w-5 h-5" />,     desc: "Augmented reality" },
];

export function PeopleMap() {
  const {
    currentUser,
    groupName,
    groupMembers,
    activeEvent,
    selectedFriend,
    setSelectedFriend,
    showNavigation,
    setShowNavigation,
    showReunion,
    setShowReunion,
    visibilityMode,
    setVisibilityMode,
    hasGroup,
    userGroups,
    createGroup,
    joinGroup,
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showGroupSheet, setShowGroupSheet] = useState(false);
  const [showInviteSheet, setShowInviteSheet] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showJoinScreen, setShowJoinScreen] = useState(false);
  const [showVisibilitySheet, setShowVisibilitySheet] = useState(false);
  const [showFriendActions, setShowFriendActions] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showARView, setShowARView] = useState(false);
  const [mapView, setMapView] = useState<MapView>("default");
  const [showSyncedLyrics, setShowSyncedLyrics] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showOfflineState, setShowOfflineState] = useState(false);

  const handleFriendClick = (friend: typeof groupMembers[0]) => {
    if (friend.id === currentUser.id) return;
    setSelectedFriend(friend);
    setShowFriendActions(true);
  };

  const handleOnMyWay = () => {
    setShowFriendActions(false);
    setShowNavigation(true);
  };

  const handleARNavigation = () => {
    setShowNavigation(false);
    setShowARView(true);
    setTimeout(() => {
      setShowARView(false);
      setShowReunion(true);
      setTimeout(() => setShowReunion(false), 3000);
    }, 4000);
  };

  const handleCreateGroup = (name: string) => {
    createGroup(name);
    setShowCreateSheet(false);
    setTimeout(() => setShowInviteSheet(true), 300);
  };

  const handleJoinGroup = (code: string) => {
    joinGroup(code);
    setShowJoinScreen(false);
  };

  const handleSelectMapView = (view: MapView) => {
    setShowMapPicker(false);
    if (view === "ar") {
      setShowARView(true);
      setTimeout(() => setShowARView(false), 4000);
    } else {
      setMapView(view);
    }
  };

  if (showJoinScreen) {
    return (
      <JoinGroupScreen
        onBack={() => setShowJoinScreen(false)}
        onJoin={handleJoinGroup}
      />
    );
  }

  return (
    <div className="relative h-screen bg-zinc-950 overflow-hidden">
      {/* ── Map background layer ── */}
      {mapView === "default"   && <DefaultMapLayer />}
      {mapView === "satellite" && <SatelliteMapLayer />}
      {mapView === "festival"  && <FestivalMapLayer />}
      {mapView === "compass"   && <CompassMapLayer />}

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-4 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          {/* Group / My Groups button */}
          <button
            onClick={() => setShowGroupSheet(true)}
            className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 backdrop-blur-lg border border-zinc-700/80 rounded-2xl shadow-lg"
          >
            {hasGroup && groupMembers.length > 1 ? (
              <div className="flex -space-x-2">
                {groupMembers.slice(0, 3).map(member => (
                  <div
                    key={member.id}
                    className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-zinc-900 text-sm"
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
                <Plus className="w-4 h-4 text-zinc-400" />
              </div>
            )}
            <span className="text-white text-sm">
              {hasGroup && userGroups.length > 0 ? userGroups[0].name : "My Groups"}
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Right side: offline badge + offline toggle (for demo) */}
          <div className="flex items-center gap-2">
            {isOffline && (
              <OfflineBanner onTap={() => setShowOfflineState(true)} />
            )}
            <button
              onClick={() => setIsOffline(o => !o)}
              className={`px-3 py-2 rounded-xl text-xs border backdrop-blur-lg ${isOffline ? "bg-zinc-900/90 border-zinc-700/80 text-zinc-400" : "bg-zinc-900/90 border-zinc-700/80 text-zinc-500"}`}
              title="Toggle offline (demo)"
            >
              {isOffline ? "📵 offline" : "📶 online"}
            </button>
          </div>
        </div>

        {/* Feature pill row: active song */}
        <div className="flex gap-2">
          <FeaturePill
            type="song"
            label="505 — Arctic Monkeys"
            onPress={() => setShowSyncedLyrics(true)}
          />
        </div>
      </div>

      {/* ── Friend / stage avatars ── */}
      <div className="absolute inset-0 mt-24 mb-28 pointer-events-none">
        {groupMembers.map(member => (
          <div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{ left: `${member.location?.x}%`, top: `${member.location?.y}%` }}
            onClick={() => handleFriendClick(member)}
          >
            <div className="relative">
              {/* Pulse ring for current user */}
              {member.id === currentUser.id && (
                <div className="absolute inset-0 rounded-full bg-lime-400/20 animate-ping scale-150" />
              )}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 shadow-lg ${
                member.id === currentUser.id
                  ? "bg-lime-400 border-lime-300 shadow-lime-400/50"
                  : "bg-zinc-800 border-zinc-600"
              }`}>
                {member.avatar}
              </div>
              {/* Online dot */}
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-950 z-10" />
              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={`backdrop-blur-lg border rounded-xl px-3 py-1.5 ${
                  member.id === currentUser.id
                    ? "bg-lime-400 border-lime-300"
                    : "bg-zinc-900/95 border-zinc-700"
                }`}>
                  <p className={`text-sm ${member.id === currentUser.id ? "text-black" : "text-white"}`}>
                    {member.id === currentUser.id ? "Ada · You" : member.name}
                  </p>
                  {member.id !== currentUser.id && (
                    <p className="text-lime-400 text-xs">{member.distance}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Festival stage markers + lineup buttons when in festival mode */}
        {mapView === "festival" && activeEvent?.stages.map(stage => (
          <div
            key={stage.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
            style={{ left: `${stage.location.x}%`, top: `${stage.location.y}%` }}
          >
            {/* Lineup button — above the stage marker */}
            <button
              onClick={() => setSelectedStage(stage.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs shadow-lg border border-white/20 backdrop-blur-md active:scale-95 transition-transform"
              style={{ backgroundColor: stage.color + "dd" }}
            >
              <Music className="w-3 h-3" />
              <span>Lineup</span>
            </button>

            {/* Stage dot */}
            <div
              className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow-lg"
              style={{ backgroundColor: stage.color }}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom-right FABs ── */}
      <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-3">
        {/* Map style picker */}
        <button
          onClick={() => setShowMapPicker(true)}
          className={`w-12 h-12 rounded-2xl backdrop-blur-lg border flex items-center justify-center shadow-lg transition-all ${
            showMapPicker
              ? "bg-lime-400 border-lime-300 text-black"
              : "bg-zinc-900/90 border-zinc-700/80 text-zinc-200"
          }`}
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Recenter */}
        <button className="w-12 h-12 bg-zinc-900/90 backdrop-blur-lg border border-zinc-700/80 rounded-2xl flex items-center justify-center text-zinc-200 shadow-lg">
          <Locate className="w-5 h-5" />
        </button>

        {/* Visibility */}
        <button
          onClick={() => setShowVisibilitySheet(true)}
          className="w-12 h-12 bg-zinc-900/90 backdrop-blur-lg border border-zinc-700/80 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Eye className={`w-5 h-5 ${
            visibilityMode === "ghost" ? "text-zinc-500" : visibilityMode === "approximate" ? "text-amber-400" : "text-lime-400"
          }`} />
        </button>
      </div>

      {/* ── Bottom-left: Invite ── */}
      <div className="absolute bottom-24 left-4 z-20">
        <button
          onClick={() => setShowInviteSheet(true)}
          className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center shadow-lg shadow-lime-400/30"
        >
          <Plus className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* ── Map Style Picker sheet ── */}
      {showMapPicker && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setShowMapPicker(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-xl">Map Appearance</h2>
              <button
                onClick={() => setShowMapPicker(false)}
                className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-2">
              {MAP_OPTIONS.map(opt => {
                const isFestivalLocked = opt.id === "festival" && !activeEvent?.hasOfflineMap;
                return (
                  <button
                    key={opt.id}
                    onClick={() => !isFestivalLocked && handleSelectMapView(opt.id)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      isFestivalLocked
                        ? "bg-zinc-800/50 border-zinc-700/50 text-zinc-600 cursor-not-allowed"
                        : mapView === opt.id
                        ? "bg-lime-400/15 border-lime-400 text-lime-400"
                        : "bg-zinc-800 border-zinc-700 text-zinc-300"
                    }`}
                  >
                    {opt.icon}
                    <span className="text-xs">{opt.label}</span>
                    {isFestivalLocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="w-3 h-3 text-zinc-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {!activeEvent?.hasOfflineMap && (
              <p className="text-zinc-500 text-xs text-center mt-1 mb-2">
                🔒 Download the festival map in <span className="text-zinc-300">My Events</span> to unlock Festival view
              </p>
            )}
            <p className="text-zinc-600 text-xs text-center mt-1">
              {MAP_OPTIONS.find(o => o.id === mapView)?.desc}
            </p>
          </div>
        </div>
      )}

      {/* ── Stage Lineup Sheet ── */}
      {selectedStage && activeEvent && (() => {
        const stage = activeEvent.stages.find(s => s.id === selectedStage);
        const artists = activeEvent.artists.filter(a => a.stage === stage?.name);
        if (!stage) return null;
        return (
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setSelectedStage(null)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl p-6 pb-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-5" />

              {/* Stage header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stage.color + "33", border: `2px solid ${stage.color}` }}
                >
                  <Music className="w-5 h-5" style={{ color: stage.color }} />
                </div>
                <div>
                  <h2 className="text-white text-xl">{stage.name}</h2>
                  <p className="text-zinc-400 text-xs">Sziget Festival 2026 · Today's lineup</p>
                </div>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="ml-auto w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Artist list */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {artists.map(artist => (
                  <div
                    key={artist.id}
                    className="flex items-center justify-between p-3.5 bg-zinc-800 rounded-xl border border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-8 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <div>
                        <p className="text-white text-sm">{artist.name}</p>
                        <p className="text-zinc-500 text-xs">{artist.genre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{artist.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Sheets & Overlays ── */}
      {showCreateSheet && (
        <CreateGroupSheet
          onClose={() => setShowCreateSheet(false)}
          onCreate={handleCreateGroup}
        />
      )}

      {showInviteSheet && userGroups.length > 0 && (
        <InviteSheet
          groupName={userGroups[0].name}
          inviteCode={userGroups[0].inviteCode}
          onClose={() => setShowInviteSheet(false)}
        />
      )}

      {showGroupSheet && (
        <MyGroupsSheet
          groups={userGroups}
          onClose={() => setShowGroupSheet(false)}
          onCreateGroup={() => { setShowGroupSheet(false); setShowCreateSheet(true); }}
          onJoinGroup={() => { setShowGroupSheet(false); setShowJoinScreen(true); }}
          onGroupSettings={() => { setShowGroupSheet(false); setShowGroupSettings(true); }}
        />
      )}

      {showGroupSettings && userGroups.length > 0 && (
        <GroupSettingsSheet
          groupName={userGroups[0].name}
          visibility={userGroups[0].visibility}
          onClose={() => setShowGroupSettings(false)}
          onChangeVisibility={() => { setShowGroupSettings(false); setShowVisibilitySheet(true); }}
          onChangeName={() => { setShowGroupSettings(false); setShowCreateSheet(true); }}
          onInvite={() => { setShowGroupSettings(false); setShowInviteSheet(true); }}
          onDelete={() => setShowGroupSettings(false)}
        />
      )}

      {/* Visibility sheet */}
      {showVisibilitySheet && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowVisibilitySheet(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6" />
            <h2 className="text-xl text-white mb-6">My Visibility</h2>
            <div className="space-y-3 mb-6">
              {(["precise", "approximate", "ghost"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setVisibilityMode(mode); setShowVisibilitySheet(false); }}
                  className={`w-full p-4 rounded-xl border ${
                    visibilityMode === mode
                      ? "bg-lime-400/10 border-lime-400 text-lime-400"
                      : "bg-zinc-800 border-zinc-700 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="capitalize">{mode}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {mode === "precise" ? "Exact location shared" : mode === "approximate" ? "Within ~500m area" : "Hidden from everyone"}
                      </p>
                    </div>
                    {visibilityMode === mode && <div className="w-2.5 h-2.5 bg-lime-400 rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Friend actions sheet */}
      {showFriendActions && selectedFriend && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowFriendActions(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-3xl border-2 border-zinc-700">
                {selectedFriend.avatar}
              </div>
              <div>
                <h2 className="text-xl text-white">{selectedFriend.name}</h2>
                <p className="text-lime-400">{selectedFriend.distance} away</p>
                <p className="text-zinc-400 text-sm">{selectedFriend.lastSeen}</p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleOnMyWay}
                className="w-full p-4 bg-lime-400 rounded-xl text-black flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                <span>On my way</span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Poke</span>
                </button>
                <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Rally Pin</span>
                </button>
              </div>
              <button className="w-full p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 flex items-center justify-center gap-2">
                <Radio className="w-5 h-5" />
                <span>Lost Friend / SOS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation overlay */}
      {showNavigation && selectedFriend && (
        <div className="absolute inset-0 z-50 overflow-hidden">
          {/* Map underneath */}
          <DefaultMapLayer />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col p-6 pt-16">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-lime-400 shadow-lg shadow-lime-400/30">
                {selectedFriend.avatar}
              </div>
              <h2 className="text-2xl text-white mb-1">To {selectedFriend.name}</h2>
              <p className="text-lime-400 text-4xl mb-1">{selectedFriend.distance}</p>
              <p className="text-zinc-400 text-sm">ETA ~3 min</p>
            </div>

            {/* Direction compass */}
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-zinc-700 bg-zinc-900/80" />
              <Navigation className="w-24 h-24 text-lime-400 animate-pulse relative z-10" style={{ filter: "drop-shadow(0 0 12px #84cc16)" }} />
            </div>

            <div className="space-y-3 mt-auto">
              <button
                onClick={handleARNavigation}
                className="w-full p-4 bg-lime-400 rounded-xl text-black flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                <span>Switch to AR View</span>
              </button>
              <button
                onClick={() => setShowNavigation(false)}
                className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AR view overlay */}
      {showARView && (
        <div className="absolute inset-0 bg-zinc-950 z-50 overflow-hidden">
          {/* Simulated camera feed */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950">
            {/* Fake scene elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-zinc-950/60" />
            <div className="absolute bottom-32 left-0 right-0 h-32 bg-zinc-800/40" />
            {/* Horizon line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-600/40" />
          </div>

          {/* AR overlays */}
          <div className="absolute inset-0 flex flex-col items-center">
            {/* Distance badge */}
            <div className="mt-16 px-5 py-2 bg-lime-400 rounded-full text-black shadow-lg shadow-lime-400/40">
              <span className="text-sm">→ {selectedFriend?.name} · 140m</span>
            </div>

            {/* Direction cone */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-l-transparent border-r-transparent border-b-lime-400/70 animate-pulse" />
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-4 h-24 bg-gradient-to-b from-lime-400/50 to-transparent" />
              </div>
            </div>

            {/* Bottom info */}
            <div className="mb-32 px-6 w-full">
              <div className="bg-zinc-900/90 backdrop-blur-lg border border-zinc-700 rounded-2xl p-4 text-center">
                <p className="text-zinc-400 text-sm">Walk straight ahead</p>
                <p className="text-white text-lg mt-1">Following {selectedFriend?.name}…</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reunion overlay */}
      {showReunion && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-32 h-32 rounded-full bg-lime-400 flex items-center justify-center text-6xl mx-auto mb-6 animate-bounce shadow-2xl shadow-lime-400/50">
              🎉
            </div>
            <h2 className="text-3xl text-white mb-3">Reunion!</h2>
            <p className="text-lime-400 text-xl mb-8">You found {selectedFriend?.name}!</p>
            <button className="px-8 py-4 bg-lime-400 rounded-xl text-black">
              Take a Photo
            </button>
          </div>
        </div>
      )}

      {/* Synced lyrics overlay */}
      {showSyncedLyrics && (
        <SyncedLyrics
          onClose={() => setShowSyncedLyrics(false)}
          song={{ title: "505", artist: "Arctic Monkeys" }}
        />
      )}

      {/* Offline state detail screen */}
      {showOfflineState && (
        <OfflineState onClose={() => setShowOfflineState(false)} />
      )}
    </div>
  );
}
