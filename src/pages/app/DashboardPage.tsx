import React from 'react';
import { useAppStore } from '@/store/app-store';
import { KpiCard } from '@/components/KpiCard';
import { Boxes, ClipboardList, ShieldAlert, TriangleAlert } from 'lucide-react';
import { PoStatusChart } from '@/components/charts/PoStatusChart';
import { InventorySummaryChart } from '@/components/charts/InventorySummaryChart';
export function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const userEmail = user?.email || 'user';
  const isLoading = false; // Replace with real loading state from data fetching hooks
  return (
    <div className="space-y-8 animate-scale-in">
      <header>
        <h1 className="text-4xl font-bold font-display">Dashboard</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Welcome back, {userEmail}! Here's your operational overview.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Understocked Items"
          value="12"
          icon={Boxes}
          description="Items below minimum stock level"
          isLoading={isLoading}
        />
        <KpiCard
          title="Open POs"
          value="8"
          icon={ClipboardList}
          description="Purchase orders awaiting delivery"
          isLoading={isLoading}
        />
        <KpiCard
          title="HACCP Checks Due"
          value="3"
          icon={ShieldAlert}
          description="Compliance checks to be performed today"
          isLoading={isLoading}
        />
        <KpiCard
          title="Active Incidents"
          value="2"
          icon={TriangleAlert}
          description="High or Critical severity incidents"
          isLoading={isLoading}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PoStatusChart />
        <InventorySummaryChart />
      </div>
    </div>
  );
}