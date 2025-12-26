import { Suspense } from "react";
import RecordPaymentPage from "@/components/Admin/Payruns/Recordpage";
import Layout from "@/components/Rootlayout/Layout";

export default function PayrunRecord() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <RecordPaymentPage />
      </Suspense>
    </Layout>
  );
}