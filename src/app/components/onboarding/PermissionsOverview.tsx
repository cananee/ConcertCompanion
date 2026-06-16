import { MapPin, Bluetooth, Camera, Bell, ChevronRight } from "lucide-react";

interface PermissionsOverviewProps {
  onNext: () => void;
}

export function PermissionsOverview({ onNext }: PermissionsOverviewProps) {
  const permissions = [
    {
      icon: MapPin,
      title: "Location",
      description: "Share your location to help friends find you and navigate to meetup points",
    },
    {
      icon: Bluetooth,
      title: "Bluetooth",
      description: "Detect nearby friends and improve location accuracy in crowded venues",
    },
    {
      icon: Camera,
      title: "Camera",
      description: "Capture memories and use AR navigation to find friends in real-time",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Get alerts when friends are nearby or send you rally points",
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col p-8">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl mb-3 text-center">Allow the App These Permissions</h1>
        <p className="text-zinc-400 text-center mb-10">
          We need a few permissions to help you find your friends
        </p>

        <div className="space-y-4 max-w-md mx-auto w-full">
          {permissions.map((permission, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
            >
              <div className="w-12 h-12 bg-lime-400/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <permission.icon className="w-6 h-6 text-lime-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1">{permission.title}</h3>
                <p className="text-sm text-zinc-400">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full px-8 py-4 bg-lime-400 text-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/30"
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-center text-zinc-500">
          You can change these settings anytime in your profile
        </p>
      </div>
    </div>
  );
}
