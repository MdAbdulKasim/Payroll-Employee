"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { X, Calendar, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface LoanOption {
  value: string;
  label: string;
}

interface EmployeeOption {
  value: string;
  label: string;
}

interface FormData {
  loanName: string;
  employeeName: string;
  loanAmount: string;
  disbursementDate: Date | null;
  reason: string;
  exemptFromPerquisite: boolean;
}

export default function CreateLoanPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    loanName: '',
    employeeName: '',
    loanAmount: '',
    disbursementDate: null,
    reason: '',
    exemptFromPerquisite: false
  });

  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<EmployeeOption[]>([]);
  const [openLoan, setOpenLoan] = useState<boolean>(false);
  const [openEmployee, setOpenEmployee] = useState<boolean>(false);
  const [loanSearchQuery, setLoanSearchQuery] = useState<string>('');
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState<string>('');
  const [newLoanInput, setNewLoanInput] = useState<string>('');
  const [newEmployeeInput, setNewEmployeeInput] = useState<string>('');
  const [showNewLoanInput, setShowNewLoanInput] = useState<boolean>(false);
  const [showNewEmployeeInput, setShowNewEmployeeInput] = useState<boolean>(false);

  const handleClose = () => {
    router.back();
  };

  const handleSave = () => {
    if (!formData.loanName) {
      alert('Please select or enter a Loan Name');
      return;
    }
    if (!formData.employeeName) {
      alert('Please select or enter an Employee Name');
      return;
    }
    if (!formData.loanAmount) {
      alert('Please enter a Loan Amount');
      return;
    }
    if (!formData.disbursementDate) {
      alert('Please select a Disbursement Date');
      return;
    }
    if (!formData.reason) {
      alert('Please enter a Reason');
      return;
    }

    console.log('Form data:', formData);
    alert('Loan created successfully!');
    router.back();
  };

  const handleAddNewLoan = () => {
    if (newLoanInput.trim()) {
      const newLoanValue = newLoanInput.toLowerCase().replace(/\s+/g, '-');
      const newLoan: LoanOption = { value: newLoanValue, label: newLoanInput };
      setLoanOptions([...loanOptions, newLoan]);
      setFormData({...formData, loanName: newLoanValue});
      setNewLoanInput('');
      setShowNewLoanInput(false);
      setOpenLoan(false);
      setLoanSearchQuery('');
    }
  };

  const handleAddNewEmployee = () => {
    if (newEmployeeInput.trim()) {
      const newEmpValue = `emp${employeeOptions.length + 1}`;
      const newEmployee: EmployeeOption = { value: newEmpValue, label: newEmployeeInput };
      setEmployeeOptions([...employeeOptions, newEmployee]);
      setFormData({...formData, employeeName: newEmpValue});
      setNewEmployeeInput('');
      setShowNewEmployeeInput(false);
      setOpenEmployee(false);
      setEmployeeSearchQuery('');
    }
  };

  const handleCreateLoanRoute = () => {
    router.push('/create-loan');
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLoanAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({...formData, loanAmount: value});
    }
  };

  const filteredLoanOptions = loanOptions.filter(loan =>
    loan.label.toLowerCase().includes(loanSearchQuery.toLowerCase())
  );

  const filteredEmployeeOptions = employeeOptions.filter(emp =>
    emp.label.toLowerCase().includes(employeeSearchQuery.toLowerCase())
  );

  const getSelectedLoanLabel = (): string => {
    const selected = loanOptions.find(loan => loan.value === formData.loanName);
    return selected ? selected.label : '';
  };

  const getSelectedEmployeeLabel = (): string => {
    const selected = employeeOptions.find(emp => emp.value === formData.employeeName);
    return selected ? selected.label : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[800px]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Create Loan</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
            {/* Loan Name */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Loan Name<span className="text-red-500">*</span>
              </label>
              <Popover open={openLoan} onOpenChange={setOpenLoan}>
                <PopoverTrigger asChild>
                  <button
                    className="w-full h-9 sm:h-10 px-3 text-left text-xs sm:text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {getSelectedLoanLabel() || 'Start typing...'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <div className="p-2">
                    <Input
                      value={loanSearchQuery}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setLoanSearchQuery(e.target.value);
                        setShowNewLoanInput(false);
                      }}
                      placeholder="Start typing..."
                      className="h-9 text-sm"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredLoanOptions.length > 0 ? (
                      filteredLoanOptions.map((loan) => (
                        <button
                          key={loan.value}
                          onClick={() => {
                            setFormData({...formData, loanName: loan.value});
                            setOpenLoan(false);
                            setLoanSearchQuery('');
                          }}
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2",
                            formData.loanName === loan.value && "bg-blue-50"
                          )}
                        >
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {loan.label}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No loan found.
                      </div>
                    )}
                  </div>
                  <div className="border-t p-2">
                    {!showNewLoanInput ? (
                      <button
                        onClick={() => setShowNewLoanInput(true)}
                        className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 rounded"
                      >
                        <Plus className="h-4 w-4" />
                        Create New Loan
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          value={newLoanInput}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLoanInput(e.target.value)}
                          placeholder="Enter new loan name"
                          className="h-9 text-sm"
                          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              handleAddNewLoan();
                            }
                          }}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleAddNewLoan}
                            className="flex-1 h-8"
                          >
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowNewLoanInput(false)}
                            className="flex-1 h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Perquisite Rate */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Perquisite Rate: 0%
              </label>
            </div>

            {/* Employee Name and Loan Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Employee Name<span className="text-red-500">*</span>
                  </label>
                  <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full h-9 sm:h-10 px-3 text-left text-xs sm:text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getSelectedEmployeeLabel() || "Start typing..."}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <div className="p-2">
                        <Input
                          value={employeeSearchQuery}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmployeeSearchQuery(e.target.value)}
                          placeholder="Start typing..."
                          className="h-9 text-sm"
                        />
                      </div>

                      <div className="max-h-[200px] overflow-y-auto">
                        {filteredEmployeeOptions.length > 0 ? (
                          filteredEmployeeOptions.map((emp) => (
                            <button
                              key={emp.value}
                              onClick={() => {
                                setFormData({ ...formData, employeeName: emp.value });
                                setOpenEmployee(false);
                                setEmployeeSearchQuery("");
                              }}
                              className={cn(
                                "w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2",
                                formData.employeeName === emp.value && "bg-blue-50"
                              )}
                            >
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {emp.label}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            No employee found.
                          </div>
                        )}
                      </div>

                      <div className="border-t p-2">
                        <button
                          onClick={() => router.push("/admin/employee/basic")}
                          className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 rounded"
                        >
                          <Plus className="h-4 w-4" />
                          Add New Employee
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1">
                    Loan Amount<span className="text-red-500">*</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">₹</span>
                    <Input
                      type="text"
                      value={formData.loanAmount}
                      onChange={handleLoanAmountChange}
                      className="pl-7 h-9 sm:h-10 text-xs sm:text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Disbursement Date */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Disbursement Date<span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-9 sm:h-10 justify-start text-left font-normal text-xs sm:text-sm",
                      !formData.disbursementDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.disbursementDate ? formatDate(formData.disbursementDate) : "dd/MM/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.disbursementDate || undefined}
                    onSelect={(date) => setFormData({...formData, disbursementDate: date || null})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Reason */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Reason<span className="text-red-500">*</span>
              </label>
              <Textarea
                value={formData.reason}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, reason: e.target.value})}
                className="min-h-[80px] sm:min-h-[100px] resize-none text-xs sm:text-sm"
                placeholder="Enter reason for loan"
              />
            </div>

            {/* Exemption Checkbox */}
            <div className="flex items-start gap-2 p-3 sm:p-4 bg-blue-50 rounded-md border border-blue-100">
              <Checkbox 
                id="exempt"
                checked={formData.exemptFromPerquisite}
                onCheckedChange={(checked) => setFormData({...formData, exemptFromPerquisite: checked === true})}
                className="mt-0.5"
              />
              <label 
                htmlFor="exempt" 
                className="text-xs sm:text-sm text-gray-700 leading-tight cursor-pointer"
              >
                <span className="font-medium">Exempt this loan from perquisite calculation</span>
                <p className="text-gray-600 mt-1">
                  According to Rule 3(A), employees availing medical loan or any loan below ₹20,000 can be exempted from perquisite calculation.
                </p>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="flex-1 sm:flex-none h-9 sm:h-10 text-xs sm:text-sm px-4 sm:px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="flex-1 sm:flex-none h-9 sm:h-10 text-xs sm:text-sm px-4 sm:px-6 bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}