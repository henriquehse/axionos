import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isDemoMode = false; // Forced to always use real authentication

  useEffect(() => {
    if (isDemoMode) {
      console.warn("🚀 AXIONOS: Demo Mode Active. Simulating Sovereign Auth.");
      const savedUser = localStorage.getItem("axionos_mock_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setSession({ user: u } as any);
        setUser(u as any);
      }
      setLoading(false);
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode]);

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      const mockUser = { email, id: "mock-uid-" + Date.now(), user_metadata: { display_name: "Sovereign User" } };
      localStorage.setItem("axionos_mock_user", JSON.stringify(mockUser));
      setUser(mockUser as any);
      setSession({ user: mockUser } as any);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    if (isDemoMode) {
      const mockUser = { email, id: "mock-uid-" + Date.now(), user_metadata: { display_name: displayName || "Sovereign User" } };
      localStorage.setItem("axionos_mock_user", JSON.stringify(mockUser));
      setUser(mockUser as any);
      setSession({ user: mockUser } as any);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem("axionos_mock_user");
      setUser(null);
      setSession(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
