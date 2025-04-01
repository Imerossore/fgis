"use client";

import { useActionState, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { UserType } from "@/lib/types";
import { createProfile } from "@/lib/actions/profile";
import toast from "react-hot-toast";

export default function ProfileForm({ user }: { user: UserType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setImagePreview(null);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const [state, action, isPending] = useActionState(createProfile, {
    success: false,
    message: "",
    firstName: user.profile?.firstName || "",
    lastName: user.profile?.lastName || "",
  });

  const handleSubmit = (formData: FormData) => {
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    action(formData);
  };

  useEffect(() => {
    if (isPending) {
      toast.loading("Updating Profile...", { id: "profile-toast" });
      return;
    }

    if (!isPending) {
      if (state?.message) {
        toast[state.success ? "success" : "error"](state.message, {
          id: "profile-toast",
        });

        if (state.success) {
          setIsEditing(false);
          setImagePreview(null);
          setSelectedFile(null);
        }
      } else {
        toast.dismiss("profile-toast");
      }
    }

    return () => {
      toast.dismiss("profile-toast");
    };
  }, [isPending, state]);

  return (
    <div className="flex justify-center">
      <form action={(formData) => handleSubmit(formData)} className="w-4/5">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-5">
            <Label>Profile Picture</Label>
            <div>A profile picture helps customize your account</div>
          </div>

          <div>
            {user.profile ? (
              <div className="relative">
                {isEditing && (
                  <Input
                    id="profile-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                )}
                <Avatar
                  className={`h-20 w-20 ${isEditing ? "cursor-pointer" : ""}`}
                  onClick={
                    isEditing
                      ? () => document.getElementById("profile-image")?.click()
                      : undefined
                  }
                >
                  <AvatarImage
                    className="object-cover"
                    src={
                      imagePreview ||
                      user?.profile?.avatarUrl ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${user?.profile?.firstName} ${user?.profile?.lastName}`
                    }
                    alt={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                  />
                  <AvatarFallback>
                    {user?.profile?.firstName && user?.profile?.lastName
                      ? `${user.profile?.firstName[0]}${user.profile?.lastName[0]}`
                      : ""}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="relative h-20 w-20 rounded-full overflow-hidden bg-slate-300 ring-accent dark:bg-slate-800 text-foreground dark:text-foreground">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : isEditing ? (
                  <div className="h-full flex justify-center items-center text-sm text-center">
                    <Label htmlFor="image" className="cursor-pointer h-full">
                      Upload Profile
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="h-full flex justify-center items-center text-sm text-center">
                    <Label htmlFor="image">Upload Profile</Label>
                  </div>
                )}
                {isEditing && imagePreview && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-background rounded-full p-1 w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 17h18v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"></path>
                      <path d="M14 13l3-3 3 3"></path>
                      <path d="M20 10V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4"></path>
                      <path d="M17 13V6"></path>
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-10">
            <Label>ID Number</Label>
            <div>{user?.idNumber || "undefined"}</div>
          </div>
        </div>
        <div className="flex items-center justify-between border-b px-4">
          <div className="flex items-center gap-10">
            <Label>First Name</Label>
            {isEditing ? (
              <div className="py-2.5">
                <Input
                  name="firstName"
                  defaultValue={state?.firstName || user.profile?.firstName}
                  required
                />
              </div>
            ) : (
              <div className="py-4">{user.profile?.firstName || "Not Set"}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-b px-4">
          <div className="flex items-center gap-10">
            <Label>Last Name</Label>
            {isEditing ? (
              <div className="py-2.5">
                <Input
                  name="lastName"
                  defaultValue={state?.lastName || user.profile?.lastName}
                  required
                />
              </div>
            ) : (
              <div className="py-4">{user.profile?.lastName || "Not Set"}</div>
            )}
          </div>
        </div>
        <div className="flex p-4 justify-end ">
          {isEditing ? (
            <div className="space-x-2">
              <Button
                variant={"outline"}
                onClick={handleEdit}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-background dark:bg-foreground dark:text-background cursor-pointer"
                disabled={isPending}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              className="bg-primary text-background dark:bg-foreground dark:text-background cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
