"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./session";
import { UserType } from "./types";
import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";

// Keep these as is - they use regular cache
export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  if (!cookie) {
    return null;
  }

  return decrypt(cookie);
});

export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    redirect("/login");
  }

  return { userId: session.userId };
});

const fetchUserById = unstable_cache(
  async (userId: string): Promise<UserType> => {
    const { data: user, error } = await supabase
      .from("user")
      .select(
        `
        id,
        idNumber,
        password,
        role,
        created_at,
        profile:profile(*)
      `
      )
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user data");
    }

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      profile: user.profile?.[0] ? { ...user.profile[0] } : undefined,
    };
  },
  ["user-data"],
  {
    revalidate: 60,
    tags: ["user-data"],
  }
);

export const getUser = async (): Promise<UserType> => {
  const session = await verifySession();
  return fetchUserById(session.userId);
};
