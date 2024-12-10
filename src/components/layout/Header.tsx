import { CartSheet } from "@/components/cart/CartSheet";
import { DesktopNav, MobileNav } from "@/components/layout/Nav";
import { Search } from "@/components/layout/Search";
import { UserButton } from "@/components/layout/UserButton";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/data-access/category";
import { getCurrentSession } from "@/lib/auth/session";
import { MonitorSpeaker } from "lucide-react";
import Link from "next/link";

export async function Header() {
  const { user } = await getCurrentSession();
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 w-full space-y-2 border-b border-border/40 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="relative flex items-center justify-between gap-3">
        <MobileNav categories={categories} />

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center space-x-1 font-bold md:static md:translate-x-0"
        >
          <MonitorSpeaker size={25} />
          <span className="select-none text-xl tracking-wider">techbuy</span>
        </Link>

        <DesktopNav categories={categories} />

        <div className="flex items-center space-x-2 lg:flex-1">
          <div className="hidden lg:block lg:flex-1">
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

      <div className="lg:hidden">
        <Search />
      </div>
    </header>
  );
}
