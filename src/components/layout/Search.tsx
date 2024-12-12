"use client";

import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Search() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("shop_q") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(searchParams.get("shop_q") || "");
  }, [searchParams.get("shop_q")]);

  return (
    <Form action={"/shop"} className="group relative">
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />

      <Input
        ref={inputRef}
        key={searchParams.get("shop_q")}
        type="text"
        name="shop_q"
        placeholder="Search for products..."
        className="pl-9 pr-10"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        type="button"
        size={`icon`}
        variant={"outline"}
        className={cn(
          "absolute right-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full",
          value && "animate-in fade-in group-focus-within:inline-flex",
        )}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setValue("");
          inputRef.current?.focus();
        }}
      >
        <X className="size-4" />
      </Button>
    </Form>
  );
}
