import Scaffold from "@/components/containers/scaffold.tsx";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import {Outlet} from "react-router-dom";

export default function DefaultLayout() {
    return (
        <Scaffold
            header={<Header />}
            footer={<Footer />}
            contentColor={""}
            containerColor={""}
        >
            <Outlet />
        </Scaffold>
    );
}