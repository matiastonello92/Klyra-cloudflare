import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartDataPoint } from 'shared/types';
const data: ChartDataPoint[] = [
  { name: 'Vegetables', value: 5 },
  { name: 'Dairy', value: 2 },
  { name: 'Dry Goods', value: 8 },
  { name: 'Beverages', value: 1 },
  { name: 'Meat', value: 4 },
];
export function InventorySummaryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Understocked Items</CardTitle>
        <CardDescription>Number of items below minimum stock level by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Understocked Items" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}