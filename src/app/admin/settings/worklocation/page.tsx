import WorkLocationsPage from '@/components/Admin/settings/worklocation/Worklocation';  
import Layout from '@/components/Rootlayout/Layout';
import SettingsSidebar from '@/components/Admin/settings/SettingSidebar';    

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <WorkLocationsPage />
            </div>
        </Layout>
    );
}