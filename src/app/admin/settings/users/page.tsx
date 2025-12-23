import UsersPage from "@/components/Admin/settings/Users/Userpage";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function UsersSettingsPage() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <UsersPage />
      </div>
    </Layout>
  );
}