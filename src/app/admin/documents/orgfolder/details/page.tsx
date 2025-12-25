import { Suspense } from "react";
import OrgFolderDetailsPage from "@/components/Admin/Documents/OrgDetails";
import Layout from "@/components/Rootlayout/Layout";

function OrgFolderDetailsContent() {
  return (
    <Layout>
      <OrgFolderDetailsPage />
    </Layout>
  );
}

export default function OrgFolderDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrgFolderDetailsContent />
    </Suspense>
  );
}