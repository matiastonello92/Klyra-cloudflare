import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
export function PlatformAdminPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold font-display">Platform Admin</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          A restricted area for platform administrators.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Platform administration tools will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}