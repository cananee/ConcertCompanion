import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { PeopleMap } from "./components/PeopleMap";
import { Discover } from "./components/Discover";
import { MyEvents } from "./components/MyEvents";
import { Profile } from "./components/Profile";
import { EventHub } from "./components/EventHub";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: PeopleMap },
      { path: "discover", Component: Discover },
      { path: "events", Component: MyEvents },
      { path: "profile", Component: Profile },
      { path: "event/:eventId", Component: EventHub },
    ],
  },
]);
