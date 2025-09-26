import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartDataPoint } from 'shared/types';

interface PoStatusChartProps {
  data: ChartDataPoint[];
}

export function PoStatusChart({ data }: PoStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Orders by Status</CardTitle>
        <CardDescription>A summary of all purchase orders in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="PO Count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}