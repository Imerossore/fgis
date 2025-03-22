import { DIVISIONS, NAVIGATION } from "./constant";
import { User } from "./types";

export const user: User[] = [
  {
    id: "8a7b3c1d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
    firstname: "Admin",
    lastname: "User",
    avatar_url: undefined,
    role: "administrator",
    createdAt: "2024-01-15 08:30:00",
  },
  {
    id: "9b8c7d6e-5f4g-3h2i-1j0k-9l8m7n6o5p4q",
    firstname: "John",
    lastname: "Viewer",
    avatar_url: undefined,
    role: "viewer",
    createdAt: "2024-08-12 11:20:30",
  },

  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    firstname: "Imeros",
    lastname: "Soreno",
    avatar_url: undefined,
    role: "editor",
    division: "division-2",
    createdAt: "2024-05-17 13:40:22",
  },

  {
    id: "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
    firstname: "New",
    lastname: "User",
    avatar_url: undefined,
    role: undefined,
    createdAt: "2025-03-21 10:25:15",
  },
];

export function getCurrentUser() {
  return user[0];
}

export function getAccessibleDivisions(user: User = getCurrentUser()) {
  if (user?.role === "administrator" || user?.role === "viewer") {
    return DIVISIONS;
  } else if (user?.role === "editor") {
    if (user.division) {
      const userDivisions = DIVISIONS.filter(
        (div) => div.divisionName === user.division
      );
      return userDivisions;
    }
    return [];
  }
  return [];
}

export function getAccessibleNavigation(user: User = getCurrentUser()) {
  let allowedRoutes: string[];

  switch (user?.role) {
    case "administrator":
      return NAVIGATION;

    case "viewer":
    case "editor":
      allowedRoutes = ["/", "/charts", "/setting", "/reports"];
      break;

    default:
      allowedRoutes = ["/setting"];
      break;
  }

  return NAVIGATION.map((section) => ({
    ...section,
    items: section.items.filter((item) => allowedRoutes.includes(item.href)),
  })).filter((section) => section.items.length > 0);
}
