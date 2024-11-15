"use client";

import Form from "next/form";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative">
      <SearchIcon
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      />

      <Input
        type="text"
        name="q"
        placeholder="Search for products..."
        className="pl-9"
        autoComplete="off"
        defaultValue={searchParams.get("q") || ""}
      />
    </Form>
  );
}
