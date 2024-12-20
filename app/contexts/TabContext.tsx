import React, { createContext, useContext, useState } from 'react';

type TabContextType = {
  activeTab: 'home' | 'chart' | 'transfer' | 'layers' | 'profile';
  setActiveTab: (tab: 'home' | 'chart' | 'transfer' | 'layers' | 'profile') => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'chart' | 'transfer' | 'layers' | 'profile'>('home');
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
