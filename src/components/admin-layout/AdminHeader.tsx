import { getCurrentSession } from "@/lib/auth/session";
import { MonitorSpeaker } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "../layout/UserButton";
import { DesktopNav, MobileNav } from "./AdminNav";

export async function AdminHeader() {
  const { user } = await getCurrentSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex items-center justify-between gap-3">
        <MobileNav />

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center space-x-1 font-bold md:static md:translate-x-0"
        >
          <MonitorSpeaker size={25} />
          <span className="select-none text-xl tracking-wider">techbuy</span>
        </Link>

        <DesktopNav />

        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
