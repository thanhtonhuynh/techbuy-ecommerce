import { ErrorMessage } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

type SearchParams = Promise<{ resetLinkExpired?: boolean }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const { resetLinkExpired } = searchParams;

  const { session } = await getCurrentSession();
  if (session) redirect("/");

  return (
    <section className="absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2 p-2 md:w-2/3 md:p-0 lg:w-1/2">
      <div className="flex flex-col space-y-4 rounded-md border p-8 shadow-md">
        {resetLinkExpired && (
          <ErrorMessage message="The reset password link has expired. Please request a new one." />
        )}

        <h1>Forgot your password?</h1>

        <div className="space-y-1 text-muted-foreground">
          <p className="text-primary">
            Enter your email address and we&apos;ll send you
            {resetLinkExpired ? " another" : " a"} link to reset your password.
          </p>
          <p>For security reasons, the link will expire in 30 minutes.</p>
          <p>Please allow a few minutes for the email to arrive.</p>
        </div>

        <ForgotPasswordForm />

        <Button className="w-full gap-1" variant={"outline"} asChild>
          <Link href={"/login"}>
            <ArrowLeft size={15} />
            Back to Login
          </Link>
        </Button>
      </div>
    </section>
  );
}
