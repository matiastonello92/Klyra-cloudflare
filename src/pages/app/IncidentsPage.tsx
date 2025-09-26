import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Paperclip } from 'lucide-react';import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Incident, IncidentSeverity } from "shared/types";
const mockIncidents: Incident[] = [
{ id: '1', org_id: '1', location_id: '1', title: 'Freezer unit #3 not cooling', description: 'The temperature is reading 5°C instead of -18°C.', severity: 'High', reported_at: new Date(Date.now() - 3600000).toISOString(), reported_by: 'user1', profiles: { full_name: 'Jane Doe' }, photo_url: 'https://images.unsplash.com/photo-1613279309331-a0a04a5f2a2a?q=80&w=300' },
{ id: '2', org_id: '1', location_id: '1', title: 'Minor water leak in storage room', description: 'Small puddle found near the back wall.', severity: 'Medium', reported_at: new Date(Date.now() - 86400000 * 2).toISOString(), reported_by: 'user2', profiles: { full_name: 'John Smith' } },
{ id: '3', org_id: '1', location_id: '1', title: 'Light fixture flickering in main hall', description: 'The main overhead light is unstable.', severity: 'Low', reported_at: new Date(Date.now() - 86400000 * 5).toISOString(), reported_by: 'user1', profiles: { full_name: 'Jane Doe' } }];

const severityVariantMap: Record<IncidentSeverity, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  Low: 'secondary',
  Medium: 'outline',
  High: 'default',
  Critical: 'destructive'
};
export function IncidentsPage() {
  return (
    <>
      <PageHeader
        title="Incidents"
        description="Report and manage operational incidents.">

        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
          <CardDescription>
            A log of all reported incidents in your current location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIncidents.map((incident) =>
            <div key={incident.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <Badge variant={severityVariantMap[incident.severity]}>{incident.severity}</Badge>
                      <h3 className="text-lg font-semibold">{incident.title}</h3>
                    </div>
                    <p className="text-muted-foreground mt-1">{incident.description}</p>
                  </div>
                  {incident.photo_url &&
                <Button variant="outline" size="sm" asChild>
                      <a href={incident.photo_url} target="_blank" rel="noopener noreferrer">
                        <Paperclip className="mr-2 h-4 w-4" /> View Photo
                      </a>
                    </Button>
                }
                </div>
                <div className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                  Reported by {incident.profiles?.full_name || 'Unknown'} about {formatDistanceToNow(new Date(incident.reported_at))} ago.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>);

}