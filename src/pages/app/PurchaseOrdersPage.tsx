import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app-store';
import { PurchaseOrder } from "shared/types";
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from './purchase-orders/columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert as AlertTriangleIcon } from 'lucide-react';
async function fetchPurchaseOrders(orgId: string): Promise<PurchaseOrder[]> {
  if (!orgId) return [];
  const { data, error } = await supabase.
  from('purchase_orders').
  select(`
      *,
      suppliers ( name ),
      locations ( name )
    `).
  eq('org_id', orgId).
  order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as PurchaseOrder[];
}
export function PurchaseOrdersPage() {
  const currentOrgId = useAppStore((state) => state.currentOrgId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['purchase_orders', currentOrgId],
    queryFn: () => fetchPurchaseOrders(currentOrgId!),
    enabled: !!currentOrgId
  });
  const renderContent = () => {
    if (isLoading || !currentOrgId) {
      return (
        <div className="space-y-4 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>);

    }
    if (isError) {
      return (
        <div className="p-4">
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load purchase orders: {error.message}
            </AlertDescription>
          </Alert>
        </div>);

    }
    return <DataTable columns={columns} data={data || []} filterColumn='suppliers.name' filterPlaceholder='Filter by supplier...' />;
  };
  return (
    <>
      <PageHeader
        title="Purchase Orders"
        description="Create, track, and manage your purchase orders.">

        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </PageHeader>
      <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
        {renderContent()}
      </div>
    </>);

}