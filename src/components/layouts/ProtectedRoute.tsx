import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { AppLayout } from './AppLayout';
import { Loader2 } from 'lucide-react';
export function ProtectedRoute() {
  const session = useAppStore((state) => state.session);
  const isLoading = useAppStore((state) => state.isLoading);
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return (
    <AppLayout />
  );
}