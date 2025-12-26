"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp, Employee, PayRun } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { InfoIcon, ArrowLeft } from "lucide-react"

interface WorkWeekConfig {
    workWeek: string[]
    salaryCalculation: "actual" | "working"
    organizationWorkingDays?: string
    payDay: string
    specificPayDay?: string
    firstPayrollMonth?: string
    firstPayrollYear?: string
}

export default function RegularPayrun() {
    const router = useRouter()
    const { employees, addPayRun } = useApp()
    const [config, setConfig] = useState<WorkWeekConfig | null>(null)
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
    const [isAutomated, setIsAutomated] = useState(false)
    const [automationDate, setAutomationDate] = useState("1")

    const now = new Date()
    const [selectedMonth, setSelectedMonth] = useState(now.toLocaleString('default', { month: 'long' }))
    const [selectedYear, setSelectedYear] = useState(now.getFullYear().toString())
    const [paymentDate, setPaymentDate] = useState(now.toISOString().split('T')[0])

    useEffect(() => {
        const saved = localStorage.getItem("workWeekConfig")
        if (saved) {
            try {
                setConfig(JSON.parse(saved))
            } catch (error) {
                console.error("Error loading work week configuration:", error)
            }
        }

        const savedAutomation = localStorage.getItem("automatedPayrunConfig")
        if (savedAutomation) {
            try {
                const { isAutomated, automationDate } = JSON.parse(savedAutomation)
                setIsAutomated(isAutomated)
                setAutomationDate(automationDate)
            } catch (error) {
                console.error("Error loading automation configuration:", error)
            }
        }
    }, [])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEmployees(employees.map(emp => emp.id))
        } else {
            setSelectedEmployees([])
        }
    }

    const handleSelectEmployee = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedEmployees(prev => [...prev, id])
        } else {
            setSelectedEmployees(prev => prev.filter(empId => empId !== id))
        }
    }

    const handleRunPayrun = () => {
        if (selectedEmployees.length === 0) {
            toast.error("Please select at least one employee")
            return
        }

        const newPayRun: PayRun = {
            id: Math.random().toString(36).substr(2, 9),
            month: selectedMonth,
            year: parseInt(selectedYear),
            status: 'draft',
            type: 'regular',
            totalAmount: selectedEmployees.length * 50000, // Mock amount
            employeeCount: selectedEmployees.length,
            employeeIds: selectedEmployees,
            createdAt: new Date().toISOString(),
            paymentDate: paymentDate,
            description: `Regular Payrun for ${selectedMonth} ${selectedYear}`
        };

        addPayRun(newPayRun);

        toast.success(`Regular payrun draft created for ${selectedMonth}`)
        router.push("/admin/payrun")
    }

    const handleSaveAutomation = () => {
        const config = { isAutomated, automationDate };
        localStorage.setItem("automatedPayrunConfig", JSON.stringify(config))
        console.log("Saved automation config:", config);
        toast.success("Automation settings saved successfully")
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="container mx-auto px-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Payruns
                </button>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Regular Pay Run</h1>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRunPayrun}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Create Draft
                        </Button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-5 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Month</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                            >
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Year</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                            >
                                {["2024", "2025", "2026"].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Payment Date</label>
                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Employee Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border rounded-lg overflow-hidden">
                            <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                                <h3 className="font-medium">Employees ({employees.length})</h3>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="select-all"
                                        checked={selectedEmployees.length === employees.length && employees.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                    <label htmlFor="select-all" className="text-sm cursor-pointer">Select All</label>
                                </div>
                            </div>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-10"></th>
                                        <th className="px-4 py-3 text-left">Employee Name</th>
                                        <th className="px-4 py-3 text-left">Department</th>
                                        <th className="px-4 py-3 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id} className="border-b last:border-0">
                                            <td className="px-4 py-4">
                                                <Checkbox
                                                    checked={selectedEmployees.includes(emp.id)}
                                                    onCheckedChange={(checked) => handleSelectEmployee(emp.id, !!checked)}
                                                />
                                            </td>
                                            <td className="px-4 py-4 font-medium">{emp.name}</td>
                                            <td className="px-4 py-4 text-gray-600">{emp.department || "N/A"}</td>
                                            <td className="px-4 py-4 text-gray-600">{emp.email || "N/A"}</td>
                                        </tr>
                                    ))}
                                    {employees.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                No employees found. Please add employees in the setup section.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar - Config & Automation */}
                    <div className="space-y-6">
                        {/* Pay Schedule Details */}
                        <div className="bg-white border rounded-lg p-5">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <InfoIcon className="h-4 w-4 text-blue-600" />
                                Pay Schedule Details
                            </h3>
                            {config ? (
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Pay Day:</span>
                                        <span className="font-medium">{config.payDay === 'specific-day' ? `Day ${config.specificPayDay}` : 'Last working day'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Calculation:</span>
                                        <span className="font-medium capitalize">{config.salaryCalculation === 'actual' ? 'Actual days' : `${config.organizationWorkingDays} working days`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">First Payroll:</span>
                                        <span className="font-medium">{config.firstPayrollMonth} {config.firstPayrollYear}</span>
                                    </div>
                                    <div className="pt-2 border-t mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Working Days:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {config.workWeek.map(day => (
                                                <Badge key={day} variant="outline" className="text-[10px] px-1.5 py-0">{day.slice(0, 3)}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No setup configuration found.</p>
                            )}
                        </div>

                        {/* Automated Payrun */}
                        <div className="bg-white border rounded-lg p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">Automated Payrun</h3>
                                <Checkbox
                                    checked={isAutomated}
                                    onCheckedChange={(checked) => setIsAutomated(!!checked)}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                                When enabled, the regular payrun will proceed automatically on the specified date of every month.
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-700">Run on day of month</label>
                                    <select
                                        value={automationDate}
                                        onChange={(e) => setAutomationDate(e.target.value)}
                                        disabled={!isAutomated}
                                        className="w-full px-3 py-2 border rounded-md text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400"
                                    >
                                        {Array.from({ length: 28 }, (_, i) => (i + 1).toString()).map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                        <option value="last">Last Day</option>
                                    </select>
                                </div>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={handleSaveAutomation}
                                >
                                    Save Automation Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
