import { useEffect, useState, useCallback } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const restart = useCallback(() => {
    // Clear onboarding state so it restarts from scratch
    localStorage.removeItem("onboarding_completed");
    localStorage.removeItem("user_groups");
    setShowSplash(true);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === "r" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        restart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [restart]);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <AppProvider key={resetKey}>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}
