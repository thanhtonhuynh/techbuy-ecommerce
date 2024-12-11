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
import { useState } from "react";
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

        <UserMenuContent user={user} isDesktop={isDesktop} />
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

      <UserMenuContent user={user} isDesktop={isDesktop} />
    </Sheet>
  );
}

function UserMenuContent({ user, isDesktop }: { user: User; isDesktop: boolean }) {
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

        <UserMenuList user={user} />
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

      <UserMenuList user={user} />
    </SheetContent>
  );
}

function UserMenuList({ user }: { user: User }) {
  return (
    <ul className="space-y-1">
      {user.accountStatus === "active" && (
        <>
          {hasAccess(user.role, "/admin") && (
            <li>
              <Button
                asChild
                variant={`outline`}
                className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
              >
                <Link href="/dashboard">
                  <Lock size={16} />
                  Admin dashboard
                </Link>
              </Button>
            </li>
          )}

          <li>
            <Button
              asChild
              variant={`outline`}
              className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
            >
              <Link href="/my-orders">
                <Logs className="size-4" />
                <span>My orders</span>
              </Link>
            </Button>
          </li>

          <li>
            <Button
              asChild
              variant={`outline`}
              className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
            >
              <Link href="/settings">
                <Settings size={16} />
                <span>Account settings</span>
              </Link>
            </Button>
          </li>

          <Separator className="-mx-1 bg-border/50" />
        </>
      )}
      <li>
        <form action={logoutAction}>
          <Button
            variant={`outline`}
            className="h-full w-full justify-start rounded-none border-none py-2 shadow-none"
          >
            <LogOut size={16} /> Sign Out
          </Button>
        </form>
      </li>
    </ul>
  );
}
