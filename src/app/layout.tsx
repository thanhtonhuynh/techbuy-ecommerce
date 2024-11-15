import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { getCart } from "@/data-access/cart";
import { CartProvider } from "@/providers/CartProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TechBuy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = getCart();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider>
          <CartProvider cartPromise={cart}>
            <div className="relative mx-auto flex min-h-screen w-full flex-col border-border/40 dark:border-border min-[1800px]:max-w-screen-2xl min-[1800px]:border-x">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
