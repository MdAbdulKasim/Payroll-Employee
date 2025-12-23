import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
import AddDesignationModal from "@/components/Admin/settings/Desginations/AddDesigination";

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <AddDesignationModal />
            </div>
        </Layout>
    );
}