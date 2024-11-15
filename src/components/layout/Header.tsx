import Link from "next/link";
import UserButton from "@/components/buttons/UserButton";
import { getCurrentSession } from "@/lib/auth/session";
import { Nav, NavLink } from "@/components/layout/Nav";
import { MonitorSpeaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/CartSheet";
import { Search } from "@/components/layout/Search";

export default async function Header() {
  const { user } = await getCurrentSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-1 font-bold">
            <MonitorSpeaker size={25} />
            <span className="select-none text-xl tracking-wider">techbuy</span>
          </Link>

          <Nav className="hidden lg:block">
            <NavLink href={`/a`}>All</NavLink>
            <NavLink href={`/c`}>Mac</NavLink>
            <NavLink href={`/b`}>iPhone</NavLink>
            <NavLink href={`/d`}>iPad</NavLink>
            <NavLink href={`/e`}>Apple Watch</NavLink>
            <NavLink href={`/f`}>AirPods</NavLink>
            <NavLink href={`/g`}>Accessories</NavLink>
          </Nav>
        </div>

        <div className="flex w-full items-center space-x-2 lg:w-1/3">
          <div className="flex-1">
            <Search />
          </div>

          <CartSheet />

          {user ? (
            <UserButton user={user} />
          ) : (
            <Button asChild>
              <Link href={`/login`}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
