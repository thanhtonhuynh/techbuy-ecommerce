export function TailwindScreenSizeIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-white p-3 font-mono text-xs font-bold text-muted-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.3)]">
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">2XL</div>
    </div>
  );
}
