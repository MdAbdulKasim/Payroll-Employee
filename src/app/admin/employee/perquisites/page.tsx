'use client';
import { Suspense } from 'react';
import Perquisites from '@/components/Admin/Employee/Perquisites';
import Layout from '@/components/Rootlayout/Layout';

function PerquisitesContent() {
  return (
    <Layout>
      <Perquisites />
    </Layout>
  );
}

export default function PerquisitesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PerquisitesContent />
    </Suspense>
  );
}