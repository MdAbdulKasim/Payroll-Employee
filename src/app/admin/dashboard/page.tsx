import { Metadata } from 'next';
import DashboardContent from '@/components/Admin/Dashboard';
import Layout from '@/components/Rootlayout/Layout';
export const metadata: Metadata = {
  title: 'Dashboard | Payroll System',
  description: 'Payroll dashboard with employee, payroll, and task management',
  keywords: ['dashboard', 'payroll', 'employees', 'analytics'],
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
     <Layout>
      <DashboardContent />
      </Layout>
      
    </div>
  );
}