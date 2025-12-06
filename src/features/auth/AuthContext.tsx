import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMe, type User } from "./authApi";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at?: string;
}

interface AuthContextType {
  x: number;
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = function ({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    setIsLoading,
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("SUPABASE_TOKEN");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const meRes = await getMe();
        setUser(meRes);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("SUPABASE_TOKEN");
      } finally {
        setIsLoading(false);
      }
      //   console.log(meRes);
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = function () {
  const authCon = useContext(AuthContext);

  if (authCon === undefined) {
    throw new Error("Undefined...");
  }

  return authCon;
};
