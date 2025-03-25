"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, startTransition } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "@/lib/rules";
import { register } from "@/actions/auth";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      id_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(register, null);

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    const formData = new FormData();
    formData.append("id_number", values.id_number);
    formData.append("password", values.password);
    formData.append("confirm_password", values.password);

    startTransition(() => {
      formAction(formData);
    });
  };
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
      toast.success(state.success);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 p-3"
      >
        <FormField
          control={form.control}
          name="id_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Number ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full font-semibold hover:bg-primary hover:opacity-50"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
