import { Suspense } from "react";
import PayrunSubmitPage from '@/components/Admin/Payruns/Submit';
import Layout from '@/components/Rootlayout/Layout';

export default function PayrunSubmit() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <PayrunSubmitPage />
      </Suspense>
    </Layout>
  );
}