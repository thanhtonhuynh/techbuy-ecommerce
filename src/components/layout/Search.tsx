"use client";

import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action={"/shop"} className="relative">
      <SearchIcon
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      />

      <Input
        key={searchParams.get("shop_q")}
        type="text"
        name="shop_q"
        placeholder="Search for products..."
        className="pl-9"
        autoComplete="off"
        defaultValue={searchParams.get("shop_q") || ""}
      />
    </Form>
  );
}
