import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
              <PaginationPrevious href={`?page=${page - 1}&perPage=${perPage}`} />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={`?page=${page - 1}&perPage=${perPage}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink isActive={true} href={`?page=${page}&perPage=${perPage}`}>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=${page + 1}&perPage=${perPage}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}&perPage=${perPage}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
