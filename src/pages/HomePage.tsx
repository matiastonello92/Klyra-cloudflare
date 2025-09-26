import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { supabase } from '@/lib/supabase';
import { Loader2, Rocket } from 'lucide-react';
export function HomePage() {
  const navigate = useNavigate();
  const { session, setSession, setUser, isLoading, setLoading } = useAppStore();
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, [setSession, setUser, setLoading]);
  useEffect(() => {
    if (!isLoading) {
      if (session) {
        navigate('/app', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [session, isLoading, navigate]);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="flex items-center gap-4 mb-4">
        <Rocket className="h-12 w-12 text-blue-600" />
        <h1 className="text-5xl font-bold font-display">Klyra</h1>
      </div>
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="mt-4 text-muted-foreground">Initializing application...</p>
    </div>
  );
}