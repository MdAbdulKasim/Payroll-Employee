import { Suspense } from 'react';
import EditSalaryDetails from '@/components/Admin/Employee/EditSalary';
import Layout from '@/components/Rootlayout/Layout';

function EditSalaryContent() {
  return (
    <Layout>
      <EditSalaryDetails />
    </Layout>
  );
}

export default function EditSalaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditSalaryContent />
    </Suspense>
  );
}