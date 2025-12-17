"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface SalaryComponentsProps {
  onComplete?: () => void;
}

type ComponentType = "earnings" | "deductions" | "benefits" | "reimbursement";

interface SalaryComponent {
  id: string;
  name: string;
  type: ComponentType;
  enabled: boolean;
}

const defaultComponents: SalaryComponent[] = [
  { id: "1", name: "Basic Salary", type: "earnings", enabled: true },
  { id: "2", name: "HRA", type: "earnings", enabled: true },
  { id: "3", name: "Provident Fund", type: "deductions", enabled: true },
  { id: "4", name: "Professional Tax", type: "deductions", enabled: true },
];

export default function SalaryComponents({ onComplete }: SalaryComponentsProps) {
  const [components, setComponents] = useState<SalaryComponent[]>(defaultComponents);
  const [activeTab, setActiveTab] = useState<ComponentType>("earnings");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComponent, setNewComponent] = useState({
    name: "",
    type: "earnings" as ComponentType,
  });

  // Load saved components from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("salaryComponents");
    if (saved) {
      try {
        setComponents(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading salary components:", error);
      }
    }
  }, []);

  const toggleComponent = (id: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, enabled: !comp.enabled } : comp
      )
    );
  };

  const openDialog = (type: ComponentType) => {
    setNewComponent({ name: "", type });
    setIsDialogOpen(true);
  };

  const addComponent = () => {
    if (newComponent.name.trim()) {
      const component: SalaryComponent = {
        id: Date.now().toString(),
        name: newComponent.name,
        type: newComponent.type,
        enabled: true,
      };
      setComponents((prev) => [...prev, component]);
      setNewComponent({ name: "", type: "earnings" });
      setIsDialogOpen(false);
      toast.success("Component added successfully");
    } else {
      toast.error("Please enter a component name");
    }
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
    toast.success("Component removed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("salaryComponents", JSON.stringify(components));

    // Mark step as complete
    if (onComplete) {
      onComplete();
    }

    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("salary-components")) {
      completedSteps.push("salary-components");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.success("Salary components configured successfully");
  };

  const getComponentsByType = (type: ComponentType) =>
    components.filter((comp) => comp.type === type);

  const tabs: { value: ComponentType; label: string; description: string }[] = [
    {
      value: "earnings",
      label: "Earnings",
      description:
        "Configure earnings components that will be added to employee salaries",
    },
    {
      value: "deductions",
      label: "Deductions",
      description:
        "Configure deduction components that will be subtracted from employee salaries",
    },
    {
      value: "benefits",
      label: "Benefits",
      description: "Configure benefit components provided to employees",
    },
    {
      value: "reimbursement",
      label: "Reimbursement",
      description: "Configure reimbursement components for expense claims",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`space-y-4 ${activeTab === tab.value ? "block" : "hidden"}`}
          >
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-gray-600">{tab.description}</p>
              <button
                type="button"
                onClick={() => openDialog(tab.value)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                Add Component
              </button>
            </div>

            {/* Components List */}
            <div className="space-y-2">
              {getComponentsByType(tab.value).length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No {tab.label.toLowerCase()} added yet
                </p>
              ) : (
                getComponentsByType(tab.value).map((comp) => (
                  <div
                    key={comp.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={comp.enabled}
                        onClick={() => toggleComponent(comp.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          comp.enabled ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            comp.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <label className="cursor-pointer text-sm font-medium text-gray-900">
                        {comp.name}
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComponent(comp.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Save & Continue
        </button>
      </div>

      {/* Dialog Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Component
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Add a new {activeTab} component to the salary structure
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <div className="space-y-2">
                <label
                  htmlFor="componentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Component Name
                </label>
                <input
                  id="componentName"
                  type="text"
                  placeholder={`e.g., ${
                    activeTab === "earnings"
                      ? "Special Allowance"
                      : activeTab === "deductions"
                      ? "Income Tax"
                      : activeTab === "benefits"
                      ? "Health Insurance"
                      : "Travel Expense"
                  }`}
                  value={newComponent.name}
                  onChange={(e) =>
                    setNewComponent({ ...newComponent, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addComponent();
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addComponent}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Add Component
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}