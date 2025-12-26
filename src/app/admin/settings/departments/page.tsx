import DepartmentsManager from "@/components/Admin/settings/Departments/Departmentpage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function DepartmentsPage() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <SettingsSidebar />
        <DepartmentsManager />
      </div>
    </Layout>
  );
}