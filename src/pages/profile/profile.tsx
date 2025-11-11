import {NavPanel} from "@/components/navPanel.tsx";
import {Dashboard} from "@/components/dashboard.tsx";
import {useState} from "react";
import {navItemsRef} from "@/config/common.tsx";
import AdmissionCalender from "@/components/admission/admissionCalender.tsx";
import {TaskLayout} from "@/components/tasks/event/taskLayout.tsx";
import {RequestsLayout} from "@/components/requests/requestsLayout.tsx";
import {StaffingLayout} from "@/components/staffing/staffingLayout.tsx";
import {useTheme} from "@/hooks/useTheme.ts";

export const Profile = () => {
    const {theme} = useTheme();
    const [activeTab, setActiveTab] = useState(navItemsRef.dashboard);

    const background_style = `
        lg:grid lg:grid-cols-[256px_1fr] lg:h-screen
        ${theme.colors.background}
    `;

    return (

        <div className={background_style}>
            <NavPanel setActiveTab={setActiveTab}/>
            <div className="lg:overflow-y-auto p-8">
                {activeTab === navItemsRef.dashboard && (
                    <Dashboard />
                )}
                {activeTab === navItemsRef.tasks && (
                    <TaskLayout />
                )}
                {activeTab === navItemsRef.calendar && (
                    <AdmissionCalender />
                )}
                {activeTab === navItemsRef.requests && (
                    <RequestsLayout />
                )}
                {activeTab === navItemsRef.employee && (
                    <StaffingLayout />
                )}
            </div>
        </div>
    )
}