import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
import DesignationsTable from "@/components/Admin/settings/Desginations/Desigination";

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <DesignationsTable />
            </div>
        </Layout>
    );
}