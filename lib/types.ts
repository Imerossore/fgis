"use client";
import { LucideIcon } from "lucide-react";

export type UserRole = "administrator" | "viewer" | "editor";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  avatar_url?: string;
  role?: UserRole;
  division?: string;
  createdAt: string;
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

export type Division = {
  id: number;
  divisionName: string;
  link: string;
};
