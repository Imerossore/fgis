import {
  FileChartColumn,
  LayoutDashboard,
  Settings,
  User2,
} from "lucide-react";

import { Division, NavSection } from "./types";

export const NAVIGATION: NavSection[] = [
  {
    title: "Main Menu",
    items: [
      {
        href: "/dashboard",
        name: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },

      {
        href: "/accomplishments",
        name: "Accomplishments",
        icon: FileChartColumn,
      },
      {
        href: "/user-management",
        name: "User Management",
        icon: User2,
      },
    ],
  },
  {
    title: "Other Menu",
    items: [
      {
        href: "/reports",
        name: "Reports",
        icon: FileChartColumn,
      },
      {
        href: "/setting",
        name: "Setting",
        icon: Settings,
      },
    ],
  },
];

export const DIVISIONS: Division[] = [
  {
    id: 1,
    divisionName: "division-1",
    link: "/division-1/system_1",
  },
  {
    id: 2,
    divisionName: "division-2",
    link: "/division-2/system_1",
  },
  {
    id: 3,
    divisionName: "division-3",
    link: "/division-3/system_1",
  },
  {
    id: 4,
    divisionName: "division-4",
    link: "/division-4/system_1",
  },
  {
    id: 5,
    divisionName: "division-5",
    link: "/division-5/system_1",
  },
  {
    id: 6,
    divisionName: "division-6",
    link: "/division-6/system_1",
  },
  {
    id: 7,
    divisionName: "drd",
    link: "/drd/system_1",
  },
];
