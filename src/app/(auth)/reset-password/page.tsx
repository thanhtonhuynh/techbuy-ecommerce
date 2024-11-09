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
    <section className="absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2 p-2 md:w-2/3 md:p-0 lg:w-1/2">
      <div className="flex flex-col space-y-4 rounded-md border p-8 shadow-md">
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
    </section>
  );
}
