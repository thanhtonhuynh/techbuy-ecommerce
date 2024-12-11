"use client";

import { logoutAction } from "@/app/(main)/(auth)/actions";
import { ProfilePicture } from "@/components/ProfilePicture";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { User } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { Lock, LogOut, Logs, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { ComponentProps, Dispatch, SetStateAction, useState } from "react";
import { Separator } from "../ui/separator";

export function UserMenu({ user }: { user: User }) {
  const isDesktop = useMediaQuery(`(min-width: 1024px)`);
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant={`outline`}
            className="rounded-full"
            onClick={() => {
              setOpen(true);
            }}
          >
            {user.image ? <ProfilePicture image={user.image} size={50} /> : <UserRound size={17} />}
          </Button>
        </DropdownMenuTrigger>

        <UserMenuContent user={user} isDesktop={isDesktop} setOpen={setOpen} />
      </DropdownMenu>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant={`outline`}
          className="rounded-full"
          onClick={() => {
            setOpen(true);
          }}
        >
          {user.image ? <ProfilePicture image={user.image} size={50} /> : <UserRound size={17} />}
        </Button>
      </SheetTrigger>

      <UserMenuContent user={user} isDesktop={isDesktop} setOpen={setOpen} />
    </Sheet>
  );
}

function UserMenuContent({
  user,
  isDesktop,
  setOpen,
}: {
  user: User;
  isDesktop: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  if (isDesktop) {
    return (
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="space-y-1 px-4 py-2">
          <div>{user.name}</div>

          {user.role === "admin" && (
            <div className="text-xs capitalize text-muted-foreground">{user.role}</div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <UserMenuList user={user} setOpen={setOpen} />
      </DropdownMenuContent>
    );
  }

  return (
    <SheetContent side={`bottom`} className="rounded-t-xl pb-6">
      <SheetHeader className="space-y-1 px-4 pb-3 text-left">
        <SheetTitle>{user.name}</SheetTitle>

        <SheetDescription className="flex flex-col text-xs text-muted-foreground">
          <span>{user.email}</span>
          {user.role === "admin" && <span className="capitalize">{user.role}</span>}
        </SheetDescription>
      </SheetHeader>

      <Separator className="mb-1 bg-border/50" />

      <UserMenuList user={user} setOpen={setOpen} />
    </SheetContent>
  );
}

function UserMenuList({
  user,
  setOpen,
}: {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ul className="space-y-1">
      {user.accountStatus === "active" && (
        <>
          {hasAccess(user.role, "/admin") && (
            <NavLink href="/dashboard" onClick={() => setOpen(false)}>
              <Lock className="size-4" />
              Admin dashboard
            </NavLink>
          )}

          <NavLink href="/my-orders" onClick={() => setOpen(false)}>
            <Logs className="size-4" />
            My orders
          </NavLink>

          <NavLink href="/settings" onClick={() => setOpen(false)}>
            <Settings className="size-4" />
            Account settings
          </NavLink>

          <Separator className="-mx-1 bg-border/50" />
        </>
      )}

      <li>
        <form action={logoutAction}>
          <Button
            variant={`outline`}
            className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
            onClick={() => setOpen(false)}
          >
            <LogOut className="size-4" /> Sign Out
          </Button>
        </form>
      </li>
    </ul>
  );
}

function NavLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <li>
      <Button
        asChild
        variant={`outline`}
        className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
      >
        <Link {...props}>{children}</Link>
      </Button>
    </li>
  );
}
