"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PurchaseOrder, PurchaseOrderStatus } from "shared/types";
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
import { format } from "date-fns";
const statusVariantMap: Record<PurchaseOrderStatus, "default" | "secondary" | "outline" | "destructive"> = {
  Draft: "secondary",
  Sent: "default",
  Delivered: "outline",
  Closed: "destructive"
};
export const columns: ColumnDef<PurchaseOrder>[] = [
{
  accessorKey: "id",
  header: "PO ID",
  cell: ({ row }) => {
    const id = row.getValue("id") as string;
    return <span className="font-mono text-xs">{id.split('-')[0]}...</span>;
  }
},
{
  accessorKey: "suppliers.name",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>);
  },
  cell: ({ row }) => {
    const supplierName = row.original.suppliers?.name;
    return supplierName || <span className="text-muted-foreground">N/A</span>;
  }
},
{
  accessorKey: "locations.name",
  header: "Location",
  cell: ({ row }) => {
    const locationName = row.original.locations?.name;
    return locationName || <span className="text-muted-foreground">N/A</span>;
  }
},
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status") as PurchaseOrderStatus;
    return <Badge variant={statusVariantMap[status] || "secondary"}>{status}</Badge>;
  }
},
{
  accessorKey: "total_est",
  header: () => <div className="text-right">Total (Est.)</div>,
  cell: ({ row }) => {
    const amount = row.getValue("total_est");
    if (amount === null || typeof amount !== 'number') {
      return <div className="text-right font-medium text-muted-foreground">N/A</div>;
    }
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
    return <div className="text-right font-medium">{formatted}</div>;
  }
},
{
  accessorKey: "created_at",
  header: "Created At",
  cell: ({ row }) => {
    const date = row.getValue("created_at") as string;
    return date ? format(new Date(date), "MMM dd, yyyy") : 'N/A';
  }
},
{
  id: "actions",
  cell: ({ row }) => {
    const po = row.original;
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
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(po.id)}>
              Copy PO ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>);
  }
}];