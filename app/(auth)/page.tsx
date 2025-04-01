import LoginForm from "@/components/forms/login-form";
import NiaLogo from "@/components/nia-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="gap-3 ">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <NiaLogo size={80} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
