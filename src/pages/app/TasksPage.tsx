import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus } from "shared/types";
import { Checkbox } from '@/components/ui/checkbox';
const mockTasks: Task[] = [
{ id: '1', org_id: '1', location_id: '1', title: 'Perform weekly stock count', description: 'Count all items in the dry storage area.', status: 'Todo', created_at: new Date().toISOString(), created_by: 'user1' },
{ id: '2', org_id: '1', location_id: '1', title: 'Clean ventilation filters', description: 'Filters for units #1 and #2.', status: 'In Progress', created_at: new Date(Date.now() - 86400000).toISOString(), created_by: 'user2' },
{ id: '3', org_id: '1', location_id: '1', title: 'Submit monthly report', description: 'Finalize and submit the operational report for May.', status: 'Done', created_at: new Date(Date.now() - 86400000 * 3).toISOString(), created_by: 'user1' },
{ id: '4', org_id: '1', location_id: '1', title: 'Restock front-of-house supplies', description: 'Napkins, cutlery, and condiments.', status: 'Todo', created_at: new Date(Date.now() - 3600000).toISOString(), created_by: 'user2' }];

const statusVariantMap: Record<TaskStatus, 'default' | 'secondary' | 'outline'> = {
  Todo: 'secondary',
  'In Progress': 'default',
  Done: 'outline'
};
export function TasksPage() {
  return (
    <>
      <PageHeader
        title="Tasks & Checklists"
        description="Manage daily tasks and complete operational checklists.">

        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['Todo', 'In Progress', 'Done'] as TaskStatus[]).map((status) =>
        <Card key={status}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant={statusVariantMap[status]}>{status}</Badge>
                <span className="text-muted-foreground text-sm">
                  ({mockTasks.filter((t) => t.status === status).length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockTasks.
            filter((t) => t.status === status).
            map((task) =>
            <div key={task.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/50 dark:bg-muted/20">
                    <Checkbox id={`task-${task.id}`} checked={task.status === 'Done'} className="mt-1" />
                    <div className="grid gap-0.5">
                      <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">{task.title}</label>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
            )}
            </CardContent>
          </Card>
        )}
      </div>
    </>);

}