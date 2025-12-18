"use client";

import DocumentsLayout from "@/components/Employee/Documents/mainpage";
import PayslipsPage from "@/components/Employee/Documents/DocPayslip/payslips";
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