import { useState, createContext, ReactNode } from "react";

type Props = {
  children?: ReactNode;
}

type User = {
  id: number;
  name: string;
  email: string
  role: string;
  token: string;
  refreshToken?: string; //TODO
}

type ContextType = {
  user: User | null;
  setUser: (newState: User | null) => void;
};

export const AuthContext = createContext<ContextType | null>(null);

const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);

  return (

    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>

  );
};

export default AuthProvider;
