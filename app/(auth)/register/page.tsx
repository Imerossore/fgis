import RegisterForm from "@/components/forms/register-form";
import NiaLogo from "@/components/nia-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <NiaLogo size={80} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Already have an account? <Link href="/">Login</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
