import { UserButton } from "@/components/buttons/UserButton";
import { CartSheet } from "@/components/cart/CartSheet";
import { Nav, NavLink } from "@/components/layout/Nav";
import { Search } from "@/components/layout/Search";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth/session";
import { MonitorSpeaker } from "lucide-react";
import Link from "next/link";

export async function Header() {
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
            <NavLink href={`/shop`}>All</NavLink>
            <NavLink href={`/shop/mac`}>Mac</NavLink>
            <NavLink href={`/shop/iphone`}>iPhone</NavLink>
            <NavLink href={`/shop/ipad`}>iPad</NavLink>
            <NavLink href={`/shop/apple-watch`}>Apple Watch</NavLink>
            <NavLink href={`/shop/airpods`}>AirPods</NavLink>
            <NavLink href={`/shop/accessories`}>Accessories</NavLink>
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
