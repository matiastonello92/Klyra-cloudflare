import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Truck,
  ClipboardList,
  ShieldAlert,
  TriangleAlert,
  CheckSquare,
  Settings,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/inventory', icon: Boxes, label: 'Inventory' },
  { to: '/app/suppliers', icon: Truck, label: 'Suppliers' },
  { to: '/app/purchase-orders', icon: ClipboardList, label: 'Purchase Orders' },
  { to: '/app/haccp', icon: ShieldAlert, label: 'HACCP' },
  { to: '/app/incidents', icon: TriangleAlert, label: 'Incidents' },
  { to: '/app/tasks', icon: CheckSquare, label: 'Tasks & Checklists' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
  { to: '/app/platform-admin', icon: ShieldCheck, label: 'Platform Admin' },
];
export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-white p-4 dark:bg-gray-950 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Rocket className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          Klyra
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  end={item.to === '/app'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50',
                      isActive &&
                        'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}