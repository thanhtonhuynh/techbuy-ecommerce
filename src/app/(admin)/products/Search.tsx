"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q") as string;
    const status = searchParams.get("status");

    // Get the current search parameters
    const params = new URLSearchParams({ ...(status && { status }) });

    // Update the search parameters
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    // Navigate to the new URL
    router.push(`/products?${params.toString()}`);
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
        placeholder="Search for products..."
        className="pl-9"
        autoComplete="off"
        defaultValue={searchParams.get("q") || ""}
      />
    </form>
  );
}
