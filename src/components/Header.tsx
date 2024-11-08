import Link from "next/link";
import UserButton from "@/components/buttons/UserButton";
import { getCurrentSession } from "@/lib/auth/session";
import { Nav, NavLink } from "./Nav";
import { ModeToggle } from "@/components/ModeToggle";
import { MonitorSpeaker } from "lucide-react";

export default async function Header() {
  const { user } = await getCurrentSession();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-1 font-bold">
            <MonitorSpeaker size={25} />
            <span className="text-xl tracking-wider">techbuy</span>
          </Link>

          <Nav>
            <NavLink href={`/a`}>Link</NavLink>
            <NavLink href={`/b`}>Link</NavLink>
            <NavLink href={`/c`}>Link</NavLink>
          </Nav>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          <UserButton user={user} />
        </div>
      </div>
    </header>
  );
}
