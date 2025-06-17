import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
  data: string;
  setData: (value: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<string>("");

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData muss innerhalb eines DataProvider verwendet werden");
  }
  return context;
};
