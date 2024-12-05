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
import { cn } from "@/lib/utils";

type PaginationControlsProps = {
  total: number;
  page: number;
  perPage: number;
};

export function PaginationControls({ total, page, perPage }: PaginationControlsProps) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious size={`sm`} href={`?page=${page - 1}&perPage=${perPage}`} />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink size={`sm`} href={`?page=${page - 1}&perPage=${perPage}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hover:bg-background",
            )}
          >
            {page}
          </span>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink size={`sm`} href={`?page=${page + 1}&perPage=${perPage}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext size={`sm`} href={`?page=${page + 1}&perPage=${perPage}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
