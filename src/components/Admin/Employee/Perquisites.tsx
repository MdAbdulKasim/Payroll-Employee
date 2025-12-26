"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Save as: src/components/Admin/Employee/Perquisites.tsx

interface PerquisiteItem {
  name: string;
  valueAsPerRules: number;
  amountRecovered: number;
  chargeableToTax: number;
}

const defaultPerquisites: PerquisiteItem[] = [
  { name: "Accommodation", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Vehicle expenses", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Driver expenses", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Sweeper, gardener, watchman or personal attendant", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Gas, electricity, water", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Interest free or concessional loans", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Holiday expenses", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Free or concessional travel", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Free meals", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Free education", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Gifts, vouchers, etc.", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Credit card expenses", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Club expenses", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Use of movable assets by employees", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Transfer of assets to employees", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Value of any other benefit/amenity/service/privilege", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Stock options allotted or transferred by employer being an eligible start-up referred to in section 80-IAC", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Stock options (non-qualified options)", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Contribution by employer to fund and scheme taxable under section 17(2)(vii).", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Annual accretion by way of interest, dividend etc. to the balance at the credit of fund and scheme referred to in section 17(2)(vii) and taxable under section 17(2)(viia).", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
  { name: "Other benefits or amenities", valueAsPerRules: 0, amountRecovered: 0, chargeableToTax: 0 },
];

export default function Perquisites() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [perquisites, setPerquisites] = useState<PerquisiteItem[]>(defaultPerquisites);

  useEffect(() => {
    if (employeeId) {
      const employees = localStorage.getItem("employees");
      if (employees) {
        const employeeList = JSON.parse(employees);
        const employee = employeeList.find((e: any) => e.id === employeeId);
        if (employee && employee.perquisites) {
          setPerquisites(employee.perquisites);
        }
      }
    }
  }, [employeeId]);

  const handleValueChange = (index: number, field: keyof PerquisiteItem, value: number) => {
    const updated = [...perquisites];
    updated[index] = { ...updated[index], [field]: value };
    setPerquisites(updated);
  };

  const calculateTotal = (field: keyof PerquisiteItem) => {
    return perquisites.reduce((sum, item) => sum + (item[field] as number), 0);
  };

  const handleSave = () => {
    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);

      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          perquisites: perquisites,
        };

        localStorage.setItem("employees", JSON.stringify(employeeList));
        router.push(`/admin/employee/view?id=${employeeId}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/admin/employee/view?id=${employeeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          {/* Header with Back Button */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3 sm:mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Employee Details</span>
            </button>
            <h2 className="text-xl sm:text-2xl font-bold">Perquisites</h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Benefits received by this employee in addition to salary
            </p>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {perquisites.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 bg-white hover:bg-gray-50">
                <div className="font-medium text-sm mb-3 break-words">{item.name}</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Value as per Rules
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.valueAsPerRules || ""}
                      onChange={(e) =>
                        handleValueChange(index, "valueAsPerRules", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Amount Recovered
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.amountRecovered || ""}
                      onChange={(e) =>
                        handleValueChange(index, "amountRecovered", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Chargeable to Tax
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.chargeableToTax || ""}
                      onChange={(e) =>
                        handleValueChange(index, "chargeableToTax", Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Total Card */}
            <div className="border rounded-lg p-3 bg-gray-50 font-semibold">
              <div className="text-sm mb-3">Total Amount</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Value as per Rules:</span>
                  <span>{calculateTotal("valueAsPerRules")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Recovered:</span>
                  <span>{calculateTotal("amountRecovered")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chargeable to Tax:</span>
                  <span>{calculateTotal("chargeableToTax")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Particulars
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Value of Perquisite as per Rules
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount Recovered from the Employee, if any
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount of Perquisite Chargeable to Tax
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {perquisites.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.valueAsPerRules || ""}
                        onChange={(e) =>
                          handleValueChange(index, "valueAsPerRules", Number(e.target.value))
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.amountRecovered || ""}
                        onChange={(e) =>
                          handleValueChange(index, "amountRecovered", Number(e.target.value))
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.chargeableToTax || ""}
                        onChange={(e) =>
                          handleValueChange(index, "chargeableToTax", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-3 text-sm">Total Amount</td>
                  <td className="px-4 py-3 text-center text-sm">
                    {calculateTotal("valueAsPerRules")}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    {calculateTotal("amountRecovered")}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    {calculateTotal("chargeableToTax")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}