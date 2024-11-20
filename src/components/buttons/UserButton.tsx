import { Lock, LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/auth/session";
import { logoutAction } from "@/app/(auth)/actions";
import { hasAccess } from "@/utils/access-control";
import { ProfilePicture } from "@/components/ProfilePicture";

interface UserButtonProps {
  user: User;
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant={`outline`} className="rounded-full">
          {user.image ? <ProfilePicture image={user.image} size={50} /> : <UserRound size={20} />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel className="space-y-1">
          <div>{user.name}</div>
          <div className="text-xs capitalize text-muted-foreground">{user.role}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {user.accountStatus === "active" && (
          <>
            <DropdownMenuGroup>
              {hasAccess(user.role, "/admin") && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    <Lock size={16} />
                    Admin
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings size={16} />
                  <span>Account settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
