import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type RealMapMode = "default" | "satellite" | "compass";

export interface MapMember {
  id: string;
  name: string;
  avatar: string;
  lat: number;
  lng: number;
  isCurrentUser?: boolean;
  distance?: string;
  status?: "online" | "offline";
}

interface RealMapViewProps {
  mode: RealMapMode;
  center: [number, number];
  zoom?: number;
  members?: MapMember[];
  onMemberClick?: (id: string) => void;
  recenterTrigger?: number;
}

const TILES = {
  default: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    opts: { subdomains: "abcd", maxZoom: 20, attribution: "© <a href='https://www.openstreetmap.org/copyright' style='color:#666'>OSM</a> © <a href='https://carto.com/attributions' style='color:#666'>CARTO</a>" },
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    opts: { maxZoom: 19, attribution: "<span style='color:#666'>© Esri</span>" },
  },
  compass: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    opts: { subdomains: "abcd", maxZoom: 20, attribution: "© OSM © CARTO" },
  },
};

function buildMarkerHtml(member: MapMember): string {
  const isUser = !!member.isCurrentUser;
  const dotColor = member.status === "offline" ? "#6b7280" : "#4CAF77";
  const ring = isUser
    ? `<div style="position:absolute;inset:0;border-radius:50%;background:rgba(132,204,22,0.25);transform:scale(1.6);animation:cc-ping 1.6s ease-out infinite;pointer-events:none;"></div>`
    : "";
  const border = isUser ? "3px solid #bef264" : "2px solid rgba(255,255,255,0.15)";
  const bg = isUser ? "#84cc16" : "#1E1E2E";
  const labelColor = isUser ? "#1a2e00" : "#ffffff";
  const distHtml =
    !isUser && member.distance
      ? `<div style="color:#4CAF77;font-size:10px;line-height:1.2;font-family:Inter,sans-serif;">${member.distance}</div>`
      : "";

  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
      <div style="position:relative;width:44px;height:44px;">
        ${ring}
        <div style="position:relative;width:44px;height:44px;border-radius:50%;background:${bg};border:${border};display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 16px rgba(0,0,0,0.45);">
          ${member.avatar}
        </div>
        <div style="position:absolute;top:0px;right:0px;width:12px;height:12px;border-radius:50%;background:${dotColor};border:2px solid #0A0A0F;"></div>
      </div>
      <div style="background:rgba(14,14,22,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:3px 8px;white-space:nowrap;backdrop-filter:blur(8px);">
        <div style="color:${labelColor};font-size:11px;font-weight:600;font-family:Inter,sans-serif;line-height:1.3;">${isUser ? `${member.name} · You` : member.name}</div>
        ${distHtml}
      </div>
    </div>
  `;
}

export function RealMapView({
  mode,
  center,
  zoom = 16,
  members = [],
  onMemberClick,
  recenterTrigger,
}: RealMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix("");

    const cfg = TILES[mode];
    const tile = L.tileLayer(cfg.url, cfg.opts as L.TileLayerOptions);
    tile.addTo(map);
    tileRef.current = tile;
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap tile layer when mode changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    tileRef.current?.remove();
    const cfg = TILES[mode];
    const tile = L.tileLayer(cfg.url, cfg.opts as L.TileLayerOptions);
    tile.addTo(map);
    tileRef.current = tile;
  }, [mode]);

  // Recenter on trigger
  useEffect(() => {
    if (recenterTrigger !== undefined && mapRef.current) {
      mapRef.current.flyTo(center, zoom, { animate: true, duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recenterTrigger]);

  // Update member markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const currentIds = new Set(members.map((m) => m.id));

    // Remove stale markers
    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    members.forEach((member) => {
      const icon = L.divIcon({
        html: buildMarkerHtml(member),
        className: "",
        iconSize: [44, 80],
        iconAnchor: [22, 22],
        popupAnchor: [0, -22],
      });

      const existing = markersRef.current.get(member.id);
      if (existing) {
        existing.setLatLng([member.lat, member.lng]);
        existing.setIcon(icon);
      } else {
        const marker = L.marker([member.lat, member.lng], { icon })
          .on("click", () => onMemberClick?.(member.id))
          .addTo(map);
        markersRef.current.set(member.id, marker);
      }
    });
  }, [members, onMemberClick]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="w-full h-full" />

      {/* Compass rose overlay (compass mode only) */}
      {mode === "compass" && (
        <div className="absolute top-20 right-4 pointer-events-none z-10">
          <div className="w-14 h-14 rounded-full bg-[#141420]/90 border border-white/15 backdrop-blur-md flex items-center justify-center">
            <svg viewBox="0 0 40 40" width="36" height="36">
              <polygon points="20,4 23,18 17,18" fill="#E05C5C" />
              <polygon points="20,36 23,22 17,22" fill="#555" />
              <polygon points="4,20 18,17 18,23" fill="#555" />
              <polygon points="36,20 22,17 22,23" fill="#555" />
              <circle cx="20" cy="20" r="3" fill="#fff" />
              <text x="20" y="3" textAnchor="middle" fontSize="5" fill="#E05C5C" fontWeight="bold" fontFamily="Inter,sans-serif">N</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
