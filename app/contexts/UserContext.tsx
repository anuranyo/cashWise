import React, { createContext, useContext, useState, ReactNode } from 'react';

// Типизация данных пользователя
type UserContextType = {
  userID: string | null;
  setUserID: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Провайдер контекста
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userID, setUserID] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

// Кастомный хук для использования контекста
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
