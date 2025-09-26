import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app-store';
import { InventoryItem } from "shared/types";
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from './inventory/columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert as AlertTriangleIcon } from 'lucide-react';
async function fetchInventoryItems(orgId: string): Promise<InventoryItem[]> {
  if (!orgId) return [];
  const { data, error } = await supabase.
  from('inventory_items').
  select(`
      *,
      suppliers ( name )
    `).
  eq('org_id', orgId);
  if (error) {
    throw new Error(error.message);
  }
  return data as InventoryItem[];
}
export function InventoryPage() {
  const currentOrgId = useAppStore((state) => state.currentOrgId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['inventory', currentOrgId],
    queryFn: () => fetchInventoryItems(currentOrgId!),
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
                Failed to load inventory items: {error.message}
            </AlertDescription>
            </Alert>
        </div>);

    }
    return <DataTable columns={columns} data={data || []} />;
  };
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Manage your items and track stock levels across all locations.">

        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </PageHeader>
      <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
        {renderContent()}
      </div>
    </>);

}