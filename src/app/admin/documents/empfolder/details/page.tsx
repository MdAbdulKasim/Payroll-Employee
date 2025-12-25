import { Suspense } from "react";
import EmployeeFolderDetailsPage from "@/components/Admin/Documents/EmpDetails";
import Layout from "@/components/Rootlayout/Layout";

function EmployeeFolderDetailsContent() {
  return (
    <Layout>
      <EmployeeFolderDetailsPage />
    </Layout>
  );
}

export default function EmployeeFolderDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeFolderDetailsContent />
    </Suspense>
  );
}