"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUrl } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q") as string;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("page");
    newSearchParams.delete("q");

    const url = createUrl(
      pathname,
      new URLSearchParams({
        ...Object.fromEntries(newSearchParams),
        ...(query && { q: query.trim() }),
      }),
    );

    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <SearchIcon
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      />

      <Input
        key={searchParams.get("q")}
        type="text"
        name="q"
        placeholder="Search products..."
        className="pl-9"
        autoComplete="off"
        defaultValue={searchParams.get("q") || ""}
      />

      <Button
        type="button"
        size={`sm`}
        variant={`link`}
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("q");
          router.push(createUrl(pathname, newSearchParams), { scroll: false });
        }}
      >
        Clear
      </Button>
    </form>
  );
}
