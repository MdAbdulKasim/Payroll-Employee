"use client";

import DocumentsLayout from "@/components/Employee/Documents/Tabpage";
import PayslipsPage from "@/components/Employee/Documents/DocPayslip/mainpage";
import Layout from "@/components/Rootlayout/Layout";

export default function DocumentPage() {
    return (
        <Layout>
            <DocumentsLayout>
                <PayslipsPage />
            </DocumentsLayout>
        </Layout>
    );
}