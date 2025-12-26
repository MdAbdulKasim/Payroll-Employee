import { Suspense } from "react";
import OneTimePayoutPage from "@/components/Admin/Payruns/Onetimepayout";
import Layout from "@/components/Rootlayout/Layout";

export default function OneTimePayoutPageWrapper() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <OneTimePayoutPage />
      </Suspense>
    </Layout>
  );
}