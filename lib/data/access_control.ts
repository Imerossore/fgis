import { DIVISIONS, NAVIGATION } from "../constant";
import { UserType } from "../types";

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
      allowedRoutes = ["/", "/setting", "/reports"];
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
