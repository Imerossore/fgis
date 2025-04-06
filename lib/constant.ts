import {
  FileChartColumn,
  LayoutDashboard,
  Settings,
  User2,
} from "lucide-react";

import { Division as DivisionType, NavSection } from "./types";

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
        href: "/reports/division-i",
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

//Divisions and Systems

export const DIVISIONS: DivisionType[] = [
  {
    id: 1,
    divisionName: "division-i",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-i/system1",
      },
      {
        id: 2,
        systemName: "system2",
        link: "/dashboard/division-i/system2",
      },
      {
        id: 3,
        systemName: "system3",
        link: "/dashboard/division-i/system3",
      },
      {
        id: 4,
        systemName: "system4",
        link: "/dashboard/division-i/system4",
      },
      {
        id: 5,
        systemName: "system5",
        link: "/dashboard/division-i/system5",
      },
    ],
  },
  {
    id: 2,
    divisionName: "division-ii",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-ii/system1",
      },
      {
        id: 2,
        systemName: "system2",
        link: "/dashboard/division-ii/system2",
      },
      {
        id: 3,
        systemName: "system3",
        link: "/dashboard/division-ii/system3",
      },
      {
        id: 4,
        systemName: "system4",
        link: "/dashboard/division-ii/system4",
      },
      {
        id: 5,
        systemName: "system5",
        link: "/dashboard/division-ii/system5",
      },
    ],
  },
  {
    id: 3,
    divisionName: "division-iii",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-iii/system1",
      },
      {
        id: 2,
        systemName: "system2",
        link: "/dashboard/division-iii/system2",
      },
      {
        id: 3,
        systemName: "system3",
        link: "/dashboard/division-iii/system3",
      },
      {
        id: 4,
        systemName: "system4",
        link: "/dashboard/division-iii/system4",
      },
      {
        id: 5,
        systemName: "system5",
        link: "/dashboard/division-iii/system5",
      },
      {
        id: 6,
        systemName: "system6",
        link: "/dashboard/division-iii/system6",
      },
      {
        id: 7,
        systemName: "system7",
        link: "/dashboard/division-iii/system7",
      },
      {
        id: 8,
        systemName: "system8",
        link: "/dashboard/division-iii/system8",
      },
    ],
  },
  {
    id: 4,
    divisionName: "division-iv",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-iv/system1",
      },
    ],
  },
  {
    id: 5,
    divisionName: "division-v",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-v/system1",
      },
    ],
  },
  {
    id: 6,
    divisionName: "division-vi",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/division-vi/system1",
      },
    ],
  },
  {
    id: 7,
    divisionName: "drd",
    systems: [
      {
        id: 1,
        systemName: "system1",
        link: "/dashboard/drd/system1",
      },
    ],
  },
];
