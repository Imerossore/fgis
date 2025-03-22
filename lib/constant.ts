import {
  ChartPie,
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
        href: "/",
        name: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        href: "/charts",
        name: "Charts",
        icon: ChartPie,
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
    link: "/d1/system_1",
  },
  {
    id: 2,
    divisionName: "division-2",
    link: "/Division2/system_1",
  },
  {
    id: 3,
    divisionName: "division-3",
    link: "/Division3/system_1",
  },
  {
    id: 4,
    divisionName: "division-4",
    link: "/Division4/system_1",
  },
  {
    id: 5,
    divisionName: "division-5",
    link: "/Division5/system_1",
  },
  {
    id: 6,
    divisionName: "division-6",
    link: "/Division6/system_1",
  },
  {
    id: 7,
    divisionName: "drd",
    link: "/DRD/system_1",
  },
];
