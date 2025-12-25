import { Suspense } from 'react';
import EditPersonalDetails from '@/components/Admin/Employee/EditPersonal';
import Layout from '@/components/Rootlayout/Layout';

function EditPersonalContent() {
  return (
    <Layout>
      <EditPersonalDetails />
    </Layout>
  );
}

export default function EditPersonalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPersonalContent />
    </Suspense>
  );
}