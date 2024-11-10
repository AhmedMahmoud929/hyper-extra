import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  baseUrl: string;
  itemsCount: number;
  currentPage: number;
  visibleItems: number; 
}

export function PaginationCont({
  itemsCount,
  baseUrl,
  currentPage,
  visibleItems,
}: PaginationProps) {
  // Determine the page numbers to display
  const pages = [];
  const totalPages = itemsCount;

  if (totalPages <= visibleItems) {
    // If total pages is less than or equal to visible items, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Calculate the range around the current page
    const startPage = Math.max(1, currentPage - Math.floor(visibleItems / 2));
    const endPage = Math.min(totalPages, startPage + visibleItems - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < visibleItems) {
      const newStartPage = Math.max(1, endPage - visibleItems + 1);
      for (let i = newStartPage; i <= endPage; i++) {
        pages.push(i);
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
  }

  return (
    <div className="h-16 flex items-center justify-center">
      <Pagination className="scale-90">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          {/* First Page with Ellipsis if needed */}
          {currentPage > Math.floor(visibleItems / 2) &&
            totalPages > visibleItems && (
              <>
                <PaginationItem>
                  <PaginationLink href={`${baseUrl}/1`}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

          {/* Pagination Items */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${baseUrl}/${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last Page with Ellipsis if needed */}
          {currentPage < totalPages - Math.floor(visibleItems / 2) &&
            totalPages > visibleItems && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`${baseUrl}/${totalPages}`}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
