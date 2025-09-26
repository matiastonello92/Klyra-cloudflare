import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  isLoading?: boolean;
}
export function KpiCard({ title, value, icon: Icon, description, change, changeType, isLoading }: KpiCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}