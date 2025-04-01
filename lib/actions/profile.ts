"use server";
import { revalidatePath } from "next/cache";
import { getUser } from "../dal";
import { supabase } from "../supabase";
import { ProfileFormSchema, ProfileState } from "../validations";
import { uploadToCloudinary } from "./upload";

export async function createProfile(
  prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  try {
    const user = await getUser();
    const userId = user?.id;

    const { data: existingProfile } = await supabase
      .from("profile")
      .select()
      .eq("userId", userId)
      .single();

    const imageFile = formData.get("image") as File;
    let avatarUrl = undefined;

    if (imageFile?.size > 0) {
      const uploadedUrl = await uploadToCloudinary(imageFile);
      if (uploadedUrl) avatarUrl = uploadedUrl;
    }

    // Validate input data
    const validatedFields = ProfileFormSchema.safeParse({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      avatarUrl: avatarUrl || existingProfile?.avatarUrl || null,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
      };
    }

    const { firstName, lastName } = validatedFields.data;

    const updateData: ProfileState = {
      firstName,
      lastName,
    };

    if (avatarUrl !== undefined) {
      updateData.avatarUrl = avatarUrl;
    }

    let result;
    if (existingProfile) {
      result = await supabase
        .from("profile")
        .update(updateData)
        .eq("userId", userId);
    } else {
      result = await supabase.from("profile").insert([
        {
          userId,
          ...updateData,
          avatarUrl: avatarUrl || null,
        },
      ]);
    }

    if (result.error) throw result.error;

    revalidatePath("/setting");

    return {
      success: true,
      message: existingProfile
        ? "Profile updated successfully"
        : "Profile created successfully",
    };
  } catch (error) {
    console.error("Error managing profile:", error);
    return {
      success: false,
      message: "An error occurred",
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };
  }
}
