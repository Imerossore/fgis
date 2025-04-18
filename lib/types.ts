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

export type System = {
  id: number;
  systemName: string;
  link: string;
};

export type Division = {
  id: number;
  divisionName: string;
  systems: System[];
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

type StatusDetail = {
  header_id: string;
  type: string;
  actual?: number;
  target?: number;
  percentage: number;
  status: string;
};
export type StatusHeader = {
  id: string;
  division: string;
  system: string;
  recorded_by: string;
  review_status: string;
  created_at: string;
  updated_at: string;
  details: StatusDetail[];
};

export type ActionState = {
  success: boolean;
  message: string;
};

export type HeaderType = {
  type: string;
  actual?: number;
  target?: number;
  percentage: number;
  status: string;
};
