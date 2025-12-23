import DepartmentsManager from "@/components/Admin/settings/Departments/Departmentpage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function DepartmentsPage() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <DepartmentsManager />
      </div>
    </Layout>
  );
}