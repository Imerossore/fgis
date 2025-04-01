"use client";
import { LucideIcon } from "lucide-react";

export enum UserRole {
  Administrator = "administrator",
  Editor = "editor",
  Viewer = "viewer",
}
export type SessionPayload = {
  userId: string;
  expiresAt?: Date;
};

export type NavItem = {
  href: string;
  name: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type SubNavItem = {
  href: string;
  label: string;
};

export type Division = {
  id: number;
  divisionName: string;
  link: string;
};

export type UserType = {
  id: string;
  idNumber: string;
  password?: string;
  role?: UserRole;
  profile?: UserProfileType;
  created_at: Date;
};

export type UserProfileType = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  division?: string;
  created_at: Date;
};
