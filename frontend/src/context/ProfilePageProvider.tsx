import React, { createContext, useContext, useState, ReactNode } from "react";

//determine which route will be st
interface RouteProps {
  selectedRoute: string;
  setRoute: (route: string) => void;
}

const ProfilePageContext = createContext<RouteProps | undefined>(undefined);

interface ProfilePageProviderProps {
  children: ReactNode;
}

export const ProfilePageProvider: React.FC<ProfilePageProviderProps> = ({
  children,
}) => {
  const [selectedRoute, setSelectedRoute] = useState("/");
  const setRoute = (route: string) => {
    setSelectedRoute(route);
  };
  return (
    <ProfilePageContext.Provider value={{ selectedRoute, setRoute }}>
      {children}
    </ProfilePageContext.Provider>
  );
};

export const useProfilePageContext = (): RouteProps => {
  const context = useContext(ProfilePageContext);
  if (!context) {
    throw new Error(
      "useProfilePageContext only used within a ProfilePageProvider"
    );
  }
  return context;
};
