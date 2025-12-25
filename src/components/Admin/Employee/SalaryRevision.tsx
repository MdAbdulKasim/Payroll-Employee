"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Save as: src/components/Admin/Employee/SalaryRevision.tsx

export default function SalaryRevision() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [employeeName, setEmployeeName] = useState("");
  const [previousCtc, setPreviousCtc] = useState(0);
  const [previousMonthlySalary, setPreviousMonthlySalary] = useState(0);
  const [revisionType, setRevisionType] = useState("new-amount");
  const [revisionPercentage, setRevisionPercentage] = useState("");
  const [revisedAnnualCtc, setRevisedAnnualCtc] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [payoutMonth, setPayoutMonth] = useState("");

  const [formData, setFormData] = useState({
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
        if (employee) {
          const name = `${employee.basicDetails?.firstName || ""} ${
            employee.basicDetails?.lastName || ""
          }`.trim();
          setEmployeeName(name);

          if (employee.salaryDetails) {
            setPreviousCtc(employee.salaryDetails.annualCtc || 0);
            setPreviousMonthlySalary(
              Math.round((employee.salaryDetails.annualCtc || 0) / 12)
            );
            setFormData({
              basicPercentage: employee.salaryDetails.basicPercentage || 50,
              hraPercentage: employee.salaryDetails.hraPercentage || 50,
              conveyanceAllowance: employee.salaryDetails.conveyanceAllowance || 0,
              fixedAllowance: employee.salaryDetails.fixedAllowance || 0,
            });
          }
        }
      }
    }
  }, [employeeId]);

  const calculateMonthlyAmount = (
    annualCtc: number,
    percentage: number,
    type: "ctc" | "basic"
  ) => {
    if (type === "ctc") {
      return Math.round((annualCtc * percentage) / 100 / 12);
    } else {
      const basicMonthly = Math.round(
        (annualCtc * formData.basicPercentage) / 100 / 12
      );
      return Math.round((basicMonthly * percentage) / 100);
    }
  };

  const calculateAnnualAmount = (
    annualCtc: number,
    percentage: number,
    type: "ctc" | "basic"
  ) => {
    if (type === "ctc") {
      return Math.round((annualCtc * percentage) / 100);
    } else {
      const basicAnnual = Math.round((annualCtc * formData.basicPercentage) / 100);
      return Math.round((basicAnnual * percentage) / 100);
    }
  };

  const currentAnnualCtc = Number(revisedAnnualCtc) || 0;

  const basicMonthly = calculateMonthlyAmount(
    currentAnnualCtc,
    formData.basicPercentage,
    "ctc"
  );
  const hraMonthly = calculateMonthlyAmount(
    currentAnnualCtc,
    formData.hraPercentage,
    "basic"
  );

  const fixedAllowanceMonthly =
    Math.round(currentAnnualCtc / 12) -
    basicMonthly -
    hraMonthly -
    formData.conveyanceAllowance;

  const totalMonthlyCtc = Math.round(currentAnnualCtc / 12);

  const basicAnnual = calculateAnnualAmount(
    currentAnnualCtc,
    formData.basicPercentage,
    "ctc"
  );
  const hraAnnual = calculateAnnualAmount(
    currentAnnualCtc,
    formData.hraPercentage,
    "basic"
  );

  const handleRevisionTypeChange = (type: string) => {
    setRevisionType(type);
    setRevisedAnnualCtc("");
    setRevisionPercentage("");
  };

  const handlePercentageChange = (value: string) => {
    setRevisionPercentage(value);
    if (value && previousCtc) {
      const percentage = Number(value);
      const newCtc = previousCtc + (previousCtc * percentage) / 100;
      setRevisedAnnualCtc(Math.round(newCtc).toString());
    } else {
      setRevisedAnnualCtc("");
    }
  };

  const handleSubmit = () => {
    if (!revisedAnnualCtc || !effectiveFrom || !payoutMonth) {
      alert("Please fill all required fields");
      return;
    }

    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);

      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          salaryDetails: {
            annualCtc: Number(revisedAnnualCtc),
            basicPercentage: formData.basicPercentage,
            hraPercentage: formData.hraPercentage,
            conveyanceAllowance: formData.conveyanceAllowance,
            fixedAllowance: fixedAllowanceMonthly,
          },
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Salary Revision for {employeeName}
              </h2>
              <div className="flex gap-8 mt-2 text-sm">
                <div>
                  <span className="text-gray-600">Previous CTC</span>
                  <p className="font-semibold">₹{previousCtc.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Previous Monthly Salary</span>
                  <p className="font-semibold">
                    ₹{previousMonthlySalary.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Revision Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Select the Salary Revision type<span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="revisionType"
                  checked={revisionType === "percentage"}
                  onChange={() => handleRevisionTypeChange("percentage")}
                  className="w-4 h-4"
                />
                <span className="text-sm">Revise CTC by percentage</span>
                {revisionType === "percentage" && (
                  <div className="flex items-center gap-2 ml-4">
                    <input
                      type="number"
                      value={revisionPercentage}
                      onChange={(e) => handlePercentageChange(e.target.value)}
                      className="w-20 px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <span className="text-sm">%</span>
                  </div>
                )}
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="revisionType"
                  checked={revisionType === "new-amount"}
                  onChange={() => handleRevisionTypeChange("new-amount")}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enter the new CTC amount below</span>
              </label>
            </div>
          </div>

          {/* Revised Annual CTC */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Revised Annual CTC<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">₹</span>
              <input
                type="number"
                value={revisedAnnualCtc}
                onChange={(e) => setRevisedAnnualCtc(e.target.value)}
                disabled={revisionType === "percentage" && !!revisionPercentage}
                className="w-40 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="100000"
              />
              <span className="text-sm text-gray-600">per year</span>
            </div>
          </div>

          {/* Salary Components Table */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
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
                  <td className="px-4 py-3 text-sm">Basic</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.basicPercentage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basicPercentage: Number(e.target.value),
                          })
                        }
                        className="w-16 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-sm text-gray-600">% of CTC</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {basicMonthly.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {basicAnnual.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-sm">House Rent Allowance</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.hraPercentage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hraPercentage: Number(e.target.value),
                          })
                        }
                        className="w-16 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-sm text-gray-600">% of Basic</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {hraMonthly.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {hraAnnual.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-sm">Conveyance Allowance</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">Fixed amount</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <input
                      type="number"
                      value={formData.conveyanceAllowance || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          conveyanceAllowance: Number(e.target.value),
                        })
                      }
                      className="w-24 px-2 py-1 border rounded text-sm text-right"
                    />
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {(formData.conveyanceAllowance * 12).toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3">
                    <div className="text-sm">Fixed Allowance</div>
                    <p className="text-xs text-gray-500">
                      Monthly CTC - Sum of all other components
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">Fixed amount</span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {fixedAllowanceMonthly.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {(fixedAllowanceMonthly * 12).toLocaleString()}
                  </td>
                </tr>

                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-3 text-sm">Cost to Company</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right text-sm">
                    ₹{totalMonthlyCtc.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    ₹{currentAnnualCtc.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payout Preferences */}
          <div className="border-t pt-6 mb-6">
            <h3 className="font-semibold mb-4">
              Payout Preferences<span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Revised Salary effective from
                </label>
                <input
                  type="month"
                  value={effectiveFrom}
                  onChange={(e) => setEffectiveFrom(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="M yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payout Month
                </label>
                <input
                  type="month"
                  value={payoutMonth}
                  onChange={(e) => setPayoutMonth(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="M yyyy"
                />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Note: Payroll will automatically calculate any arrears in the
              salary and process them in the payout month, eliminating the need for
              manually adding arrear components.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-start gap-2 pt-6 border-t">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}