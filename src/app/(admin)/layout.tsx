import { AdminHeader } from "@/components/admin-layout/AdminHeader";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col border-border/40 bg-background dark:border-border min-[1800px]:max-w-screen-2xl min-[1800px]:border-x">
      <AdminHeader />
      <main className="mb-16 flex-1">{children}</main>
    </div>
  );
}
