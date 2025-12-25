'use client';
import { Suspense } from 'react';
import SalaryRevision from '@/components/Admin/Employee/SalaryRevision';
import Layout from '@/components/Rootlayout/Layout';

function SalaryRevisionContent() {
  return (
    <Layout>
      <SalaryRevision />
    </Layout>
  );
}

export default function SalaryRevisionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalaryRevisionContent />
    </Suspense>
  );
}