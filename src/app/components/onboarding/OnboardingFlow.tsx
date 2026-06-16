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

// Flow after Personalization:
// 9  – Solo map (Ada only, "My Groups", notification pushes to 10)
// 10 – Empty state ("Your world looks a little empty…")
//      → CreateGroupSheet slides up; on create → waiting overlay for 5s → step 11
// 11 – Friends joined screen → onComplete

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [awaitingFriends, setAwaitingFriends] = useState(false);
  const [createdGroupName, setCreatedGroupName] = useState("Crew");
  const { createGroup } = useApp();

  const nextStep = () => setStep((prev) => prev + 1);

  const permissions = [
    {
      title: "Allow Location Services",
      description: "Share your location to help friends find you at festivals and events",
      illustration: "📍",
    },
    {
      title: "Allow Background Location",
      description: "Keep your location updated even when the app is in the background",
      illustration: "🗺️",
    },
    {
      title: "Allow Bluetooth",
      description: "Detect nearby friends and improve accuracy in crowded venues",
      illustration: "📡",
    },
    {
      title: "Allow Camera Access",
      description: "Use AR navigation and capture memories with your crew",
      illustration: "📸",
    },
    {
      title: "Get Notifications",
      description: "Stay updated when friends are nearby or send you rally points",
      illustration: "🔔",
    },
  ];

  const handleCreateGroup = (name: string) => {
    createGroup(name, 4);
    setCreatedGroupName(name);
    setShowCreateSheet(false);
    setAwaitingFriends(true);
    // After 5 seconds show friends-joined screen
    setTimeout(() => {
      setAwaitingFriends(false);
      setStep(11);
    }, 5000);
  };

  return (
    <div className="h-full bg-black overflow-hidden relative">
      {step === 0 && <IntroScreen onNext={nextStep} />}
      {step === 1 && <MapPreview onNext={nextStep} />}
      {step === 2 && <PermissionsOverview onNext={nextStep} />}
      {step >= 3 && step <= 7 && (
        <PermissionScreen
          {...permissions[step - 3]}
          onAllow={nextStep}
          onSkip={step < 7 ? nextStep : undefined}
        />
      )}
      {step === 8 && <Personalization onComplete={nextStep} />}

      {/* Solo map: Ada only, "My Groups" header, notification nudge */}
      {step === 9 && <SoloMapScreen onNotificationTap={nextStep} />}

      {/* Empty state: "Your world looks a little empty…" */}
      {step === 10 && <EmptyStateScreen onCreateGroup={() => setShowCreateSheet(true)} />}

      {/* Friends joined notification */}
      {step === 11 && (
        <FriendsJoinedScreen groupName={createdGroupName} onContinue={onComplete} />
      )}

      {/* Create group sheet — overlays step 10 */}
      {showCreateSheet && (
        <CreateGroupSheet
          initialName="Crew"
          onClose={() => setShowCreateSheet(false)}
          onCreate={handleCreateGroup}
        />
      )}

      {/* Waiting overlay after group created, before friends join */}
      {awaitingFriends && (
        <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-5 z-50">
          <div className="w-16 h-16 rounded-2xl bg-lime-400/20 flex items-center justify-center mb-2">
            <span className="text-4xl">🎉</span>
          </div>
          <p className="text-white text-lg">Group created!</p>
          <p className="text-zinc-400 text-sm">Waiting for friends to join…</p>
          <div className="flex gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 250}ms` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
