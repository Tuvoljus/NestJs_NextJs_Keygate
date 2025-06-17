'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

// const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_FRONTEND_URL : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001";
const FRONTEND_URL = process.env.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001/";

console.log(`FRONTEND_URL in Context: ${FRONTEND_URL}`);
interface Employee {
  id: number;
  name: string;
  checkInTime: string;
}

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetchEmployee: () => Promise<void>;
  createEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  loading: false,
  error: null,
  refetchEmployee: async () => {},
  createEmployee: async () => {},
});

const api = axios.create({
  baseURL: `${FRONTEND_URL}api`,
});

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await api.get<Employee[]>('/employees');

console.log("Fetched employees:", response.data);

      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const response = await api.post<Employee>('/employees', employee);
      setEmployees(prev => [...prev, response.data]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create employee');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  console.log('FetchedInProdider' , employees);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        refetchEmployee: fetchEmployees,
        createEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);