import AddUserPage from "@/components/Admin/settings/Users/Adduser";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function AddUser() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <AddUserPage />
            </div>
        </Layout>
    );
}