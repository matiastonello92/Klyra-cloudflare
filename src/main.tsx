import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
// Layouts and Pages
import { ProtectedRoute } from '@/components/layouts/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/app/DashboardPage';
import { InventoryPage } from '@/pages/app/InventoryPage';
import { SuppliersPage } from '@/pages/app/SuppliersPage';
import { PurchaseOrdersPage } from '@/pages/app/PurchaseOrdersPage';
import { HaccpPage } from '@/pages/app/HaccpPage';
import { IncidentsPage } from '@/pages/app/IncidentsPage';
import { TasksPage } from '@/pages/app/TasksPage';
import { SettingsPage } from '@/pages/app/SettingsPage';
import { PlatformAdminPage } from '@/pages/app/PlatformAdminPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "suppliers", element: <SuppliersPage /> },
      { path: "purchase-orders", element: <PurchaseOrdersPage /> },
      { path: "haccp", element: <HaccpPage /> },
      { path: "incidents", element: <IncidentsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "platform-admin", element: <PlatformAdminPage /> },
    ],
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);