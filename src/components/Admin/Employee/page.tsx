"use client";
import React, { useState } from "react";
import EmployeePage from "./Employeepage";
import LeaveTab from "./LeaveTab";

export default function Page() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
      Employee Management
      </h1>
      
      {/* TABS */}
      <div style={{ marginBottom: "20px", backgroundColor: "#f3f4f6", padding: "4px", display: "inline-flex", borderRadius: "8px" }}>
        <button
          onClick={() => setActiveTab("employees")}
          style={{
            padding: "8px 24px",
            backgroundColor: activeTab === "employees" ? "white" : "transparent",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: activeTab === "employees" ? "600" : "400"
          }}
        >
          Employees
        </button>
        <button
          onClick={() => setActiveTab("leave")}
          style={{
            padding: "8px 24px",
            backgroundColor: activeTab === "leave" ? "white" : "transparent",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: activeTab === "leave" ? "600" : "400"
          }}
        >
          Leave 
        </button>
      </div>

      {/* TAB CONTENT */}
      <div>
        {activeTab === "employees" && <EmployeePage />}
        {activeTab === "leave" && <LeaveTab />}
      </div>
    </div>
  );
}