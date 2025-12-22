import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import SettingsProfile from "@/components/Admin/settings/Profile";
import Layout from "@/components/Rootlayout/Layout";

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <SettingsProfile />
            </div>
        </Layout>
    );
}