"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Basic Employee interface - expand as needed based on actual data
export interface Employee {
    id: string;
    name: string;
    // Add other fields as necessary from AddEmployeeDialog
    department?: string;
    role?: string;
    email?: string;
    joiningDate?: string;
}

interface OrganizationData {
    name: string;
    logo: string;
    businessLocation: string;
    industry: string;
    dateFormat: string;
    address: string;
    headOfOrganization: string;
}

interface AppContextType {
    organizationData: OrganizationData;
    setOrganizationData: (data: OrganizationData) => void;
    // Employee management
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
    markStepComplete: (step: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [organizationData, setOrganizationData] = useState<OrganizationData>({
        name: '',
        logo: '',
        businessLocation: '',
        industry: '',
        dateFormat: 'DD/MM/YYYY',
        address: '',
        headOfOrganization: ''
    });

    const [employees, setEmployees] = useState<Employee[]>([]);

    const markStepComplete = (step: string) => {
        console.log(`Step ${step} completed`);
    };

    const addEmployee = (employee: Employee) => {
        setEmployees(prev => [...prev, employee]);
    };

    return (
        <AppContext.Provider value={{
            organizationData,
            setOrganizationData,
            employees,
            addEmployee,
            markStepComplete
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
