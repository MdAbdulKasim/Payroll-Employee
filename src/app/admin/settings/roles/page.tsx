import RolesPage from "@/components/Admin/settings/Roles/RolesPage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function RolesSettingsPage() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <SettingsSidebar />
        <RolesPage />
      </div>
    </Layout>
  );
}