import StatutoryComponentsProps from '@/components/Admin/settings/Statuary/Satuarycomponents';
import SettingsSidebar from '@/components/Admin/settings/SettingSidebar';
import Layout from '@/components/Rootlayout/Layout';    
export default function StatutoryComponentsPage() {
    return (
        <Layout>
            <div className="flex h-full">
                <SettingsSidebar />
                <StatutoryComponentsProps />
            </div>
        </Layout>
    );
}