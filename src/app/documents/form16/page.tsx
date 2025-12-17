"use client";

import Layout from "@/components/Rootlayout/Layout";
import DocumentsLayout from "@/components/Documents/mainpage";
import Form16Page from "@/components/Documents/form16";

export default function DocumentPage() {
    return (
        <Layout>
            <DocumentsLayout>
                <Form16Page />
            </DocumentsLayout>
        </Layout>
    );
}