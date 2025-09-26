import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Building, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
// Mock fetching functions - in a real app, these would call Supabase RPCs
const fetchUserOrgs = async (userId: string) => {
  console.log('Fetching orgs for user:', userId);
  // Mock data based on what's in the DB for testing
  return [
    { id: 'a9e7a43e-91a5-484c-8833-27f3634e4b7b', name: 'Cloudflare Ops' },
    { id: 'b8f6b32e-81a4-473c-9783-18f2735e5a6c', name: 'Demo Org' },
  ];
};
const fetchOrgLocations = async (orgId: string) => {
  console.log('Fetching locations for org:', orgId);
  // Mock data based on what's in the DB for testing
  return [
    { id: 'd8c5b21e-71a3-467c-8843-19f1836e6b5d', name: 'San Francisco HQ' },
    { id: 'e7b4a10f-60a2-458c-9774-20g2937f7a4e', name: 'London Office' },
  ];
};
export function Topbar() {
  const {
    user,
    isLoading,
    organizations,
    locations,
    currentOrgId,
    currentLocationId,
    setOrganizations,
    setLocations,
    setCurrentOrgId,
    setCurrentLocationId,
  } = useAppStore();
  const { data: orgData, isLoading: isOrgsLoading } = useQuery({
    queryKey: ['organizations', user?.id],
    queryFn: () => fetchUserOrgs(user!.id),
    enabled: !!user,
    onSuccess: (data) => {
      setOrganizations(data);
      const storedOrgId = localStorage.getItem('klyra_org_id');
      if (!currentOrgId && (storedOrgId || data.length > 0)) {
        setCurrentOrgId(storedOrgId || data[0].id);
      }
    },
  });
  const { data: locData, isLoading: isLocsLoading } = useQuery({
    queryKey: ['locations', currentOrgId],
    queryFn: () => fetchOrgLocations(currentOrgId!),
    enabled: !!currentOrgId,
    onSuccess: (data) => {
      setLocations(data);
      const storedLocId = localStorage.getItem('klyra_loc_id');
      if (!currentLocationId && (storedLocId || data.length > 0)) {
        setCurrentLocationId(storedLocId || data[0].id);
      }
    },
  });
  const handleOrgChange = (orgId: string) => {
    setCurrentOrgId(orgId);
    setCurrentLocationId(null); // Reset location when org changes
    queryClient.invalidateQueries({ queryKey: ['locations', orgId] });
    queryClient.invalidateQueries(); // Invalidate all data for new org
  };
  const handleLocationChange = (locId: string) => {
    setCurrentLocationId(locId);
    queryClient.invalidateQueries(); // Invalidate all data for new location
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const userEmail = user?.email || '';
  const avatarFallback = userEmail.charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-gray-950 md:px-6">
      <div className="flex items-center gap-4">
        {isLoading || isOrgsLoading ? (
          <Skeleton className="h-9 w-48 rounded-md" />
        ) : (
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <Select onValueChange={handleOrgChange} value={currentOrgId || ''}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {isLoading || isLocsLoading ? (
          <Skeleton className="h-9 w-48 rounded-md" />
        ) : (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Select onValueChange={handleLocationChange} value={currentLocationId || ''} disabled={!currentOrgId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle className="relative" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={userEmail} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}