"use client";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerAction } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, null);
  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      toast.loading("Logging in...", { id: "register-toast" });
      return;
    }

    if (!isPending) {
      if (state?.message) {
        toast[state.success ? "success" : "error"](state.message, {
          id: "register-toast",
        });

        if (state.success) {
          router.push("/");
        }
      } else {
        toast.dismiss("register-toast");
      }
    }

    return () => {
      toast.dismiss("register-toast");
    };
  }, [isPending, state, router]);

  return (
    <form action={action} className="flex flex-col gap-3 w-64">
      <div className="space-y-2">
        <Label htmlFor="idNumber">ID Number</Label>
        <Input
          placeholder="ID Number"
          name="idNumber"
          defaultValue={state?.idNumber}
          className={cn(
            (state?.error?.idNumber ||
              state?.message === "ID Number already exists") &&
              "ring-2 ring-destructive focus-visible:ring-destructive"
          )}
        />
        {state?.error?.idNumber && (
          <span className="text-xs text-destructive">
            {state.error.idNumber[0]}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          className={cn(
            state?.error?.password &&
              "ring-2 ring-destructive focus-visible:ring-destructive"
          )}
        />
        {state?.error?.password && (
          <ul className="text-xs text-destructive list-disc pl-5">
            {state.error.password.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          className={cn(
            state?.error?.confirmPassword &&
              "ring-2 ring-destructive focus-visible:ring-destructive"
          )}
        />
        {state?.error?.confirmPassword && (
          <span className="text-xs text-destructive">
            {state.error.confirmPassword[0]}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="text-background dark:text-foreground"
      >
        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Register"}
      </Button>
    </form>
  );
}
