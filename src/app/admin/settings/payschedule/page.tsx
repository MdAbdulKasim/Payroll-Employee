import Payschedule from "@/components/Admin/settings/Payschedule/payschedule";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function PayschedulePage() {
  return (
    <Layout>
         <div className="flex h-full">
        <SettingsSidebar />
      <Payschedule />
      </div>
    </Layout>
  );
}