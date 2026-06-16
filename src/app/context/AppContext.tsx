import { createContext, useContext, useState, ReactNode } from "react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  location?: { x: number; y: number };
  distance?: string;
  lastSeen?: string;
  currentEvent?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  imageUrl?: string;
  stages: Stage[];
  artists: Artist[];
  isActive: boolean;
  hasOfflineMap: boolean;
}

interface Stage {
  id: string;
  name: string;
  location: { x: number; y: number };
  color: string;
}

interface Artist {
  id: string;
  name: string;
  stage: string;
  time: string;
  genre: string;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  visibility: string;
  inviteCode: string;
}

interface AppContextType {
  currentUser: Friend;
  groupName: string;
  groupMembers: Friend[];
  festivalMode: boolean;
  setFestivalMode: (mode: boolean) => void;
  visibilityMode: "precise" | "approximate" | "ghost";
  setVisibilityMode: (mode: "precise" | "approximate" | "ghost") => void;
  activeEvent: Event | null;
  setActiveEvent: (event: Event | null) => void;
  events: Event[];
  updateEventOfflineMap: (eventId: string, hasMap: boolean) => void;
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend | null) => void;
  showNavigation: boolean;
  setShowNavigation: (show: boolean) => void;
  showReunion: boolean;
  setShowReunion: (show: boolean) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  userGroups: Group[];
  hasGroup: boolean;
  createGroup: (name: string, memberCount?: number) => Group;
  joinGroup: (code: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [festivalMode, setFestivalMode] = useState(false);
  const [visibilityMode, setVisibilityMode] = useState<"precise" | "approximate" | "ghost">("precise");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showReunion, setShowReunion] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem("onboarding_completed") === "true";
  });
  const [userGroups, setUserGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem("user_groups");
    return saved ? JSON.parse(saved) : [];
  });

  const completeOnboarding = () => {
    localStorage.setItem("onboarding_completed", "true");
    setHasCompletedOnboarding(true);
  };

  const generateInviteCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const createGroup = (name: string, memberCount = 1): Group => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      memberCount,
      visibility: "Sharing exact location",
      inviteCode: generateInviteCode(),
    };
    const updated = [...userGroups, newGroup];
    setUserGroups(updated);
    localStorage.setItem("user_groups", JSON.stringify(updated));
    // Global registry so others can find the group by code
    localStorage.setItem(`group_code_${newGroup.inviteCode}`, JSON.stringify(newGroup));
    return newGroup;
  };

  const joinGroup = (code: string): boolean => {
    const raw = localStorage.getItem(`group_code_${code}`);
    if (!raw) return false;
    const found: Group = JSON.parse(raw);
    const joinedGroup: Group = {
      id: Date.now().toString(),
      name: found.name,
      memberCount: found.memberCount + 1,
      visibility: "Sharing exact location",
      inviteCode: code,
    };
    const updated = [...userGroups, joinedGroup];
    setUserGroups(updated);
    localStorage.setItem("user_groups", JSON.stringify(updated));
    return true;
  };

  const currentUser: Friend = {
    id: "ada",
    name: "Ada",
    avatar: "🎨",
    status: "online",
    location: { x: 50, y: 50 },
  };

  const groupMembers: Friend[] = [
    currentUser,
    {
      id: "mert",
      name: "Mert",
      avatar: "🎸",
      status: "online",
      location: { x: 65, y: 40 },
      distance: "240m",
      lastSeen: "2 min ago",
      currentEvent: "Main Stage",
    },
    {
      id: "lina",
      name: "Lina",
      avatar: "🎭",
      status: "online",
      location: { x: 35, y: 60 },
      distance: "180m",
      lastSeen: "just now",
      currentEvent: "Forest Stage",
    },
    {
      id: "deniz",
      name: "Deniz",
      avatar: "🎪",
      status: "online",
      location: { x: 55, y: 70 },
      distance: "320m",
      lastSeen: "5 min ago",
    },
  ];

  const szigetEvent: Event = {
    id: "sziget",
    name: "Sziget Festival 2026",
    date: "Aug 10–15, 2026",
    location: "Budapest, Hungary",
    isActive: true,
    hasOfflineMap: false,
    stages: [
      { id: "main",     name: "Main Stage",           location: { x: 50, y: 22 }, color: "#7c3aed" },
      { id: "heineken", name: "Heineken Music Hall",   location: { x: 28, y: 54 }, color: "#16a34a" },
      { id: "volt",     name: "Volt Stage",            location: { x: 72, y: 54 }, color: "#d97706" },
    ],
    artists: [
      { id: "1",  name: "Arctic Monkeys",       stage: "Main Stage",         time: "21:00 – 23:00", genre: "Rock" },
      { id: "2",  name: "Billie Eilish",         stage: "Main Stage",         time: "19:00 – 20:30", genre: "Pop" },
      { id: "3",  name: "Dua Lipa",              stage: "Main Stage",         time: "17:00 – 18:30", genre: "Pop" },
      { id: "4",  name: "Calvin Harris",         stage: "Main Stage",         time: "23:30 – 01:00", genre: "EDM" },
      { id: "5",  name: "The Chemical Brothers", stage: "Heineken Music Hall", time: "22:00 – 00:00", genre: "Electronic" },
      { id: "6",  name: "Jamie xx",              stage: "Heineken Music Hall", time: "20:00 – 21:30", genre: "Electronic" },
      { id: "7",  name: "Four Tet",              stage: "Heineken Music Hall", time: "18:00 – 19:30", genre: "Electronic" },
      { id: "8",  name: "Tame Impala",           stage: "Volt Stage",          time: "20:00 – 21:30", genre: "Psychedelic" },
      { id: "9",  name: "Glass Animals",         stage: "Volt Stage",          time: "18:00 – 19:30", genre: "Indie" },
      { id: "10", name: "Idles",                 stage: "Volt Stage",          time: "22:00 – 23:30", genre: "Post-Punk" },
    ],
  };

  const [events, setEvents] = useState<Event[]>([szigetEvent]);
  const [activeEvent, setActiveEvent] = useState<Event | null>(szigetEvent);

  const updateEventOfflineMap = (eventId: string, hasMap: boolean) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId ? { ...event, hasOfflineMap: hasMap } : event
      )
    );
    if (activeEvent?.id === eventId) {
      setActiveEvent(prev => prev ? { ...prev, hasOfflineMap: hasMap } : null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        groupName: userGroups.length > 0 ? userGroups[0].name : "Crew",
        groupMembers,
        festivalMode,
        setFestivalMode,
        visibilityMode,
        setVisibilityMode,
        activeEvent,
        setActiveEvent,
        events,
        updateEventOfflineMap,
        selectedFriend,
        setSelectedFriend,
        showNavigation,
        setShowNavigation,
        showReunion,
        setShowReunion,
        hasCompletedOnboarding,
        completeOnboarding,
        userGroups,
        hasGroup: userGroups.length > 0,
        createGroup,
        joinGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
