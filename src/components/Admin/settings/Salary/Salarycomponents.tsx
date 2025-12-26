"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import AddEarningDialog from "@/components/Admin/setup/salarycomponents/Addearningdialog";
import AddDeductionDialog from "@/components/Admin/setup/salarycomponents/Adddeductiondialog";
import AddBenefitDialog from "@/components/Admin/setup/salarycomponents/Addbenefitdialog";
import AddReimbursementDialog from "@/components/Admin/setup/salarycomponents/Addreimbursementdialog";
import AddCorrectionDialog from "@/components/Admin/setup/salarycomponents/Addcorrectiondialog";

interface SalaryComponentsProps {
  onComplete?: () => void;
}

type TabId = "earnings" | "deductions" | "benefits" | "reimbursements";

interface SalaryComponent {
  id: string;
  name: string;
  type: string;
  calculationType?: string;
  earningType?: string;
  deductionType?: string;
  benefitType?: string;
  frequency?: string;
  considerForEPF: boolean;
  considerForESI: boolean;
  status: "Active" | "Inactive";
}

const tabs = [
  { id: "earnings" as TabId, label: "Earnings" },
  { id: "deductions" as TabId, label: "Deductions" },
  { id: "benefits" as TabId, label: "Benefits" },
  { id: "reimbursements" as TabId, label: "Reimbursements" },
];

const initialEarnings: SalaryComponent[] = [
  {
    id: "1",
    name: "Basic",
    type: "Basic",
    earningType: "Basic",
    calculationType: "Fixed; 50% of CTC",
    considerForEPF: true,
    considerForESI: true,
    status: "Active",
  },
  {
    id: "2",
    name: "House Rent Allowance",
    type: "House Rent Allowance",
    earningType: "House Rent Allowance",
    calculationType: "Fixed; 50% of Basic",
    considerForEPF: false,
    considerForESI: true,
    status: "Active",
  },
  {
    id: "3",
    name: "Conveyance Allowance",
    type: "Conveyance Allowance",
    earningType: "Conveyance Allowance",
    calculationType: "Fixed; Flat Amount",
    considerForEPF: true,
    considerForESI: false,
    status: "Active",
  },
];

const initialDeductions: SalaryComponent[] = [
  {
    id: "d1",
    name: "Notice Pay Deduction",
    type: "Notice Pay Deduction",
    deductionType: "Notice Pay Deduction",
    frequency: "One Time",
    considerForEPF: false,
    considerForESI: false,
    status: "Active",
  },
  {
    id: "d2",
    name: "Withheld Salary",
    type: "Withheld Salary",
    deductionType: "Withheld Salary",
    frequency: "One Time",
    considerForEPF: false,
    considerForESI: false,
    status: "Active",
  },
];

const initialBenefits: SalaryComponent[] = [
  {
    id: "b1",
    name: "Voluntary Provident Fund",
    type: "Voluntary Provident Fund",
    benefitType: "Voluntary Provident Fund",
    frequency: "Recurring",
    considerForEPF: false,
    considerForESI: false,
    status: "Inactive",
  },
];

const initialReimbursements: SalaryComponent[] = [];

