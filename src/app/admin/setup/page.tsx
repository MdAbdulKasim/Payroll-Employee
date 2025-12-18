"use client";

import { AppProvider } from "@/context/AppContext";
import SetupWizard from "@/components/Admin/setup/SetupWizard";
import Layout from "@/components/Rootlayout/Layout";

export default function Setup() {
  return (
    <AppProvider>
      <Layout>
        <SetupWizard />
      </Layout>
    </AppProvider>
  );
}
