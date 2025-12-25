import { Suspense } from 'react';
import EditPaymentInformation from '@/components/Admin/Employee/EditPayment';
import Layout from '@/components/Rootlayout/Layout';

function EditPaymentContent() {
  return (
    <Layout>
      <EditPaymentInformation />
    </Layout>
  );
}

export default function EditPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPaymentContent />
    </Suspense>
  );
}