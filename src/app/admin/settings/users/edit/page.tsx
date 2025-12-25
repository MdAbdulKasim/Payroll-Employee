import { Suspense } from "react";
import EditUserPage from "@/components/Admin/settings/Users/Edituser";
import SettingsSidebar from "@/components/Admin/settings/SettingSidebar";
import Layout from "@/components/Rootlayout/Layout";

function EditUserContent() {
  return (
    <Layout>
      <div className="flex h-full">
        <SettingsSidebar />
        <EditUserPage />
      </div>
    </Layout>
  );
}

export default function EditUser() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditUserContent />
    </Suspense>
  );
}