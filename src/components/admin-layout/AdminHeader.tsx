import { UserButton } from "@/components/layout/UserButton";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth/session";
import Link from "next/link";
import { ModeToggle } from "../layout/ModeToggle";
import { Nav, NavLink } from "../layout/Nav";

export async function AdminHeader() {
  const { user } = await getCurrentSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex items-center space-x-4">
          <Button asChild variant={`outline`}>
            <Link href="/">Back to Store</Link>
          </Button>

          <Nav className="hidden lg:block">
            <NavLink href={`/dashboard`}>Dashboard</NavLink>
            <NavLink href={`/products`}>Products</NavLink>
            <NavLink href={`/orders`}>Orders</NavLink>
          </Nav>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          {user && <UserButton user={user} />}
        </div>
      </div>
    </header>
  );
}
