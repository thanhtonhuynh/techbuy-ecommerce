import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col border-border/40 dark:border-border min-[1800px]:max-w-screen-2xl min-[1800px]:border-x">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
