import { CartSheet } from "@/components/cart/CartSheet";
import { Nav, NavLink } from "@/components/layout/Nav";
import { Search } from "@/components/layout/Search";
import { UserButton } from "@/components/layout/UserButton";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/data-access/category";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { MonitorSpeaker } from "lucide-react";
import Link from "next/link";

export async function Header() {
  const { user } = await getCurrentSession();
  const categories = await getCategories();

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
            {categories.map((category) => (
              <NavLink key={category.id} href={`/shop/${category.slug}`}>
                {category.name}
              </NavLink>
            ))}
          </Nav>
        </div>

        <div className="flex w-full items-center space-x-2 lg:w-1/3">
          <div className="flex-1">
            <Search />
          </div>

          {user && hasAccess(user.role, "/admin") && (
            <Button asChild variant={`outline`}>
              <Link href="/dashboard">Admin Dashboard</Link>
            </Button>
          )}

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
