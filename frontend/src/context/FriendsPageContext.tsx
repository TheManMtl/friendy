import React, { createContext, useContext, useState, ReactNode } from 'react';

// logic to determine which route will be set
type FriendsPageContextProps = {
  selectedRoute: string;
  setRoute: (route: string) => void;
};

// context can either be set from props, or undefined (ex: visiting friends page from another part of the site, default view)
const FriendsPageContext = createContext<FriendsPageContextProps | undefined>(undefined);

type FriendsPageProviderProps = {
  children: ReactNode;
};

export const FriendsPageProvider: React.FC<FriendsPageProviderProps> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState('/');

  const setRoute = (route: string) => {
    setSelectedRoute(route);
  };

  return (
    <FriendsPageContext.Provider value={{ selectedRoute, setRoute }}>
      {children}
    </FriendsPageContext.Provider>
  );
};

export const useFriendsPageContext = (): FriendsPageContextProps => {
  const context = useContext(FriendsPageContext);
  if (!context) {
    throw new Error('useFriendsPageContext must be used within a FriendsPageProvider');
  }
  return context;
};
