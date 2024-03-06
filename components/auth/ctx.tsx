import { Session } from "@supabase/gotrue-js";
import { useNavigationContainerRef, useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "~/utils/supabase";

type AuthContextType = {
  session: Session | null;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  logOut: () => {},
});

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const logOut = async () => {
    router.replace("/");
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useProtectedRoute = () => {
  const { session } = useContext(AuthContext);
  const rootNavigation = useNavigationContainerRef();
  const [navigationReady, setNavigationReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      // console.log("INFO: rootNavigation?.addListener('state')", event);
      setNavigationReady(true);
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!navigationReady) {
      return;
    }

    if (!session) {
      router.replace("/");
    }
  }, [navigationReady, router]);
};

export { AuthContext, AuthProvider, useProtectedRoute, useAuth };
