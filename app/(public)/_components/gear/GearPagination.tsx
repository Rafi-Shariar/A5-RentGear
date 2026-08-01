"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Meta {
  page: number;
  limit: number;
  totalPages: number;
}

export function GearPagination({ meta }: { meta?: Meta }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log(meta);
  

  if (!meta || meta.totalPages < 1) return null;

  const { page: currentPage, totalPages } = meta;

  const handlePageChange = (newPage: number) => {

    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      {/* <h1>{totalPages}</h1> */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => (
            <Button
              key={pageNum}
              size="sm"
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => handlePageChange(pageNum)}
              className="w-9 h-9 rounded-lg"
            >
              {pageNum}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}