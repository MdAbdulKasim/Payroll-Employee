import SalaryComponentsPage from '@/components/Admin/settings/Salary/Salarycomponents';
import SettingsSidebar from '@/components/Admin/settings/SettingSidebar';
import Layout from '@/components/Rootlayout/Layout';
export default function SalarySettingsPage() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <SettingsSidebar />
        <SalaryComponentsPage />
      </div>
    </Layout>
  );
}