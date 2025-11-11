import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { database } from "@/config/firebase.ts";
import type {Ticket} from './requestsLayout.tsx';
import TicketCard from './ticketCard.tsx';

interface TicketListProps {
    onSelectTicket: (ticket: Ticket) => void;
    selectedTicket: Ticket | null;
}

export default function TicketList({ onSelectTicket, selectedTicket }: TicketListProps) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'opened' | 'in-process'>('opened');

    useEffect(() => {
        const q = query(
            collection(database, 'anonymous'),
            //where('status', 'in', filter === 'all' ? ['opened', 'in-process'] : [filter]),

        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ticketsData: Ticket[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                ticketsData.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt.toDate(),
                    closedAt: data.closedAt?.toDate(),
                    messages: data.messages?.map((msg: any) => ({
                        ...msg,
                        timestamp: msg.timestamp.toDate()
                    })) || []
                } as Ticket);
            });
            setTickets(ticketsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [filter]);

    const handleSelectTicket = async (ticket: Ticket) => {
        // Блокируем заявку для других операторов
        if (ticket.status === 'opened') {
            await updateDoc(doc(database, 'tickets', ticket.id), {
                status: 'in-process',
                assignedTo: 'currentOperatorId', // Здесь должен быть ID текущего оператора
                assignedOperator: 'Имя оператора',
                updatedAt: new Date()
            });
        }

        onSelectTicket(ticket);
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Заявки</h2>

                {/* Filters */}
                <div className="flex space-x-2 mt-3">
                    <button
                        onClick={() => setFilter('opened')}
                        className={`px-3 py-1 rounded-full text-sm ${
                            filter === 'opened'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Новые ({tickets.filter(t => t.status === 'opened').length})
                    </button>
                    <button
                        onClick={() => setFilter('in-process')}
                        className={`px-3 py-1 rounded-full text-sm ${
                            filter === 'in-process'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        В работе ({tickets.filter(t => t.status === 'in-process').length})
                    </button>
                </div>
            </div>

            {/* Tickets List */}
            <div className="flex-1 overflow-y-auto">
                {tickets.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        {filter === 'opened'
                            ? 'Нет новых заявок'
                            : 'Нет заявок в работе'}
                    </div>
                ) : (
                    <div className="p-2 space-y-2">
                        {tickets.map((ticket) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                isSelected={selectedTicket?.id === ticket.id}
                                onSelect={handleSelectTicket}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}