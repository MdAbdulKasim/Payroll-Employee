import WorkLocationsPage from '@/components/Admin/settings/worklocation/Worklocation';
import Layout from '@/components/Rootlayout/Layout';
import SettingsSidebar from '@/components/Admin/settings/SettingSidebar';

export default function SettingsPage() {
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row h-full min-h-0">
                <SettingsSidebar />
                <WorkLocationsPage />
            </div>
        </Layout>
    );
}