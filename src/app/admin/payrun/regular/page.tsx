import { Suspense } from "react";
import RegularPayrun from "@/components/Admin/Payruns/RegularPayrun";
import Layout from "@/components/Rootlayout/Layout";

export default function RegularPayrunPage() {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <RegularPayrun />
            </Suspense>
        </Layout>
    );
}
