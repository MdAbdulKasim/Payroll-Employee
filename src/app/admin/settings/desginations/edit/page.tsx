import EditDesignationPage from "@/components/Admin/settings/Desginations/EditDesignation";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function EditDesignation() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <EditDesignationPage />
      </div>
    </Layout>
  );
}