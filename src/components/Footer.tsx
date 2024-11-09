import Link from "next/link";
import { MonitorSpeaker } from "lucide-react";

export default async function Footer() {
  return (
    <footer className="border-t border-border/40 px-8 py-6 dark:border-border">
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="flex items-center gap-1 font-bold">
          <MonitorSpeaker size={25} />
          <span className="select-none text-lg tracking-wider">techbuy</span>
        </Link>

        <div className="text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()}, Techbuy Inc.</p>
        </div>
      </div>
    </footer>
  );
}
