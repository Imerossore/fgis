"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { supabase } from "../supabase";

export const getUsers = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("user").select(`
        id,
        idNumber,
        role,
        created_at,
        profile(*)
      `);

    if (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
    const usersWithProfiles = data.filter(
      (user) => user.profile && user.profile.length > 0
    );

    const formattedUsers = usersWithProfiles.map((user) => ({
      ...user,
      profile: user.profile[0],
    }));

    return formattedUsers;
  },
  ["users-with-profiles"],
  {
    tags: ["users", "profiles"],
    revalidate: 60,
  }
);

export async function setUserRoleDivision(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const userId = formData.get("id") as string;
    const role = formData.get("role") as string;
    const division = formData.get("division") as string;

    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const { error: userError } = await supabase
      .from("user")
      .update({ role })
      .eq("id", userId);

    if (userError) throw userError;

    if (role) {
      const { error: profileError } = await supabase
        .from("profile")
        .update({
          division: role === "editor" ? division : null,
        })
        .eq("userId", userId);

      if (profileError) throw profileError;
    }

    revalidateTag("users");
    revalidateTag("profiles");

    return {
      success: true,
      message: "User role and division updated successfully",
    };
  } catch (error) {
    console.error("Error updating user role and division:", error);
    return {
      success: false,
      message: "Failed to update user role and division",
    };
  }
}
