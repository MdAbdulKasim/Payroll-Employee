import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import SettingsProfile from "@/components/Admin/settings/Profile";
import Layout from "@/components/Rootlayout/Layout";

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row h-full min-h-0">
                <SettingsSidebar />
                <SettingsProfile />
            </div>
        </Layout>
    );
}