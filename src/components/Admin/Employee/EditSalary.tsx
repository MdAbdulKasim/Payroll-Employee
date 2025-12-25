"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Save as: src/components/Admin/Employee/EditSalary.tsx

export default function EditSalaryDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [formData, setFormData] = useState({
    annualCtc: 0,
    basicPercentage: 50,
    hraPercentage: 50,
    conveyanceAllowance: 0,
    fixedAllowance: 0,
  });

  useEffect(() => {
    if (employeeId) {
      const employees = localStorage.getItem("employees");
      if (employees) {
        const employeeList = JSON.parse(employees);
        const employee = employeeList.find((e: any) => e.id === employeeId);
        if (employee && employee.salaryDetails) {
          setFormData(employee.salaryDetails);
        }
      }
    }
  }, [employeeId]);

  const calculateMonthlyAmount = (percentage: number, type: "ctc" | "basic") => {
    if (type === "ctc") {
      return Math.round((formData.annualCtc * percentage) / 100 / 12);
    } else {
      const basicMonthly = Math.round(
        (formData.annualCtc * formData.basicPercentage) / 100 / 12
      );
      return Math.round((basicMonthly * percentage) / 100);
    }
  };

  const calculateAnnualAmount = (percentage: number, type: "ctc" | "basic") => {
    if (type === "ctc") {
      return Math.round((formData.annualCtc * percentage) / 100);
    } else {
      const basicAnnual = Math.round(
        (formData.annualCtc * formData.basicPercentage) / 100
      );
      return Math.round((basicAnnual * percentage) / 100);
    }
  };

  const monthlyCtc = Math.round(
    calculateMonthlyAmount(formData.basicPercentage, "ctc") +
      calculateMonthlyAmount(formData.hraPercentage, "basic") +
      formData.conveyanceAllowance +
      formData.fixedAllowance
  );

  const totalCostToCompany = Math.round(
    calculateAnnualAmount(formData.basicPercentage, "ctc") +
      calculateAnnualAmount(formData.hraPercentage, "basic") +
      formData.conveyanceAllowance * 12 +
      formData.fixedAllowance * 12
  );

  const handleSave = () => {
    if (!formData.annualCtc || formData.annualCtc <= 0) {
      alert("Please enter Annual CTC");
      return;
    }

    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);

      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          salaryDetails: formData,
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Back Button */}
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Employee Details</span>
          </button>

          <h2 className="text-2xl font-bold mb-6">Edit Salary Details</h2>

          <div className="space-y-6">
            {/* Annual CTC */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Annual CTC<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.annualCtc || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, annualCtc: Number(e.target.value) })
                  }
                />
                <span className="text-sm text-gray-600">per year</span>
              </div>
            </div>

            {/* Salary Components Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Salary Components
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Calculation Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Monthly Amount
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Annual Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-2 font-semibold text-sm">
                      Earnings
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border rounded text-sm"
                          value={formData.basicPercentage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              basicPercentage: Number(e.target.value),
                            })
                          }
                        />
                        <span className="text-sm text-gray-600">% of CTC</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{calculateMonthlyAmount(formData.basicPercentage, "ctc").toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{calculateAnnualAmount(formData.basicPercentage, "ctc").toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">House Rent Allowance</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border rounded text-sm"
                          value={formData.hraPercentage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hraPercentage: Number(e.target.value),
                            })
                          }
                        />
                        <span className="text-sm text-gray-600">% of Basic</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{calculateMonthlyAmount(formData.hraPercentage, "basic").toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{calculateAnnualAmount(formData.hraPercentage, "basic").toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">Conveyance Allowance</td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">Fixed amount</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-right"
                        value={formData.conveyanceAllowance || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conveyanceAllowance: Number(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{(formData.conveyanceAllowance * 12).toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        Fixed Allowance
                      </div>
                      <p className="text-xs text-gray-500">
                        Monthly CTC - Sum of all other components
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">Fixed amount</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-right"
                        value={formData.fixedAllowance || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fixedAllowance: Number(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{(formData.fixedAllowance * 12).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cost to Company Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Cost to Company</span>
                <div className="flex gap-8">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-normal">
                      Monthly
                    </div>
                    <div>₹{monthlyCtc.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-normal">Annual</div>
                    <div>₹{totalCostToCompany.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}