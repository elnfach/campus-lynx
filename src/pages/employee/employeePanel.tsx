/*
import AdmissionCalender from "@/components/admissionCalender.tsx";
import React, { useEffect, useState } from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {database} from "@/config/firebase.ts";
import { Timestamp } from 'firebase/firestore';
import {ModernLoader} from "@/components/loading/modernLoader.tsx";
import {CheckCircleIcon, ClockIcon, InboxIcon} from "@heroicons/react/16/solid";
import { ArrowRightIcon, PauseIcon, ArchiveBoxIcon, XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth.ts";





interface DocumentCardProps {
    document: {
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        tasks: Task[];
        status: Status;
    };
    onClick: () => void;
}

interface StatusBadgeProps {
    status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    console.log("task:", status)
    const { label, color } = STATUS_CONFIG[status];

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
            {label}
        </span>
    );
};

const DocumentCard = ({ document, onClick }: DocumentCardProps) => {
    const statusIcon = {
        'in-progress': <ArrowRightIcon className="h-5 w-5 text-yellow-500" />,
        'completed': <CheckCircleIcon className="h-5 w-5 text-green-500" />,
        'paused': <PauseIcon className="h-5 w-5 text-red-500" />,
        'archived': <ArchiveBoxIcon className="h-5 w-5 text-gray-500" />
    }[document.status];

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{document.title}</h3>
                    <div className="flex items-center space-x-2">
                        {statusIcon}
                    </div>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">{document.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                        <p className="font-medium">Изменено: {document.createdAt.toLocaleDateString()}</p>

                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                        {document.tasks?.length || 0} задач
                    </div>
                </div>
            </div>
        </div>
    );
};

interface TaskPanelProps {
    document: {
        id: string;
        title: string;
        tasks: Array<{
            id: string;
            title: string;
            status: Status;
        }>;
    };
    onClose: () => void;
}

const TaskPanel = ({ document, onClose }: TaskPanelProps) => {
    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl border-l border-gray-200 transition-transform duration-300 transform translate-x-0">
            <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{document.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Задачи ({document.tasks.length})
                    </h3>

                    <ul className="space-y-3">
                        {document.tasks.map(task => (
                            <li key={task.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-800">{task.title}</span>
                                    <StatusBadge status={task.status} />
                                </div>
                                {/!* Дополнительные детали задачи можно добавить здесь *!/}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        Добавить задачу
                    </button>
                </div>
            </div>
        </div>
    );
};

export const DocumentListPage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'events'));
                const docsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id, // Добавляем id из документа
                        author: data.author,
                        createdAt: data.createdAt?.toDate(), // Конвертируем Timestamp в Date
                        description: data.description,
                        grade: data.grade,
                        status: data.status,
                        tasks: data.tasks?.map((task: Task) => ({
                            ...task,
                            createdAt: task.createdAt?.toDate(),
                            lastModifiedAt: task.lastModifiedAt?.toDate()
                        })) || [],
                        title: data.title
                    } as Document;
                });
                setDocuments(docsData);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onSnapshot(collection(database, 'events'), (snapshot) => {
            const updatedDocs = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    author: data.author,
                    createdAt: data.createdAt?.toDate(),
                    description: data.description,
                    grade: data.grade,
                    status: data.status,
                    tasks: data.tasks?.map((task: Task) => ({
                        ...task,
                        createdAt: task.createdAt?.toDate(),
                        lastModifiedAt: task.lastModifiedAt?.toDate()
                    })) || [],
                    title: data.title
                } as Document;
            });
            setDocuments(updatedDocs);
        });

        fetchDocuments();
        return () => unsubscribe();
    }, []);

    if (loading) return <div className="flex justify-center mt-8"><ModernLoader /></div>;

    return (
        <div className="flex h-screen bg-gray-50">
            {/!* Основной контент *!/}
            <div className={`flex-1 p-6 transition-all duration-300 ${selectedDoc ? 'mr-80' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map(document => (
                        <DocumentCard
                            key={document.id}
                            document={document}
                            onClick={() => setSelectedDoc(document)}
                        />
                    ))}
                </div>
            </div>

            {/!* Боковая панель задач *!/}
            {selectedDoc && (
                <TaskPanel
                    document={selectedDoc}
                    onClose={() => setSelectedDoc(null)}
                />
            )}
        </div>
    );
};

export const EmployeePanel = () => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'events'));
                const docsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        author: data.author,
                        createdAt: data.createdAt?.toDate(),
                        description: data.description,
                        grade: data.grade,
                        status: data.status,
                        tasks: data.tasks?.map((task: Task) => ({
                            ...task,
                            createdAt: task.createdAt?.toDate(),
                            lastModifiedAt: task.lastModifiedAt?.toDate()
                        })) || [],
                        title: data.title
                    } as Document;
                });
                setDocuments(docsData);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onSnapshot(collection(database, 'events'), (snapshot) => {
            const updatedDocs = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    author: data.author,
                    createdAt: data.createdAt?.toDate(),
                    description: data.description,
                    grade: data.grade,
                    status: data.status,
                    tasks: data.tasks?.map((task: Task) => ({
                        ...task,
                        createdAt: task.createdAt?.toDate(),
                        lastModifiedAt: task.lastModifiedAt?.toDate()
                    })) || [],
                    title: data.title
                } as Document;
            });
            setDocuments(updatedDocs);
        });

        fetchDocuments();
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    if (loading) return <div className="flex justify-center mt-8"><ModernLoader /></div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/!* Заголовок и навигация *!/}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Панель сотрудника приёмной комиссии</h1>

                        <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab('calendar')}
                                    className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <CalendarIcon className="h-5 w-5 mr-2" />
                                    Календарь
                                </button>
                                <button
                                    onClick={() => setActiveTab('applications')}
                                    className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                                    Заявки
                                </button>
                                <button
                                    onClick={() => setActiveTab('stats')}
                                    className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <ChartBarIcon className="h-5 w-5 mr-2" />
                                    Статистика
                                </button>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-gray-900 ml-4"
                                title="Выйти из системы"
                            >
                                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                                <span className="ml-2 hidden md:inline">Выйти</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/!* Основной контент *!/}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/!* Карточки с статистикой *!/}
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

                {/!* Контент вкладок *!/}
                {activeTab === 'calendar' && (
                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Календарь приёмной комиссии</h2>
                            <AdmissionCalender />
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Предстоящие мероприятия</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {documents.length > 0 ? (
                                    documents.map(document => (
                                        <DocumentCard
                                            key={document.id}
                                            document={document}
                                            onClick={() => setSelectedDoc(document)}
                                        />
                                    ))) : (
                                    <p className="text-gray-500">Нет запланированных мероприятий</p>)
                                }
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'applications' && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        {/!* Контент вкладки заявок *!/}
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Статистика приёма</h2>
                        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                            Графики статистики будут здесь
                        </div>
                    </div>
                )}
            </main>

            {/!* Боковая панель задач *!/}
            {selectedDoc && (
                <TaskPanel
                    document={selectedDoc}
                    onClose={() => setSelectedDoc(null)}
                />
            )}
        </div>
    );
};

import { CalendarIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/24/outline";
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
*/
