import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Kbd } from "./ui/kbd";

import { useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";

type Filter = "view-all" | "monitored" | "unmonitored";

const DataTable = <Data, Value>({ columns, data }: Props<Data, Value>) => {
  const [filter, setFilter] = useState<Filter>("view-all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="max-md:-mx-4 max-lg:-mx-8">
      <div className="flex gap-4 py-6 p-6 max-lg:flex-col lg:justify-between lg:py-3">
        <ToggleGroup
          type="single"
          variant={"outline"}
          value={filter}
          onValueChange={(value: Filter) => setFilter(value)}
        >
          <ToggleGroupItem value="view-all">View All</ToggleGroupItem>
          <ToggleGroupItem value="monitored">Monitored</ToggleGroupItem>
          <ToggleGroupItem value="unmonitored">Unmonitored</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex gap-3">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
          </InputGroup>

          <Button variant={"outline"}>
            <ListFilterIcon />
            <span className="max-lg:hidden">Filters</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-secondary/40 border-t">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t py-3 px-6">
        {/* Page Indicator */}
        <p className="text-sm font-semibold text-muted-foreground max-md:mx-auto md:mr-auto">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        {/* Previous Button */}
        <Button
          variant="outline"
          className="max-md:-order-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {/* FIX: Show icon on mobile, hide on desktop (or remove md:hidden to show always) */}
          <ChevronLeftIcon className="h-4 w-4 md:hidden" />
          <span className="max-md:hidden">Previous</span>
        </Button>

        {/* Next Button */}
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="max-md:hidden">Next</span>
          {/* ALREADY CORRECT: Shows only on mobile */}
          <ChevronRightIcon className="h-4 w-4 md:hidden" />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
