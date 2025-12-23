import AddDepartmentPage from "@/components/Admin/settings/Departments/AddDepartment";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function AddDepartment() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <AddDepartmentPage />
      </div>
    </Layout>
  );
}