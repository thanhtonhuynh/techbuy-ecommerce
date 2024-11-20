import Link from "next/link";
import { MonitorSpeaker } from "lucide-react";
import { ModeToggle } from "@/components/layout/ModeToggle";

export async function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4 border-t border-border/40 px-8 py-6 dark:border-border">
      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4">
        <Link href="/" className="flex items-center gap-1 font-bold">
          <MonitorSpeaker size={25} />
          <span className="select-none text-lg tracking-wider">techbuy</span>
        </Link>

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}, Techbuy Inc.
        </div>
      </div>

      <ModeToggle />
    </footer>
  );
}
