import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  baseUrl: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function PaginationCont({
  totalItems,
  baseUrl,
  currentPage,
  totalPages,
  pageSize,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="h-16 flex items-center justify-center">
      <Pagination className="scale-90">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href={isFirstPage ? "#" : `${baseUrl}/${currentPage - 1}`}
              aria-disabled={isFirstPage}
              className={isFirstPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Current Page */}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href={isLastPage ? "#" : `${baseUrl}/${currentPage + 1}`}
              aria-disabled={isLastPage}
              className={isLastPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
