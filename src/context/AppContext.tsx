"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

export interface PayRun {
    id: string;
    month: string;
    year: number;
    status: 'draft' | 'pending' | 'paid';
    type: 'regular' | 'onetime' | 'offcycle';
    employeeIds?: string[];
    totalAmount: number;
    employeeCount: number;
    createdAt: string;
    paymentDate?: string;
    description?: string;
    // Advanced fields
    reasonType?: 'Arrears' | 'Correction' | 'F&F' | 'Missed Salary' | 'Bonus' | 'Incentive' | 'Other';
    remarks?: string;
    isTaxable?: boolean;
    rejectionReason?: string;
    approvedBy?: string;
    approvedAt?: string;
    submittedBy?: string;
    submittedAt?: string;
}

interface OrganizationData {
    id?: string;
    name: string;
    logo: string;
    businessLocation: string;
    industry: string;
    dateFormat: string;
    address: string;
    headOffice?: string;
    headOfficeCity?: string;
    headOfficeState?: string;
    headOfficePincode?: string;
    primaryContactEmail?: string;
    secondaryContactEmail?: string;
    secondaryContactName?: string;
}

interface AppContextType {
    organizationData: OrganizationData;
    setOrganizationData: (data: OrganizationData) => void;
    updateOrganization: (data: Partial<OrganizationData>) => void;
    // Employee management
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
    addEmployees: (employees: Employee[]) => void;
    // Payrun management
    payruns: PayRun[];
    addPayRun: (payrun: PayRun) => void;
    updatePayRun: (id: string, data: Partial<PayRun>) => void;
    deletePayRun: (id: string) => void;
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
        address: ''
    });

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [payruns, setPayruns] = useState<PayRun[]>([]);

    // Persistence
    useEffect(() => {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            try {
                setEmployees(JSON.parse(savedEmployees));
            } catch (e) {
                console.error("Failed to parse employees from localStorage", e);
            }
        }

        const savedPayruns = localStorage.getItem('payruns');
        if (savedPayruns) {
            try {
                setPayruns(JSON.parse(savedPayruns));
            } catch (e) {
                console.error("Failed to parse payruns from localStorage", e);
            }
        }

        const savedOrg = localStorage.getItem('organizationData');
        if (savedOrg) {
            try {
                setOrganizationData(JSON.parse(savedOrg));
            } catch (e) {
                console.error("Failed to parse organizationData from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        localStorage.setItem('payruns', JSON.stringify(payruns));
    }, [payruns]);

    useEffect(() => {
        localStorage.setItem('organizationData', JSON.stringify(organizationData));
    }, [organizationData]);

    const markStepComplete = (step: string) => {
        console.log(`Step ${step} completed`);
    };

    const addEmployee = (employee: Employee) => {
        setEmployees(prev => [...prev, employee]);
    };

    const addEmployees = (newEmployees: Employee[]) => {
        setEmployees(prev => [...prev, ...newEmployees]);
    };

    const addPayRun = (payrun: PayRun) => {
        setPayruns(prev => [...prev, payrun]);
    };

    const updatePayRun = (id: string, data: Partial<PayRun>) => {
        setPayruns(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    };

    const deletePayRun = (id: string) => {
        setPayruns(prev => prev.filter(p => p.id !== id));
    };

    const updateOrganization = (data: Partial<OrganizationData>) => {
        setOrganizationData(prev => ({ ...prev, ...data }));
    };

    return (
        <AppContext.Provider value={{
            organizationData,
            setOrganizationData,
            updateOrganization,
            employees,
            addEmployee,
            addEmployees,
            payruns,
            addPayRun,
            updatePayRun,
            deletePayRun,
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