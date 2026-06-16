import { useState, useMemo, useCallback, useEffect } from "react";
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
import { FestivalMapLayer } from "./MapLayers";
import { RealMapView, MapMember, RealMapMode } from "./RealMapView";
import { ARCameraView } from "./ARCameraView";
import { OfflineBanner } from "./shared";
import { OfflineState } from "./OfflineState";
import { useGeolocation, DEFAULT_LOCATION } from "../hooks/useGeolocation";

type MapView = "default" | "satellite" | "festival" | "compass" | "ar";

const MAP_OPTIONS: { id: MapView; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "default",   label: "Default",   icon: <Map className="w-5 h-5" />,       desc: "Dark street map" },
  { id: "satellite", label: "Satellite", icon: <Satellite className="w-5 h-5" />, desc: "Aerial view" },
  { id: "festival",  label: "Festival",  icon: <Zap className="w-5 h-5" />,       desc: "Stages & grounds" },
  { id: "compass",   label: "Compass",   icon: <Compass className="w-5 h-5" />,   desc: "Heading-locked" },
  { id: "ar",        label: "AR",        icon: <Camera className="w-5 h-5" />,    desc: "Augmented reality" },
];

// Fixed offsets (metres N/E) for mock friends relative to user
const MEMBER_OFFSETS: Record<string, { n: number; e: number }> = {
  mert:  { n: 180,  e: 160  },
  lina:  { n: -120, e: 130  },
  deniz: { n: 250,  e: -200 },
};

