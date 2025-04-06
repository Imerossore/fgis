import { DIVISIONS, NAVIGATION } from "../constant";
import { SubNavItem, UserType } from "../types";

export function getAccessibleDivisions({ user }: { user: UserType }) {
  if (user?.role === "administrator" || user?.role === "viewer") {
    return DIVISIONS;
  } else if (user?.role === "editor") {
    if (user.profile?.division) {
      const userDivisions = DIVISIONS.filter(
        (div) => div.divisionName === user.profile?.division
      );
      return userDivisions;
    }
    return [];
  }
  return [];
}

export function getAccessibleNavigation({ user }: { user: UserType }) {
  let allowedRoutes: string[];

  switch (user?.role) {
    case "administrator":
      return NAVIGATION;

    case "viewer":
    case "editor":
      allowedRoutes = ["/dashboard", "/setting", "/reports/division-i"];
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

export function getDivisionSystemsAsNavItems(
  divisionName: string
): SubNavItem[] {
  const division = DIVISIONS.find((div) => div.divisionName === divisionName);

  if (!division) return [];

  return division.systems.map((system) => ({
    href: system.link,
    label: system.systemName,
  }));
}
