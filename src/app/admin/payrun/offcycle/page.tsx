import { Suspense } from "react";
import OffCyclePayrunPage from "@/components/Admin/Payruns/OffCyclePayrun";
import Layout from "@/components/Rootlayout/Layout";

export default function OffCyclePayrunPageWrapper() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <OffCyclePayrunPage />
      </Suspense>
    </Layout>
  );
}