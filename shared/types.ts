// This file will contain all shared types for the Klyra application.
// It's a placeholder for now and will be populated as we build out features.
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Based on PRD: inventory_items
export interface InventoryItem {
  id: string; // uuid
  org_id: string; // uuid
  sku: string | null;
  name: string;
  unit: string; // e.g., 'kg', 'liters', 'units'
  category: string | null;
  min_stock: number | null;
  supplier_id: string | null; // uuid
  created_at: string; // timestamp
  // Joined data
  suppliers?: { name: string } | null;
}
// Based on PRD: suppliers
export interface Supplier {
  id: string; // uuid
  org_id: string; // uuid
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string; // timestamp
}
// Based on PRD: purchase_orders
export type PurchaseOrderStatus = 'Draft' | 'Sent' | 'Delivered' | 'Closed';
export interface PurchaseOrder {
    id: string; // uuid
    org_id: string; // uuid
    location_id: string; // uuid
    supplier_id: string; // uuid
    status: PurchaseOrderStatus;
    eta: string | null; // date
    total_est: number | null;
    created_at: string; // timestamp
    // Joined data
    suppliers?: { name: string } | null;
    locations?: { name: string } | null;
}
export interface PurchaseOrderLine {
    id: string; // uuid
    po_id: string; // uuid
    item_id: string; // uuid
    qty: number;
    unit_price_est: number | null;
    // Joined data
    inventory_items?: { name: string; sku: string | null } | null;
}
// Based on PRD: haccp_checks
export interface HaccpCheck {
    id: string; // uuid
    org_id: string; // uuid
    location_id: string; // uuid
    check_type: string; // e.g., 'fridge_temp', 'cleaning'
    value: string; // e.g., '-18C', 'Completed'
    photo_url?: string | null;
    taken_at: string; // timestamp
    taken_by: string; // uuid
    // Joined data
    profiles?: { full_name: string | null } | null;
}
// Based on PRD: Incidents (using audit_events)
export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export interface Incident {
    id: string; // uuid from audit_events
    org_id: string; // uuid
    location_id: string; // uuid
    title: string;
    description: string;
    severity: IncidentSeverity;
    photo_url?: string | null;
    reported_at: string; // timestamp
    reported_by: string; // uuid
    // Joined data
    profiles?: { full_name: string | null } | null;
}
// Based on PRD: Tasks (using audit_events)
export type TaskStatus = 'Todo' | 'In Progress' | 'Done';
export interface Task {
    id: string; // uuid from audit_events
    org_id: string; // uuid
    location_id: string; // uuid
    title: string;
    description: string;
    status: TaskStatus;
    created_at: string; // timestamp
    created_by: string; // uuid
    assigned_to?: string | null; // uuid
    // Joined data
    creator_profile?: { full_name: string | null } | null;
    assignee_profile?: { full_name: string | null } | null;
}
// Analytics Types
export interface KpiCardData {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
    description: string;
}
export interface ChartDataPoint {
    name: string;
    value: number;
}