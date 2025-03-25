"use server";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { supabase } from "./supabase";
import { uploadToCloudinary } from "./uploadImage";
import { revalidatePath } from "next/cache";

export type UserType = {
  id: string;
  id_number: string;
  status: string;
  profile?: ProfileType;
};

export type ProfileType = {
  id: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
  avatar_url?: string;
  user_id: string;
  role?: string;
  division?: string;
};

export type ActionState = {
  success: boolean;
  message: string;
  data?: ProfileType | null;
};

export async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const userSession = await decrypt(session);
  const { data: user } = await supabase
    .from("users")
    .select("id, id_number, status")
    .eq("id", userSession?.userId)
    .single();

  return user;
}

export async function addProfile(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email_address = formData.get("email_address") as string;
    const avatar_url = formData.get("avatar_url") as File;

    if (!first_name.trim() || !last_name.trim()) {
      return {
        success: false,
        message: "First name and last name are required",
      };
    }

    let imageUrl = null;
    if (avatar_url && avatar_url.size > 0) {
      imageUrl = await uploadToCloudinary(avatar_url);
    }

    const { error } = await supabase
      .from("profile")
      .insert({
        user_id: authUser.id,
        first_name,
        last_name,
        email_address: email_address,
        avatar_url: imageUrl,
      })
      .select("*")
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
export async function getProfile() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return null;
  }

  const { data: user, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", authUser.id)
    .single();

  if (error) {
    return null;
  }

  return user;
}
