import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/session";

export default async function Page() {
  const token = (await cookies()).get("pw-reset")?.value;
  if (!token) redirect("/login/forgot-password");
  const { session } = await getCurrentSession();
  if (session) redirect("/");

  return (
    <main className="flex h-[90vh] items-center justify-center">
      <div className="flex h-full max-h-[35rem] w-full max-w-[40rem] flex-col items-center justify-center space-y-4 rounded-xl border p-4 py-8 shadow-xl">
        <h1>Enter new password</h1>

        <div className="flex w-1/2 flex-col space-y-4">
          <ResetPasswordForm />

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
