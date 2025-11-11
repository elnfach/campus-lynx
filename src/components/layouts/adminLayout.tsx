import Scaffold from "@/components/ui/containers/scaffold.tsx";
import Footer from "@/components/footer.tsx";
import {Outlet} from "react-router-dom";

export default function AdminLayout() {
    return (
        <Scaffold
            header={null}
            footer={<Footer />}
            contentColor={""}
            containerColor={""}
        >
            <Outlet />
        </Scaffold>
    );
}