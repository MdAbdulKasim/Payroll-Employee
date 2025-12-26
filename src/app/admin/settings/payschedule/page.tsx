import Payschedule from "@/components/Admin/settings/Payschedule/payschedule";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";
export default function PayschedulePage() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <SettingsSidebar />
        <Payschedule />
      </div>
    </Layout>
  );
}