import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserById: (id: string) => User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: "app_users", // Stores all registered users
  SESSION: "app_session", // Stores current logged in user ID
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load session on startup
  useEffect(() => {
    const sessionId = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (sessionId) {
      const users = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.USERS) || "[]"
      );
      const foundUser = users.find((u: any) => u.id === sessionId);
      if (foundUser) {
        // Exclude password from state
        setUser({
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        });
      }
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");

    if (users.some((u: any) => u.email === email)) {
      alert("Email já cadastrado!");
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // In a real app, this should be hashed. Here purely for demo persistence.
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

    // Auto login after register
    localStorage.setItem(STORAGE_KEYS.SESSION, newUser.id);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return true;
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem(STORAGE_KEYS.SESSION, foundUser.id);
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });
      return true;
    }

    alert("Email ou senha incorretos.");
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
  };

  const getUserById = (id: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const foundUser = users.find((u: any) => u.id === id);
    if (foundUser) {
      return { id: foundUser.id, name: foundUser.name, email: foundUser.email };
    }
    return undefined;
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, getUserById }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
