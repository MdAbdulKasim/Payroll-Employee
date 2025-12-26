import { Suspense } from "react";
import PayrollHistoryPage from "@/components/Admin/Payruns/PayrollHistory";
import Layout from "@/components/Rootlayout/Layout";

export default function PayrollHistoryPageWrapper() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <PayrollHistoryPage />
      </Suspense>
    </Layout>
  );
}