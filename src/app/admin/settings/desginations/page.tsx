import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
import DesignationsTable from "@/components/Admin/settings/Desginations/Desigination";

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row h-full min-h-0">
                <SettingsSidebar />
                <DesignationsTable />
            </div>
        </Layout>
    );
}