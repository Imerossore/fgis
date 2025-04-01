"use server";
import bcrypt from "bcryptjs";
import { RegisterFormSchema, AuthState, LoginFormSchema } from "../validations";
import { createSession, deleteSession } from "../session";
import { redirect } from "next/navigation";
import { supabase } from "../supabase";

export async function loginAction(
  state: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  try {
    const rememberMe = formData.get("rememberMe") === "on";
    const validatedFields = LoginFormSchema.safeParse({
      idNumber: formData.get("idNumber") as string,
      password: formData.get("password") as string,
      rememberMe,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
        idNumber: formData.get("idNumber") as string,
      };
    }

    const { idNumber, password } = validatedFields.data;

    const { data } = await supabase
      .from("user")
      .select("id,idNumber, password")
      .eq("idNumber", idNumber)
      .single();

    if (!data) {
      return {
        success: false,
        message: "Invalid ID Number or Password",
        idNumber: idNumber,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, data?.password);

    if (!data || !isPasswordValid) {
      return {
        success: false,
        message: "Invalid ID Number or Password",
        idNumber: idNumber,
      };
    }
    const userId = data?.id;

    await createSession(userId, rememberMe);

    return {
      success: true,
      message: "User Logged in Sukaksesfully",
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "An error occurred",
      idNumber: formData.get("idNumber") as string,
    };
  }
}
export async function registerAction(
  state: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  try {
    const validatedFields = RegisterFormSchema.safeParse({
      idNumber: formData.get("idNumber") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
        idNumber: formData.get("idNumber") as string,
      };
    }

    const { idNumber, password } = validatedFields.data;

    const { data: existingUser, error: selectError } = await supabase
      .from("user")
      .select("idNumber")
      .eq("idNumber", idNumber);

    if (selectError) {
      console.log(selectError);
      return {
        success: false,
        message: "An error occurred while checking for existing ID.",
        idNumber: idNumber,
      };
    }

    if (existingUser && existingUser.length > 0) {
      return {
        success: false,
        message: "ID Number already exists",
        idNumber: idNumber,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase
      .from("user")
      .insert({ idNumber, password: hashedPassword });

    if (insertError) {
      return {
        success: false,
        message: "An error occurred while creating the user.",
        idNumber: idNumber,
      };
    }

    return {
      success: true,
      message: "User Registered Sumaksesfully",
    };
  } catch (error) {
    console.error("Error registering:", error);
    return {
      success: false,
      message: "An error occurred",
      idNumber: formData.get("idNumber") as string,
    };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
