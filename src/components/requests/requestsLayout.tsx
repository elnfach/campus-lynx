import {useState} from "react";
import TicketList from "@/components/requests/ticketList.tsx";
import ChatInterface from "@/components/requests/chatInterface.tsx";
import UserInfoPanel from "@/components/requests/userInfoPanel.tsx";

export interface User {
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    isAnonymous: boolean;
    createdAt: Date;
}

export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    userId: string;
    userName: string;
    type: 'user' | 'operator' | 'system';
}

export interface Ticket {
    id: string;
    userId: string;
    userName: string;
    userEmail?: string;
    userFaculty?: string;
    userCourse?: string;
    status: 'opened' | 'in-process' | 'closed' | 'reopened';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'admission' | 'academic' | 'technical' | 'financial' | 'other';
    subject: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: string;
    assignedOperator?: string;
    closedAt?: Date;
    closedBy?: string;
}

export interface Operator {
    uid: string;
    name: string;
    email: string;
    role: 'operator' | 'supervisor' | 'admin';
    faculty?: string;
    isAvailable: boolean;
    currentTickets: number;
}

export const RequestsLayout = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSelectTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseTicket = () => {
        setSelectedTicket(null);
    };

    return (
        <div className="h-screen bg-gray-100 flex">
            {/* Left Sidebar - Ticket List */}
            <div className={`w-80 bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'ml-0' : '-ml-80'}`}>
                <TicketList
                    onSelectTicket={handleSelectTicket}
                    selectedTicket={selectedTicket}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <ChatInterface
                    ticket={selectedTicket}
                    onCloseTicket={handleCloseTicket}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
            </div>

            {/* Right Sidebar - User Info */}
            {selectedTicket && (
                <div className="w-80 bg-white shadow-lg border-l border-gray-200">
                    <UserInfoPanel ticket={selectedTicket} />
                </div>
            )}
        </div>
    );
}