"use client";

import { useState } from "react";
import EPFComponent from "@/components/Admin/setup/statuarycomponents/Epfcomponent";
import ESIComponent from "@/components/Admin/setup/statuarycomponents/Esicomponent";
import ProfessionalTaxComponent from "@/components/Admin/setup/statuarycomponents/Professionaltaxcomponent";
import LabourWelfareFundComponent from "@/components/Admin/setup/statuarycomponents/labourcomponent";
import StatutoryBonusComponent from "@/components/Admin/setup/statuarycomponents/staturaybonuscomponent";

interface StatutoryComponentsProps {
  onComplete?: () => void;
}

type TabId = "epf" | "esi" | "professional-tax" | "labour-welfare" | "statutory-bonus";

const tabs = [
  { id: "epf" as TabId, label: "EPF" },
  { id: "esi" as TabId, label: "ESI" },
  { id: "professional-tax" as TabId, label: "Professional Tax" },
  { id: "labour-welfare" as TabId, label: "Labour Welfare Fund" },
  { id: "statutory-bonus" as TabId, label: "Statutory Bonus" },
];

export default function StatutoryComponents({ onComplete }: StatutoryComponentsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("epf");

  const renderTabContent = () => {
    switch (activeTab) {
      case "epf":
        return <EPFComponent onComplete={onComplete} />;
      case "esi":
        return <ESIComponent onComplete={onComplete} />;
      case "professional-tax":
        return <ProfessionalTaxComponent onComplete={onComplete} />;
      case "labour-welfare":
        return <LabourWelfareFundComponent onComplete={onComplete} />;
      case "statutory-bonus":
        return <StatutoryBonusComponent onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Statutory Components</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
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

      {/* Tab Content */}
      <div className="py-6">{renderTabContent()}</div>
    </div>
  );
}