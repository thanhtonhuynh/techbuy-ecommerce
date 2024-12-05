"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, createUrl } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  total: number;
  page: number;
  perPage: number;
};

export function PaginationControls({ total, page, perPage }: PaginationControlsProps) {
  const totalPages = Math.ceil(total / perPage);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextHref = createUrl(
    pathname,
    new URLSearchParams({
      ...Object.fromEntries(searchParams),
      page: `${page + 1}`,
      perPage: `${perPage}`,
    }),
  );
  const prevHref = createUrl(
    pathname,
    new URLSearchParams({
      ...Object.fromEntries(searchParams),
      page: `${page - 1}`,
      perPage: `${perPage}`,
    }),
  );
  const firstHref = createUrl(
    pathname,
    new URLSearchParams({
      ...Object.fromEntries(searchParams),
      page: `1`,
      perPage: `${perPage}`,
    }),
  );
  const lastHref = createUrl(
    pathname,
    new URLSearchParams({
      ...Object.fromEntries(searchParams),
      page: `${totalPages}`,
      perPage: `${perPage}`,
    }),
  );

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious size={`sm`} href={prevHref} />
            </PaginationItem>

            {page > 2 && totalPages > 2 && (
              <PaginationItem>
                <PaginationLink size={`sm`} href={firstHref}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {page > 3 && totalPages > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink size={`sm`} href={prevHref}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "select-none hover:bg-background",
            )}
          >
            {page}
          </span>
        </PaginationItem>

        {page < totalPages && (
          <>
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink size={`sm`} href={nextHref}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages - 2 && totalPages > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {totalPages >= 2 && (
              <PaginationItem>
                <PaginationLink size={`sm`} href={lastHref}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext size={`sm`} href={nextHref} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
