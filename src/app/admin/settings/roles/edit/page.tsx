import EditRolePage from "@/components/Admin/settings/Roles/EditRoles";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function EditRole() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <EditRolePage />
      </div>
    </Layout>
  );
}