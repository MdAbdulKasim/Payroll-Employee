"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Upload, Download, ChevronDown, Menu } from "lucide-react";
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

interface LeaveRequest {
  id: string;
  name: string;
  email: string;
  department: string;
  organization: string;
  month: string;
  lossOfPay: number;
}

export default function LeaveTab() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultLeaveRequests: LeaveRequest[] = [
    {
      id: "leave-default-1",
      name: "ajees",
      email: "ajees@company.com",
      department: "Engineering",
      organization: "Tech Corp",
      month: "December 2025",
      lossOfPay: 2,
    },
    {
      id: "leave-default-2",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Marketing",
      organization: "Tech Corp",
      month: "December 2025",
      lossOfPay: 0,
    },
  ];

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(defaultLeaveRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  useEffect(() => {
    setMounted(true);
    
    const saved = localStorage.getItem("leaveRequests");
    if (saved) {
      try {
        const savedRequests = JSON.parse(saved);
        const merged = [...defaultLeaveRequests];
        
        savedRequests.forEach((savedReq: LeaveRequest) => {
          if (!merged.find(req => req.id === savedReq.id)) {
            merged.push(savedReq);
          }
        });
        
        setLeaveRequests(merged);
      } catch (error) {
        console.error("Error loading leave requests:", error);
        setLeaveRequests(defaultLeaveRequests);
      }
    }
  }, []);

  const filteredLeaveRequests = leaveRequests.filter((leave) => {
    const matchesSearch =
      (leave.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (leave.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (leave.department?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (leave.organization?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (leave.month?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesFilter = filterDepartment === "all" || leave.department === filterDepartment;

    return matchesSearch && matchesFilter;
  });

  const departments = Array.from(new Set(leaveRequests.map((l) => l.department))).filter(Boolean);

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Department", "Organization", "Month", "Loss of Pay"];
    const rows = filteredLeaveRequests.map((l) =>
      [l.name, l.email, l.department, l.organization, l.month, l.lossOfPay].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leave_requests.csv";
    a.click();
  };

  const exportToPDF = () => {
    const blob = new Blob(["Leave Requests Export"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leave_requests.pdf";
    a.click();
  };

  const handleBulkUploadClick = () => {
    window.location.href = "/admin/employee/importleave";
  };

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-sm text-gray-600">
          Total Leave Requests: {filteredLeaveRequests.length}
        </div>

        {/* Desktop Actions */}
        {mounted && (
          <div className="hidden lg:flex gap-2">
            <ButtonGroup>
              <Button 
                variant="outline" 
                className="rounded-r-none"
                onClick={handleBulkUploadClick}
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>

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
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Actions Menu */}
      {mounted && mobileMenuOpen && (
        <div className="lg:hidden bg-white border rounded-lg p-4 mb-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleBulkUploadClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>

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
          placeholder="Search leave requests..."
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
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Loss of Pay</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredLeaveRequests.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>
                  <div className="font-medium">{leave.name}</div>
                </TableCell>
                <TableCell>{leave.email}</TableCell>
                <TableCell>{leave.department}</TableCell>
                <TableCell>{leave.organization}</TableCell>
                <TableCell>{leave.month}</TableCell>
                <TableCell>
                  <span className={leave.lossOfPay > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                    {leave.lossOfPay} days
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}