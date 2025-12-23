import CreateRolePage from "@/components/Admin/settings/Roles/AddRoles";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function AddRolePage() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <CreateRolePage />
      </div>
    </Layout>
  );
}