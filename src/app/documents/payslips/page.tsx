"use client";

import DocumentsLayout from "@/components/Documents/mainpage";
import PayslipsPage from "@/components/Documents/DocPayslip/payslips";
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