"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null);

  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      toast.loading("Logging in...", { id: "login-toast" });
      return;
    }

    if (!isPending) {
      if (state?.message) {
        toast[state.success ? "success" : "error"](state.message, {
          id: "login-toast",
        });

        if (state.success) {
          router.push("/");
        }
      } else {
        toast.dismiss("login-toast");
      }
    }

    return () => {
      toast.dismiss("login-toast");
    };
  }, [isPending, state, router]);

  return (
    <form action={action} className="flex flex-col gap-3 w-64">
      <div className="space-y-2">
        <Label
          htmlFor="idNumber"
          className={cn(
            (state?.error?.idNumber ||
              state?.message === "Invalid ID Number or Password") &&
              "text-destructive"
          )}
        >
          ID Number
        </Label>
        <Input
          placeholder="ID Number"
          name="idNumber"
          defaultValue={state?.idNumber}
          className={cn(
            (state?.error?.idNumber ||
              state?.message === "Invalid ID Number or Password") &&
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
        <Label
          htmlFor="password"
          className={cn(
            (state?.error?.password ||
              state?.message === "Invalid ID Number or Password") &&
              "text-destructive"
          )}
        >
          Password
        </Label>
        <Input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          className={cn(
            (state?.error?.idNumber ||
              state?.message === "Invalid ID Number or Password") &&
              "ring-2 ring-destructive focus-visible:ring-destructive"
          )}
        />
        {state?.error?.password && (
          <span className="text-xs text-destructive">
            {state.error.password[0]}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="rememberMe"
          name="rememberMe"
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />
        <Label htmlFor="rememberMe">Remember me</Label>
      </div>

      <Button type="submit" className="text-background dark:text-foreground">
        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
      </Button>
    </form>
  );
}
