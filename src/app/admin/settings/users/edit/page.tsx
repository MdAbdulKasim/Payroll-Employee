import EditUserPage from "@/components/Admin/settings/Users/Edituser";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";  
import Layout from "@/components/Rootlayout/Layout";
export default function EditUser() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
        <EditUserPage />
        </div>
    </Layout>
  );
}