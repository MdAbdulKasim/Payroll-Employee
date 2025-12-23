import RolesPage from "@/components/Admin/settings/Roles/RolesPage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function RolesSettingsPage() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <RolesPage />
      </div>
    </Layout>
  );
}