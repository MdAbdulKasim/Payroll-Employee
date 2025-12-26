"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Download,
  Upload,
  Filter,
  Trash2,
  Plus,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- TABLE COMPONENTS ---------------- */

const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="[&_tr]:border-b bg-gray-50" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b hover:bg-gray-50 transition-colors" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className="h-12 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-4 text-sm text-gray-700" {...props}>
    {children}
  </td>
);

/* ---------------- TYPES ---------------- */

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "active" | "inactive";
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function EmployeesPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Default employee (kept as-is)
  const defaultEmployees: Employee[] = [
    {
      id: "1",
      name: "ajees",
      email: "nan@gmail.com",
      department: "Human Resources",
      designation: "HR Manager",
      joiningDate: "2025-12-25",
      status: "active",
    },
  ];

  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  /* ---------------- LOAD FROM LOCALSTORAGE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) {
      setEmployees([...defaultEmployees, ...JSON.parse(saved)]);
    }
  }, []);

  /* ---------------- FILTER ---------------- */

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterDepartment === "all" || emp.department === filterDepartment;

    return matchesSearch && matchesFilter;
  });

  const departments = Array.from(new Set(employees.map((e) => e.department)));

  /* ---------------- EXPORT ---------------- */

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Department", "Designation", "Joining Date", "Status"];
    const rows = filteredEmployees.map((e) =>
      [e.name, e.email, e.department, e.designation, e.joiningDate, e.status].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
  };

  const exportToPDF = () => {
    const blob = new Blob(["Employee Export"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.pdf";
    a.click();
  };

  /* ---------------- BULK UPLOAD ---------------- */

  const handleBulkImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = text.split("\n").slice(1);

      const newEmployees: Employee[] = rows
        .filter(Boolean)
        .map((row, i) => {
          const [name, email, department, designation, joiningDate, status] = row.split(",");
          return {
            id: `${Date.now()}-${i}`,
            name,
            email,
            department,
            designation,
            joiningDate,
            status: (status as "active" | "inactive") || "active",
          };
        });

      const updated = [...employees, ...newEmployees];
      setEmployees(updated);
      localStorage.setItem("employees", JSON.stringify(updated.filter(e => e.id !== "1")));
    };

    reader.readAsText(file);
  };

  /* ---------------- ACTIONS (UPDATED WITH NAVIGATION) ---------------- */

  // 🔹 Click on row to view employee details
  const handleRowClick = (emp: Employee) => {
    router.push(`/admin/employee/view?id=${emp.id}`);
  };

  // 🔹 Delete button action
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent row click
    if (!confirm("Delete employee?")) return;

    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    localStorage.setItem(
      "employees",
      JSON.stringify(updated.filter((e) => e.id !== "1"))
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Employees</h1>
            <p className="text-xs sm:text-sm text-gray-600">Manage your organization's employees</p>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-2">
            <ButtonGroup>
              <label className="cursor-pointer">
                <Button variant="outline" className="rounded-r-none">
                  <Upload className="w-4 h-4 mr-2" />
                  <a href="/admin/employee/importemployee">Bulk Upload</a>
                </Button>
                <input type="file" accept=".csv" className="hidden" onChange={handleBulkImport} />
              </label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-none">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportToCSV}>Export CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToPDF}>Export PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-l-none">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterDepartment("all")}>
                    All Departments
                  </DropdownMenuItem>
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onClick={() => setFilterDepartment(dept)}>
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/admin/employee/basic")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Employee
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 flex-1"
              onClick={() => router.push("/admin/employee/basic")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Employee
            </Button>
            <Button
              variant="outline"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Actions Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border rounded-lg p-4 mb-4 space-y-2">
            <label className="cursor-pointer block">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
              <input type="file" accept=".csv" className="hidden" onChange={handleBulkImport} />
            </label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuItem onClick={exportToCSV}>Export CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>Export PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuItem onClick={() => setFilterDepartment("all")}>
                  All Departments
                </DropdownMenuItem>
                {departments.map((dept) => (
                  <DropdownMenuItem key={dept} onClick={() => setFilterDepartment(dept)}>
                    {dept}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* SEARCH */}
        <div className="relative w-full md:max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2 border rounded-lg"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Designation</TableHead>
                <TableHead className="hidden xl:table-cell">Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow 
                  key={emp.id}
                  onClick={() => handleRowClick(emp)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{emp.name}</div>
                      <div className="sm:hidden text-xs text-gray-500">{emp.email}</div>
                      <div className="md:hidden text-xs text-gray-500">{emp.department}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{emp.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{emp.department}</TableCell>
                  <TableCell className="hidden lg:table-cell">{emp.designation}</TableCell>
                  <TableCell className="hidden xl:table-cell">{emp.joiningDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={(e) => handleDelete(e, emp.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}