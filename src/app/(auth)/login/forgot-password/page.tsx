import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ErrorMessage } from "@/components/Message";

type SearchParams = Promise<{ resetLinkExpired?: boolean }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const { resetLinkExpired } = searchParams;

  const { session } = await getCurrentSession();
  if (session) redirect("/");

  return (
    <main className="flex h-[90vh] items-center justify-center">
      <div className="flex h-full max-h-[35rem] w-full max-w-[40rem] flex-col items-center justify-center space-y-4 rounded-xl border bg-card p-4 py-8 shadow-xl">
        {resetLinkExpired && (
          <ErrorMessage message="The reset password link has expired. Please request a new one." />
        )}

        <h1>Forgot your password?</h1>

        <div className="flex w-2/3 flex-col space-y-4">
          <p className="text-sm text-gray-500">
            Enter your email address and we'll send you
            {resetLinkExpired ? " another" : " a"} link to reset your password.
          </p>

          <p className="text-sm text-gray-500">
            For security reasons, the link will expire in 30 minutes.
          </p>

          <p className="text-sm text-gray-500">
            Please allow a few minutes for the email to arrive.
          </p>

          <ForgotPasswordForm />

          <Button className="w-full gap-1" variant={"outline"} asChild>
            <Link href={"/login"}>
              <ArrowLeft size={15} />
              Back to Login
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
