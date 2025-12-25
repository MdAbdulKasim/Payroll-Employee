import { Suspense } from "react";
import LoanViewPage from "@/components/Admin/Loans/Viewloan";
import Layout from "@/components/Rootlayout/Layout";

function LoanViewContent() {
  return (
    <Layout>
      <LoanViewPage />
    </Layout>
  );
}

export default function LoanView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoanViewContent />
    </Suspense>
  );
}