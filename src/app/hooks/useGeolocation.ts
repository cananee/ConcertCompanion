import { useState, useCallback } from "react";

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

// Fallback: Sziget Festival island centre
export const DEFAULT_LOCATION: GeoLocation = { lat: 47.5499, lng: 19.0415 };

export type GeoStatus = "idle" | "loading" | "ok" | "denied" | "unavailable";

export function useGeolocation() {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);
  const [status, setStatus] = useState<GeoStatus>("idle");

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setStatus("ok");
      },
      () => {
        setStatus("denied");
        setLocation(DEFAULT_LOCATION);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  const watch = useCallback(() => {
    if (!navigator.geolocation) return () => {};
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setStatus("ok");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return { location, status, request, watch };
}
