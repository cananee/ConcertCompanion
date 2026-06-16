import { useState } from "react";
import { IntroScreen } from "./IntroScreen";
import { MapPreview } from "./MapPreview";
import { PermissionsOverview } from "./PermissionsOverview";
import { PermissionScreen } from "./PermissionScreen";
import { Personalization } from "./Personalization";
import { SoloMapScreen } from "./SoloMapScreen";
import { FriendsJoinedScreen } from "./FriendsJoinedScreen";
import { EmptyStateScreen } from "../group/EmptyStateScreen";
import { CreateGroupSheet } from "../group/CreateGroupSheet";
import { useApp } from "../../context/AppContext";

interface OnboardingFlowProps {
  onComplete: () => void;
}

// Each entry defines the UI and the real browser API to invoke
const PERMISSIONS = [
  {
    title: "Allow Location Services",
    description: "Share your location so friends can find you at festivals",
    illustration: "📍",
    request: (): Promise<void> =>
      new Promise((resolve) => {
        navigator.geolocation?.getCurrentPosition(
          () => resolve(),
          () => resolve(), // resolve even on deny so flow continues
          { enableHighAccuracy: true, timeout: 8000 }
        );
        if (!navigator.geolocation) resolve();
      }),
  },
  {
    title: "Background Location",
    description: "Keep your location updated even when the app is in the background",
    illustration: "🗺️",
    request: (): Promise<void> =>
      new Promise((resolve) => {
        // No separate browser API — same geolocation permission covers this
        navigator.geolocation?.getCurrentPosition(() => resolve(), () => resolve(), { timeout: 3000 });
        if (!navigator.geolocation) resolve();
      }),
  },
  {
    title: "Bluetooth Access",
    description: "Detect nearby friends and improve accuracy in crowded venues",
    illustration: "📡",
    request: async (): Promise<void> => {
      try {
        if ("bluetooth" in navigator) {
          // requestDevice must be triggered by user gesture — this call IS within the onClick handler
          await (navigator as any).bluetooth.requestDevice({ acceptAllDevices: true });
        }
      } catch {
        // User cancelled or unsupported — proceed anyway
      }
    },
  },
  {
    title: "Camera Access",
    description: "Use AR navigation to find friends in a crowd",
    illustration: "📸",
    request: async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices?.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        stream?.getTracks().forEach((t) => t.stop());
      } catch {
        // Denied or unavailable — proceed anyway
      }
    },
  },
  {
    title: "Notifications",
    description: "Get alerted when friends send rally points or are nearby",
    illustration: "🔔",
    request: async (): Promise<void> => {
      try {
        if ("Notification" in window) {
          await Notification.requestPermission();
        }
      } catch {
        // Proceed anyway
      }
    },
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [awaitingFriends, setAwaitingFriends] = useState(false);
  const [createdGroupName, setCreatedGroupName] = useState("Crew");
  const { createGroup } = useApp();

  const nextStep = () => setStep((prev) => prev + 1);

  const handlePermissionAllow = async (index: number): Promise<void> => {
    await PERMISSIONS[index].request();
    nextStep();
  };

  const handleCreateGroup = (name: string) => {
    createGroup(name, 4);
    setCreatedGroupName(name);
    setShowCreateSheet(false);
    setAwaitingFriends(true);
    setTimeout(() => {
      setAwaitingFriends(false);
      setStep(11);
    }, 5000);
  };

  return (
    <div className="h-full bg-[#0A0A0F] overflow-hidden relative">
      {step === 0 && <IntroScreen onNext={nextStep} />}
      {step === 1 && <MapPreview onNext={nextStep} />}
      {step === 2 && <PermissionsOverview onNext={nextStep} />}

      {step >= 3 && step <= 7 && (
        <PermissionScreen
          {...PERMISSIONS[step - 3]}
          onAllow={() => handlePermissionAllow(step - 3)}
          onSkip={step < 7 ? nextStep : undefined}
        />
      )}

      {step === 8 && <Personalization onComplete={nextStep} />}
      {step === 9 && <SoloMapScreen onNotificationTap={nextStep} />}
      {step === 10 && <EmptyStateScreen onCreateGroup={() => setShowCreateSheet(true)} />}
      {step === 11 && (
        <FriendsJoinedScreen groupName={createdGroupName} onContinue={onComplete} />
      )}

      {showCreateSheet && (
        <CreateGroupSheet
          initialName="Crew"
          onClose={() => setShowCreateSheet(false)}
          onCreate={handleCreateGroup}
        />
      )}

      {awaitingFriends && (
        <div className="absolute inset-0 bg-[#0A0A0F]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-5 z-50">
          <div className="w-16 h-16 rounded-2xl bg-lime-400/20 flex items-center justify-center mb-2 border border-lime-400/30">
            <span className="text-4xl">🎉</span>
          </div>
          <p className="text-white text-lg font-semibold">Group created!</p>
          <p className="text-[#A0A0B8] text-sm">Waiting for friends to join…</p>
          <div className="flex gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-lime-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 250}ms` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
