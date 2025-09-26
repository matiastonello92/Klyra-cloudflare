"use client";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "shared/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<InventoryItem>[] = [
{
  accessorKey: "name",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>

          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>);

  }
},
{
  accessorKey: "sku",
  header: "SKU"
},
{
  accessorKey: "category",
  header: "Category",
  cell: ({ row }) => {
    const category = row.getValue("category") as string;
    return category ? <Badge variant="secondary">{category}</Badge> : <span className="text-muted-foreground">N/A</span>;
  }
},
{
  accessorKey: "unit",
  header: "Unit"
},
{
  accessorKey: "suppliers.name",
  header: "Supplier",
  cell: ({ row }) => {
    const supplierName = row.original.suppliers?.name;
    return supplierName || <span className="text-muted-foreground">Unassigned</span>;
  }
},
{
  id: "actions",
  cell: ({ row }) => {
    const item = row.original;
    return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(item.id)}>

              Copy Item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>);

  }
}];