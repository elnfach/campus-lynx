import {CheckCircleIcon, ClockIcon, InboxIcon} from "@heroicons/react/16/solid";
import React from "react";

const StatsCard = ({ title, value, change, icon }: {
    title: string;
    value: number;
    change: string;
    icon: React.ReactNode
}) => (
    <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {icon}
        </div>
        <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{change}</p>
        </div>
    </div>
);


export const Dashboard = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
                title="Новых заявок сегодня"
                value={24}
                change="+5 с прошлой недели"
                icon={<InboxIcon className="h-6 w-6 text-blue-500" />}
            />
            <StatsCard
                title="Одобрено за месяц"
                value={156}
                change="+12% с прошлого месяца"
                icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
            />
            <StatsCard
                title="На рассмотрении"
                value={43}
                change="-3 с вчера"
                icon={<ClockIcon className="h-6 w-6 text-yellow-500" />}
            />
        </div>
    )
}