function toMapMembers(
  members: ReturnType<typeof useApp>["groupMembers"],
  currentUserId: string,
  lat: number,
  lng: number
): MapMember[] {
  const metersPerLat = 111320;
  const metersPerLng = 111320 * Math.cos((lat * Math.PI) / 180);
  return members.map((m) => {
    const off = m.id === currentUserId ? { n: 0, e: 0 } : (MEMBER_OFFSETS[m.id] ?? { n: 100, e: 100 });
    return {
      id: m.id,
      name: m.name,
      avatar: m.avatar,
      lat: lat + off.n / metersPerLat,
      lng: lng + off.e / metersPerLng,
      isCurrentUser: m.id === currentUserId,
      distance: m.distance,
      status: m.status,
    };
  });
}

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

  const { location, status: geoStatus, request: requestGeo, watch: watchGeo } = useGeolocation();

  const [mapView, setMapView]                   = useState<MapView>("default");
  const [recenterTrigger, setRecenterTrigger]   = useState(0);
  const [showCreateSheet, setShowCreateSheet]   = useState(false);
  const [showGroupSheet, setShowGroupSheet]     = useState(false);
  const [showInviteSheet, setShowInviteSheet]   = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showJoinScreen, setShowJoinScreen]     = useState(false);
  const [showVisibilitySheet, setShowVisibilitySheet] = useState(false);
  const [showFriendActions, setShowFriendActions] = useState(false);
  const [showMapPicker, setShowMapPicker]       = useState(false);
  const [showARView, setShowARView]             = useState(false);
  const [showOfflineState, setShowOfflineState] = useState(false);
  const [isOffline, setIsOffline]               = useState(false);
  const [selectedStage, setSelectedStage]       = useState<string | null>(null);

  // Start GPS on mount
  useEffect(() => {
    if (geoStatus === "idle") requestGeo();
    const stop = watchGeo();
    return stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLat = location.lat;
  const userLng = location.lng;

  const mapMembers = useMemo(
    () => toMapMembers(groupMembers, currentUser.id, userLat, userLng),
    [groupMembers, currentUser.id, userLat, userLng]
  );

  const handleMemberClick = useCallback(
    (id: string) => {
      if (id === currentUser.id) return;
      const friend = groupMembers.find((m) => m.id === id) ?? null;
      setSelectedFriend(friend);
      setShowFriendActions(true);
    },
    [groupMembers, currentUser.id, setSelectedFriend]
  );

  const handleOnMyWay = () => {
    setShowFriendActions(false);
    setShowNavigation(true);
  };

  const handleARNavigation = () => {
    setShowNavigation(false);
    setShowARView(true);
  };

  const handleReunited = () => {
    setShowARView(false);
    setShowReunion(true);
    setTimeout(() => setShowReunion(false), 3500);
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

  const realMode: RealMapMode =
    mapView === "satellite" ? "satellite"
    : mapView === "compass"  ? "compass"
    : "default";

  return (
    <div className="relative h-full bg-[#0A0A0F] overflow-hidden">

      {/* ── Map layer ── */}
      {mapView === "festival" ? (
        <div className="absolute inset-0">
          <FestivalMapLayer />
          {/* Festival stage markers */}
          <div className="absolute inset-0 mt-20 mb-24 pointer-events-none">
            {activeEvent?.stages.map((stage) => (
              <div
                key={stage.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-auto"
                style={{ left: `${stage.location.x}%`, top: `${stage.location.y}%` }}
              >
                <button
                  onClick={() => setSelectedStage(stage.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs shadow-lg border border-white/20 backdrop-blur-md active:scale-95 transition-transform"
                  style={{ backgroundColor: stage.color + "dd" }}
                >
                  <Music className="w-3 h-3" />
                  <span>Lineup</span>
                </button>
                <div
                  className="w-5 h-5 rounded-full border-2 border-[#0A0A0F] shadow-lg"
                  style={{ backgroundColor: stage.color }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <RealMapView
          mode={realMode}
          center={[userLat, userLng]}
          zoom={16}
          members={mapMembers}
          onMemberClick={handleMemberClick}
          recenterTrigger={recenterTrigger}
        />
      )}

      {/* ── GPS status pill ── */}
      {geoStatus === "loading" && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141420]/90 backdrop-blur-md rounded-full border border-white/10">
            <div className="w-3 h-3 border-2 border-[#4CAF77] border-t-transparent rounded-full animate-spin" />
            <span className="text-white/70 text-xs">Finding your location…</span>
          </div>
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Group / My Groups */}
          <button
            onClick={() => setShowGroupSheet(true)}
            className="flex items-center gap-2 px-3 py-2.5 bg-[#141420]/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg min-w-0"
          >
            {hasGroup && groupMembers.length > 1 ? (
              <div className="flex -space-x-2 flex-shrink-0">
                {groupMembers.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="w-7 h-7 rounded-full bg-[#1E1E2E] flex items-center justify-center border-2 border-[#141420] text-sm"
                  >
                    {m.avatar}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#1E1E2E] flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-[#A0A0B8]" />
              </div>
            )}
            <span className="text-white text-sm truncate">
              {hasGroup && userGroups.length > 0 ? userGroups[0].name : "My Groups"}
            </span>
            <ChevronRight className="w-4 h-4 text-[#A0A0B8] flex-shrink-0" />
          </button>

          {/* Right side controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isOffline && (
              <OfflineBanner onTap={() => setShowOfflineState(true)} />
            )}
            <button
              onClick={() => setIsOffline((o) => !o)}
              className={`px-2.5 py-2 rounded-xl text-xs border backdrop-blur-lg ${
                isOffline
                  ? "bg-[#F5A623]/15 border-[#F5A623]/30 text-[#F5A623]"
                  : "bg-[#141420]/90 border-white/10 text-[#A0A0B8]"
              }`}
              title="Simulate offline"
            >
              {isOffline ? "📵" : "📶"}
            </button>
          </div>
        </div>
      </div>

      {/* ── FABs (right) ── */}
      <div className="absolute bottom-28 right-4 z-20 flex flex-col gap-3">
        <button
          onClick={() => setShowMapPicker(true)}
          className={`w-12 h-12 rounded-2xl backdrop-blur-lg border flex items-center justify-center shadow-lg transition-all ${
            showMapPicker
              ? "bg-lime-400 border-lime-300 text-black"
              : "bg-[#141420]/90 border-white/10 text-[#A0A0B8]"
          }`}
        >
          <Layers className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRecenterTrigger((n) => n + 1)}
          className="w-12 h-12 bg-[#141420]/90 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-[#A0A0B8] shadow-lg active:scale-95 transition-transform"
        >
          <Locate className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowVisibilitySheet(true)}
          className="w-12 h-12 bg-[#141420]/90 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <Eye className={`w-5 h-5 ${
            visibilityMode === "ghost" ? "text-[#A0A0B8]"
            : visibilityMode === "approximate" ? "text-[#F5A623]"
            : "text-[#4CAF77]"
          }`} />
        </button>
      </div>

      {/* ── Invite FAB (left) ── */}
      <div className="absolute bottom-28 left-4 z-20">
        <button
          onClick={() => {
            if (hasGroup && userGroups.length > 0) {
              setShowInviteSheet(true);
            } else {
              setShowCreateSheet(true);
            }
          }}
          className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center shadow-lg shadow-lime-400/30 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* ── Map style picker ── */}
      {showMapPicker && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowMapPicker(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-xl font-semibold">Map Style</h2>
              <button onClick={() => setShowMapPicker(false)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {MAP_OPTIONS.map((opt) => {
                const locked = opt.id === "festival" && !activeEvent?.hasOfflineMap;
                return (
                  <button
                    key={opt.id}
                    onClick={() => !locked && handleSelectMapView(opt.id)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all active:scale-95 ${
                      locked
                        ? "bg-[#1E1E2E]/50 border-white/5 text-[#A0A0B8]/40 cursor-not-allowed"
                        : mapView === opt.id
                        ? "bg-lime-400/15 border-lime-400 text-lime-400"
                        : "bg-[#1E1E2E] border-white/10 text-[#A0A0B8]"
                    }`}
                  >
                    {opt.icon}
                    <span className="text-xs">{opt.label}</span>
                    {locked && <Lock className="absolute top-2 right-2 w-3 h-3 text-[#A0A0B8]/40" />}
                  </button>
                );
              })}
            </div>
            {!activeEvent?.hasOfflineMap && (
              <p className="text-[#A0A0B8] text-xs text-center">
                🔒 Download the festival map in <span className="text-white">My Events</span> to unlock Festival view
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Stage lineup sheet ── */}
      {selectedStage && activeEvent && (() => {
        const stage = activeEvent.stages.find((s) => s.id === selectedStage);
        const artists = activeEvent.artists.filter((a) => a.stage === stage?.name);
        if (!stage) return null;
        return (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setSelectedStage(null)}>
            <div className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl p-6 pb-12" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stage.color + "33", border: `2px solid ${stage.color}` }}>
                  <Music className="w-5 h-5" style={{ color: stage.color }} />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold">{stage.name}</h2>
                  <p className="text-[#A0A0B8] text-xs">Today's lineup</p>
                </div>
                <button onClick={() => setSelectedStage(null)} className="ml-auto w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {artists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between p-3.5 bg-[#1E1E2E] rounded-xl border border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 rounded-full" style={{ backgroundColor: stage.color }} />
                      <div>
                        <p className="text-white text-sm">{artist.name}</p>
                        <p className="text-[#A0A0B8] text-xs">{artist.genre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#A0A0B8]">
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

      {/* ── Sheets ── */}
      {showCreateSheet && (
        <CreateGroupSheet onClose={() => setShowCreateSheet(false)} onCreate={handleCreateGroup} />
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
          <div className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
            <h2 className="text-xl text-white font-semibold mb-5">My Visibility</h2>
            <div className="space-y-3">
              {(["precise", "approximate", "ghost"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => { setVisibilityMode(mode); setShowVisibilitySheet(false); }}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    visibilityMode === mode
                      ? "bg-[#4CAF77]/10 border-[#4CAF77] text-[#4CAF77]"
                      : "bg-[#1E1E2E] border-white/10 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="capitalize font-medium">{mode}</p>
                      <p className="text-xs mt-0.5 opacity-70">
                        {mode === "precise" ? "Exact location shared"
                          : mode === "approximate" ? "Within ~500m area"
                          : "Hidden from everyone"}
                      </p>
                    </div>
                    {visibilityMode === mode && <div className="w-2.5 h-2.5 bg-[#4CAF77] rounded-full" />}
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
          <div className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#1E1E2E] flex items-center justify-center text-3xl border-2 border-white/10">
                {selectedFriend.avatar}
              </div>
              <div>
                <h2 className="text-xl text-white font-semibold">{selectedFriend.name}</h2>
                <p className="text-[#4CAF77] text-sm">{selectedFriend.distance} away</p>
                <p className="text-[#A0A0B8] text-sm">{selectedFriend.lastSeen}</p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleOnMyWay}
                className="w-full p-4 bg-lime-400 rounded-xl text-black flex items-center justify-center gap-2 font-semibold active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-5 h-5" />
                <span>On my way</span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-[#1E1E2E] border border-white/10 rounded-xl text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                  <MessageCircle className="w-5 h-5" />
                  <span>Poke</span>
                </button>
                <button className="p-4 bg-[#1E1E2E] border border-white/10 rounded-xl text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                  <MapPin className="w-5 h-5" />
                  <span>Rally Pin</span>
                </button>
              </div>
              <button className="w-full p-4 bg-[#E05C5C]/15 border border-[#E05C5C]/40 rounded-xl text-[#E05C5C] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                <Radio className="w-5 h-5" />
                <span>Lost Friend / SOS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Walk-to-friend navigation */}
      {showNavigation && selectedFriend && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0F]">
          <div className="absolute inset-0 flex flex-col p-6 pt-16">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#1E1E2E] flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-lime-400 shadow-lg shadow-lime-400/20">
                {selectedFriend.avatar}
              </div>
              <h2 className="text-2xl text-white font-bold mb-1">To {selectedFriend.name}</h2>
              <p className="text-lime-400 text-4xl font-bold mb-1">{selectedFriend.distance}</p>
              <p className="text-[#A0A0B8] text-sm">ETA ~3 min</p>
            </div>
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 bg-[#141420]/80" />
              <Navigation className="w-24 h-24 text-lime-400 animate-pulse relative z-10" style={{ filter: "drop-shadow(0 0 12px #84cc16)" }} />
            </div>
            <div className="space-y-3 mt-auto">
              <button
                onClick={handleARNavigation}
                className="w-full p-4 bg-lime-400 rounded-xl text-black flex items-center justify-center gap-2 font-semibold active:scale-[0.98] transition-transform"
              >
                <Camera className="w-5 h-5" />
                <span>Switch to AR View</span>
              </button>
              <button
                onClick={() => setShowNavigation(false)}
                className="w-full p-4 bg-[#1E1E2E] border border-white/10 rounded-xl text-white active:scale-[0.98] transition-transform"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AR camera view */}
      {showARView && selectedFriend && (
        <ARCameraView
          friendName={selectedFriend.name}
          friendAvatar={selectedFriend.avatar}
          distance={selectedFriend.distance}
          onClose={() => setShowARView(false)}
          onReunited={handleReunited}
        />
      )}

      {/* Reunion overlay */}
      {showReunion && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-32 h-32 rounded-full bg-lime-400 flex items-center justify-center text-6xl mx-auto mb-6 animate-bounce shadow-2xl shadow-lime-400/50">
              🎉
            </div>
            <h2 className="text-3xl text-white font-bold mb-3">Reunion!</h2>
            <p className="text-lime-400 text-xl mb-8">You found {selectedFriend?.name}!</p>
            <button
              onClick={() => setShowReunion(false)}
              className="px-8 py-4 bg-lime-400 rounded-xl text-black font-semibold active:scale-[0.98] transition-transform"
            >
              Back to Map
            </button>
          </div>
        </div>
      )}

      {/* Offline detail screen */}
      {showOfflineState && <OfflineState onClose={() => setShowOfflineState(false)} />}
    </div>
  );
}
