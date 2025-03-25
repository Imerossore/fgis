"use server";

import { createSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function register(prevState: unknown, formData: FormData) {
  const id_number = formData.get("id_number") as string;
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id_number", id_number)
    .single();

  if (existingUser) {
    return { error: "User already exists" };
  }

  if (password !== confirm_password) {
    return { error: "Passwords do not match" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({
      id_number,
      password: hashedPassword,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
  }

  const userId = data?.id;
  await createSession(userId);

  return { success: "Registration successful" };
}

export async function login(prevState: unknown, formdata: FormData) {
  "use server";
  const id_number = formdata.get("id_number") as string;
  const password = formdata.get("password") as string;
  const remember_me = formdata.get("remember_me") as string;

  const { data } = await supabase
    .from("users")
    .select("id,id_number, password")
    .eq("id_number", id_number)
    .single();

  if (!data) return { error: "Invalid ID number" };

  const isPasswordValid = await bcrypt.compare(password, data.password);
  if (!isPasswordValid) return { error: "Invalid password" };

  const userId = data?.id;

  await createSession(userId, remember_me === "true");

  return { success: "Logged in successfully" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
