import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Paperclip, Thermometer, Sparkles, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
// Mock data for demonstration until API is fully integrated
const mockChecks = [
  { id: '1', check_type: 'fridge_temp', value: '-18°C', taken_at: new Date().toISOString(), taken_by: { full_name: 'Jane Doe' }, photo_url: 'https://images.unsplash.com/photo-1579112944287-569d18d277a8?q=80&w=300' },
  { id: '2', check_type: 'cleaning', value: 'Completed', taken_at: new Date(Date.now() - 3600000).toISOString(), taken_by: { full_name: 'Jane Doe' } },
  { id: '3', check_type: 'opening', value: 'Completed', taken_at: new Date(Date.now() - 86400000).toISOString(), taken_by: { full_name: 'John Smith' } },
  { id: '4', check_type: 'closing', value: 'Completed', taken_at: new Date(Date.now() - 90000000).toISOString(), taken_by: { full_name: 'John Smith' }, photo_url: 'https://images.unsplash.com/photo-1587613864429-35093a2eb6a6?q=80&w=300' },
];
const checkTypeIcons: Record<string, React.ElementType> = {
  fridge_temp: Thermometer,
  cleaning: Sparkles,
  opening: Wind,
  closing: Wind,
};
export function HaccpPage() {
  return (
    <>
      <PageHeader
        title="HACCP"
        description="Conduct and log HACCP compliance checks for your location."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Check
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Recent Checks</CardTitle>
          <CardDescription>
            A log of the most recent compliance checks performed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockChecks.map((check) => {
              const Icon = checkTypeIcons[check.check_type] || Thermometer;
              return (
                <div key={check.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 dark:bg-muted/20">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold capitalize">{check.check_type.replace('_', ' ')}: <span className="font-bold text-primary">{check.value}</span></p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(check.taken_at), "MMM dd, yyyy 'at' hh:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {check.photo_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={check.photo_url} target="_blank" rel="noopener noreferrer">
                          <Paperclip className="mr-2 h-4 w-4" /> View Photo
                        </a>
                      </Button>
                    )}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${check.taken_by.full_name}`} />
                        <AvatarFallback>{check.taken_by.full_name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{check.taken_by.full_name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}