// app/components/ProfileForm.tsx
"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { createProfile } from "@/lib/actions/profile";

export default function ProfileForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [state, formAction] = useActionState(createProfile, {
    success: false,
    message: "",
    firstName: "",
    lastName: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto p-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          {imagePreview && (
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={imagePreview}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="grid w-full gap-1.5">
            <Label htmlFor="image">Profile Picture</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={state.firstName}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={state.lastName}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-600" : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
