import StatutoryComponentsProps from '@/components/Admin/settings/Statuary/Satuarycomponents';
import SettingsSidebar from '@/components/Admin/settings/SettingSidebar';
import Layout from '@/components/Rootlayout/Layout';
export default function StatutoryComponentsPage() {
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row h-full min-h-0">
                <SettingsSidebar />
                <StatutoryComponentsProps />
            </div>
        </Layout>
    );
}