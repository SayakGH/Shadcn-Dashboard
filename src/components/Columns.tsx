import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import Avatar from "react-avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent } from "./ui/tooltip";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";

import type { ColumnDef } from "@tanstack/react-table";

type VendorCategories =
  | "Active"
  | "Inactive"
  | "Database access"
  | "Admin"
  | "Salesforce"
  | "Business data"
  | "Customer data"
  | "Financials"
  | "SOC2"
  | "Legal";

export type Vendor = {
  src: string;
  name: string;
  website: string;
  rating: number;
  ratingGrowthPercent: number;
  lastAssessed: string;
  categories: VendorCategories[];
};

export const columns: ColumnDef<Vendor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        // FIX: Use Page-level state to match the Page-level toggle action
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all on page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>Vendor</span>
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon />
          ) : (
            <ArrowUpIcon />
          )}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "lastAssessed",
    header: "Last Assessed",
  },
  {
    accessorKey: "categories",
    header: "Categories",
  },
];

const Columns = () => {
  return <div>Columns</div>;
};

export default Columns;