export default function SalaryComponents({ onComplete }: SalaryComponentsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("earnings");
  const [earnings, setEarnings] = useState<SalaryComponent[]>(initialEarnings);
  const [deductions, setDeductions] = useState<SalaryComponent[]>(initialDeductions);
  const [benefits, setBenefits] = useState<SalaryComponent[]>(initialBenefits);
  const [reimbursements, setReimbursements] = useState<SalaryComponent[]>(initialReimbursements);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addDialogType, setAddDialogType] = useState<"earning" | "correction" | "deduction" | "benefit" | "reimbursement">("earning");
  const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("salaryComponents");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setEarnings(data.earnings || initialEarnings);
        setDeductions(data.deductions || initialDeductions);
        setBenefits(data.benefits || initialBenefits);
        setReimbursements(data.reimbursements || initialReimbursements);
      } catch (error) {
        console.error("Error loading salary components:", error);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    const data = { earnings, deductions, benefits, reimbursements };
    localStorage.setItem("salaryComponents", JSON.stringify(data));
  };

  const handleAddComponent = (type: "earning" | "correction" | "benefit" | "deduction" | "reimbursement") => {
    setAddDialogType(type);
    setEditingComponent(null);
    setShowAddDialog(true);
    setShowAddMenu(false);
  };

  const handleEditComponent = (component: SalaryComponent) => {
    setEditingComponent(component);
    
    if (activeTab === "earnings") {
      setAddDialogType("earning");
    } else if (activeTab === "deductions") {
      setAddDialogType("deduction");
    } else if (activeTab === "benefits") {
      setAddDialogType("benefit");
    } else if (activeTab === "reimbursements") {
      setAddDialogType("reimbursement");
    }
    
    setShowAddDialog(true);
    setShowActionMenu(null);
  };

  const handleSaveComponent = (component: SalaryComponent) => {
    if (editingComponent) {
      if (activeTab === "earnings") {
        setEarnings(earnings.map((c) => (c.id === editingComponent.id ? component : c)));
      } else if (activeTab === "deductions") {
        setDeductions(deductions.map((c) => (c.id === editingComponent.id ? component : c)));
      } else if (activeTab === "benefits") {
        setBenefits(benefits.map((c) => (c.id === editingComponent.id ? component : c)));
      } else if (activeTab === "reimbursements") {
        setReimbursements(reimbursements.map((c) => (c.id === editingComponent.id ? component : c)));
      }
      saveToLocalStorage();
      setShowAddDialog(false);
      setEditingComponent(null);
      toast.success("Component updated successfully");
    } else {
      if (activeTab === "earnings") {
        setEarnings([...earnings, component]);
      } else if (activeTab === "deductions") {
        setDeductions([...deductions, component]);
      } else if (activeTab === "benefits") {
        setBenefits([...benefits, component]);
      } else if (activeTab === "reimbursements") {
        setReimbursements([...reimbursements, component]);
      }
      saveToLocalStorage();
      setShowAddDialog(false);
      toast.success("Component added successfully");
    }
  };

  const handleDeleteComponent = (id: string) => {
    if (activeTab === "earnings") {
      setEarnings(earnings.filter((c) => c.id !== id));
    } else if (activeTab === "deductions") {
      setDeductions(deductions.filter((c) => c.id !== id));
    } else if (activeTab === "benefits") {
      setBenefits(benefits.filter((c) => c.id !== id));
    } else if (activeTab === "reimbursements") {
      setReimbursements(reimbursements.filter((c) => c.id !== id));
    }
    saveToLocalStorage();
    setShowActionMenu(null);
    toast.success("Component deleted successfully");
  };

  const handleToggleStatus = (id: string) => {
    if (activeTab === "earnings") {
      setEarnings(
        earnings.map((c) =>
          c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
        )
      );
    } else if (activeTab === "deductions") {
      setDeductions(
        deductions.map((c) =>
          c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
        )
      );
    } else if (activeTab === "benefits") {
      setBenefits(
        benefits.map((c) =>
          c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
        )
      );
    } else if (activeTab === "reimbursements") {
      setReimbursements(
        reimbursements.map((c) =>
          c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
        )
      );
    }
    saveToLocalStorage();
    setShowActionMenu(null);
    toast.success("Component status updated");
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "earnings":
        return earnings;
      case "deductions":
        return deductions;
      case "benefits":
        return benefits;
      case "reimbursements":
        return reimbursements;
      default:
        return [];
    }
  };

  const handleComplete = () => {
    saveToLocalStorage();

    const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
    if (!completedSteps.includes("salary-components")) {
      completedSteps.push("salary-components");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.success("Salary components configured successfully");

    if (onComplete) {
      onComplete();
    }
  };

  const ActionMenu = ({ item }: { item: SalaryComponent }) => (
    <div className="relative inline-block">
      <button
        onClick={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
        className="inline-flex p-1 hover:bg-gray-200 rounded"
        aria-label="Actions"
      >
        <MoreVertical size={18} />
      </button>
      {showActionMenu === item.id && (
        <div className="absolute top-full right-0 xs:left-1/2 xs:transform xs:-translate-x-1/2 mt-1 w-32 xs:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={() => handleEditComponent(item)}
            className="block w-full text-left px-3 xs:px-4 py-2 text-xs xs:text-sm text-blue-600 hover:bg-gray-50 first:rounded-t-lg"
          >
            Edit
          </button>
          <button
            onClick={() => handleToggleStatus(item.id)}
            className="block w-full text-left px-3 xs:px-4 py-2 text-xs xs:text-sm text-gray-700 hover:bg-gray-50"
          >
            {item.status === "Active" ? "Mark as Inactive" : "Mark as Active"}
          </button>
          <button
            onClick={() => handleDeleteComponent(item.id)}
            className="block w-full text-left px-3 xs:px-4 py-2 text-xs xs:text-sm text-red-600 hover:bg-gray-50 last:rounded-b-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );

  const renderTable = () => {
    const data = getCurrentData();

    const MobileCardView = ({ item }: { item: SalaryComponent }) => {
      if (activeTab === "earnings") {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <button className="text-sm text-blue-600 hover:underline font-medium text-left">
                {item.name}
              </button>
              <ActionMenu item={item} />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Earning Type:</span>
                <span className="text-xs text-gray-900">{item.earningType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Calculation:</span>
                <span className="text-xs text-gray-900">{item.calculationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Consider for EPF:</span>
                <span className="text-xs text-gray-900">
                  {item.considerForEPF ? "Yes" : "No"}
                  {item.earningType === "Conveyance Allowance" && (
                    <span className="text-gray-500"> (If PF Wage {"<"} 15k)</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Consider for ESI:</span>
                <span className="text-xs text-gray-900">{item.considerForESI ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        );
      } else if (activeTab === "deductions") {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <button className="text-sm text-blue-600 hover:underline font-medium text-left">
                {item.name}
              </button>
              <ActionMenu item={item} />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Deduction Type:</span>
                <span className="text-xs text-gray-900">{item.deductionType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Frequency:</span>
                <span className="text-xs text-gray-900">{item.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        );
      } else if (activeTab === "benefits") {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <button className="text-sm text-blue-600 hover:underline font-medium text-left">
                {item.name}
              </button>
              <ActionMenu item={item} />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Benefit Type:</span>
                <span className="text-xs text-gray-900">{item.benefitType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Frequency:</span>
                <span className="text-xs text-gray-900">{item.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        );
      } else if (activeTab === "reimbursements") {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <button className="text-sm text-blue-600 hover:underline font-medium text-left">
                {item.name}
              </button>
              <ActionMenu item={item} />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Type:</span>
                <span className="text-xs text-gray-900">{item.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Frequency:</span>
                <span className="text-xs text-gray-900">{item.frequency || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    if (activeTab === "earnings") {
      return (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto overflow-y-visible">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EARNING TYPE</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CALCULATION TYPE</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONSIDER FOR EPF</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONSIDER FOR ESI</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 xs:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <button className="text-sm text-blue-600 hover:underline">{item.name}</button>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.earningType}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.calculationType}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.considerForEPF ? "Yes" : "No"}
                      {item.earningType === "Conveyance Allowance" && (
                        <span className="text-xs text-gray-500"> (If PF Wage {"<"} 15k)</span>
                      )}
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.considerForESI ? "Yes" : "No"}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-center">
                      <ActionMenu item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-3 px-2 py-3">
            {data.map((item) => (
              <MobileCardView key={item.id} item={item} />
            ))}
          </div>
        </>
      );
    } else if (activeTab === "deductions") {
      return (
        <>
          <div className="hidden sm:block overflow-x-auto overflow-y-visible">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEDUCTION TYPE</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEDUCTION FREQUENCY</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 xs:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <button className="text-sm text-blue-600 hover:underline">{item.name}</button>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.deductionType}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.frequency}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-center">
                      <ActionMenu item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3 px-2 py-3">
            {data.map((item) => (
              <MobileCardView key={item.id} item={item} />
            ))}
          </div>
        </>
      );
    } else if (activeTab === "benefits") {
      return (
        <>
          <div className="hidden sm:block overflow-x-auto overflow-y-visible">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BENEFIT TYPE</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BENEFIT FREQUENCY</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 xs:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <button className="text-sm text-blue-600 hover:underline">{item.name}</button>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.benefitType}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.frequency}</td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-center">
                      <ActionMenu item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3 px-2 py-3">
            {data.map((item) => (
              <MobileCardView key={item.id} item={item} />
            ))}
          </div>
        </>
      );
    } else if (activeTab === "reimbursements") {
      return (
        <>
          <div className="hidden sm:block overflow-x-auto overflow-y-visible">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FREQUENCY</th>
                  <th className="px-4 xs:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 xs:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                        <button className="text-sm text-blue-600 hover:underline">{item.name}</button>
                      </td>
                      <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                      <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.frequency || "-"}</td>
                      <td className="px-4 xs:px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${item.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 xs:px-6 py-4 whitespace-nowrap text-center">
                        <ActionMenu item={item} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 xs:px-6 py-12 text-center">
                      <p className="text-gray-500">No reimbursements added yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3 px-2 py-3">
            {data.length > 0 ? (
              data.map((item) => (
                <MobileCardView key={item.id} item={item} />
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-gray-500">No reimbursements added yet</p>
              </div>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4 xs:space-y-6 p-3 xs:p-4 sm:p-6 w-full bg-white rounded-lg border border-gray-200 mx-auto max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4">
        <h2 className="text-xl xs:text-2xl font-semibold text-gray-900">Salary Components</h2>
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="px-3 xs:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center gap-1 xs:gap-2 text-sm xs:text-base w-full xs:w-auto justify-center"
          >
            Add Component <ChevronDown size={18} className="hidden xs:inline" /> <ChevronDown size={16} className="inline xs:hidden" />
          </button>

          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-40 xs:w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <button
                onClick={() => handleAddComponent("earning")}
                className="w-full px-3 xs:px-4 py-2 text-left text-xs xs:text-sm hover:bg-blue-50 first:rounded-t-md"
              >
                Earning
              </button>
              <button
                onClick={() => handleAddComponent("correction")}
                className="w-full px-3 xs:px-4 py-2 text-left text-xs xs:text-sm hover:bg-blue-50"
              >
                Correction
              </button>
              <button
                onClick={() => handleAddComponent("benefit")}
                className="w-full px-3 xs:px-4 py-2 text-left text-xs xs:text-sm hover:bg-blue-50"
              >
                Benefit
              </button>
              <button
                onClick={() => handleAddComponent("deduction")}
                className="w-full px-3 xs:px-4 py-2 text-left text-xs xs:text-sm hover:bg-blue-50"
              >
                Deduction
              </button>
              <button
                onClick={() => handleAddComponent("reimbursement")}
                className="w-full px-3 xs:px-4 py-2 text-left text-xs xs:text-sm hover:bg-blue-50 last:rounded-b-md"
              >
                Reimbursement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs - Desktop */}
      <div className="hidden sm:block border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowActionMenu(null);
              }}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tabs - Mobile Dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white"
        >
          <span className="font-medium text-gray-900">
            {tabs.find(t => t.id === activeTab)?.label || "Select Tab"}
          </span>
          {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isMobileMenuOpen && (
          <div className="mt-2 border border-gray-200 rounded-md bg-white shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                  setShowActionMenu(null);
                }}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                  activeTab === tab.id 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {renderTable()}
      </div>

      {/* Footer */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4 pt-3 xs:pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Total Count: <button className="text-blue-600 hover:underline">{getCurrentData().length}</button>
        </div>
        <div className="flex items-center gap-3 xs:gap-4">
          <select className="px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 rounded text-xs xs:text-sm">
            <option>50 per page</option>
            <option>100 per page</option>
          </select>
          <span className="text-xs xs:text-sm text-gray-600 whitespace-nowrap">
            1 - {getCurrentData().length}
          </span>
        </div>
      </div>

      {/* Dialogs */}
      {showAddDialog && addDialogType === "earning" && (
        <AddEarningDialog 
          onClose={() => {
            setShowAddDialog(false);
            setEditingComponent(null);
          }} 
          onSave={handleSaveComponent}
          initialData={editingComponent}
        />
      )}
      {showAddDialog && addDialogType === "deduction" && (
        <AddDeductionDialog 
          onClose={() => {
            setShowAddDialog(false);
            setEditingComponent(null);
          }} 
          onSave={handleSaveComponent}
          initialData={editingComponent}
        />
      )}
      {showAddDialog && addDialogType === "benefit" && (
        <AddBenefitDialog 
          onClose={() => {
            setShowAddDialog(false);
            setEditingComponent(null);
          }} 
          onSave={handleSaveComponent}
          initialData={editingComponent}
        />
      )}
      {showAddDialog && addDialogType === "reimbursement" && (
        <AddReimbursementDialog 
          onClose={() => {
            setShowAddDialog(false);
            setEditingComponent(null);
          }} 
          onSave={handleSaveComponent}
          initialData={editingComponent}
        />
      )}
      {showAddDialog && addDialogType === "correction" && (
        <AddCorrectionDialog 
          onClose={() => {
            setShowAddDialog(false);
            setEditingComponent(null);
          }} 
          onSave={handleSaveComponent}
          initialData={editingComponent}
        />
      )}

      {/* Complete Button */}
      <div className="flex justify-end pt-4 xs:pt-6 border-t">
        <button
          onClick={handleComplete}
          className="px-4 xs:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm xs:text-base w-full xs:w-auto"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}