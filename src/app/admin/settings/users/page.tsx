import UsersPage from "@/components/Admin/settings/Users/Userpage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function UsersSettingsPage() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <SettingsSidebar />
        <UsersPage />
      </div>
    </Layout>
  );
}