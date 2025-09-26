import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Session, User } from '@supabase/supabase-js';
// Define interfaces for the application's data structures
// These will be expanded in later phases
interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}
interface Organization {
  id: string;
  name: string;
}
interface Location {
  id: string;
  name: string;
}
// Define the state structure for the store
type AppState = {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  organizations: Organization[];
  locations: Location[];
  currentOrgId: string | null;
  currentLocationId: string | null;
  isLoading: boolean;
};
// Define the actions that can be performed on the state
type AppActions = {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setOrganizations: (orgs: Organization[]) => void;
  setLocations: (locs: Location[]) => void;
  setCurrentOrgId: (orgId: string | null) => void;
  setCurrentLocationId: (locId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
// Define the initial state of the store
const initialState: AppState = {
  session: null,
  user: null,
  userProfile: null,
  organizations: [],
  locations: [],
  currentOrgId: typeof window !== 'undefined' ? localStorage.getItem('klyra_org_id') : null,
  currentLocationId: typeof window !== 'undefined' ? localStorage.getItem('klyra_loc_id') : null,
  isLoading: true
};
// Create the Zustand store with immer middleware for immutable updates
export const useAppStore = create<AppState & AppActions>()(
  immer((set) => ({
    ...initialState,
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setUserProfile: (profile) => set({ userProfile: profile }),
    setOrganizations: (orgs) => set({ organizations: orgs }),
    setLocations: (locs) => set({ locations: locs }),
    setCurrentOrgId: (orgId) => {
      set({ currentOrgId: orgId });
      if (typeof window !== 'undefined') {
        localStorage.setItem('klyra_org_id', orgId || '');
      }
    },
    setCurrentLocationId: (locId) => {
      set({ currentLocationId: locId });
       if (typeof window !== 'undefined') {
        localStorage.setItem('klyra_loc_id', locId || '');
      }
    },
    setLoading: (isLoading) => set({ isLoading }),
    reset: () => set(initialState),
  }))
);