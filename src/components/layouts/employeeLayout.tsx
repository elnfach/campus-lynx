import Scaffold from "@/components/ui/containers/scaffold.tsx";
import {Outlet} from "react-router-dom";

export default function EmployeeLayout() {
    return (
        <Scaffold
            header={null}
            footer={null}
            contentColor={""}
            containerColor={""}
        >
            <Outlet />
        </Scaffold>
    );
}