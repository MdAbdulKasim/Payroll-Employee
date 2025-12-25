'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EmployeeView from '@/components/Admin/Employee/EmployeeView';
import Layout from '@/components/Rootlayout/Layout';

function ViewEmployeeContent() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('id') || '';

  return (
    <Layout>
      <EmployeeView employeeId={employeeId} />
    </Layout>
  );
}

export default function ViewEmployeePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewEmployeeContent />
    </Suspense>
  );
}