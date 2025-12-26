import { Suspense } from "react";
import PayrunDetailsPage from "@/components/Admin/Payruns/Viewpage";
import Layout from "@/components/Rootlayout/Layout";

export default function PayrunDetailsPageWrapper() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <PayrunDetailsPage />
      </Suspense>
    </Layout>
  );
}