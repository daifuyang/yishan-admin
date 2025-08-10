import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPaginationRange } from "@/lib/pagination";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageRange = getPaginationRange(
    table.getState().pagination.pageIndex + 1,
    table.getPageCount()
  );
  return (
    <div className="flex items-center justify-between select-none">
      <div className="flex items-center space-x-4 lg:space-x-4">
        <div className="text-muted-foreground items-center space-x-2 text-sm">
          共{table.getFilteredRowModel().rows.length}条
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          {pageRange.map((page, idx) => {
            const isActive =
              table.getState().pagination.pageIndex === (page as number) - 1;
            return page === "..." ? (
              <span key={idx}>...</span>
            ) : (
              <Button
                key={idx}
                variant={isActive ? "default" : "outline"}
                size="icon"
                className="size-8"
                onClick={() => table.setPageIndex((page as number) - 1)}
                style={{
                  fontWeight:
                    isActive
                      ? "bold"
                      : "normal",
                }}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}条/页
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
