import { Suspense } from 'react';
import EditBasicDetails from '@/components/Admin/Employee/EditBasic';
import Layout from '@/components/Rootlayout/Layout';

function EditBasicContent() {
  return (
    <Layout>
      <EditBasicDetails />
    </Layout>
  );
}

export default function EditBasicPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBasicContent />
    </Suspense>
  );
}