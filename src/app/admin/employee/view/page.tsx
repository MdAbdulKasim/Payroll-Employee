'use client';
import { useSearchParams } from 'next/navigation';
import EmployeeView from '@/components/Admin/Employee/EmployeeView';
import Layout from '@/components/Rootlayout/Layout';

export default function ViewEmployeePage() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('id') || '';
  
  return(
    <Layout>
   <EmployeeView employeeId={employeeId} />;
   </Layout>
);
}