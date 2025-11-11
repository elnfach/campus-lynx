import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { database } from '@/config/firebase.ts';
import type {Ticket, Message} from './requestsLayout.tsx';

interface ChatInterfaceProps {
    ticket: Ticket | null;
    onCloseTicket: () => void;
    onToggleSidebar: () => void;
}

export default function ChatInterface({ ticket, onCloseTicket, onToggleSidebar }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (ticket) {
            setMessages(ticket.messages || []);
        }
    }, [ticket]);

    const sendMessage = async (text: string) => {
        if (!ticket || !text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            timestamp: new Date(),
            userId: 'operator-id', // ID оператора
            userName: 'Оператор',
            type: 'operator'
        };

        try {
            await updateDoc(doc(database, 'tickets', ticket.id), {
                messages: arrayUnion({
                    ...newMessage,
                    timestamp: serverTimestamp()
                }),
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
    };

    const closeTicket = async () => {
        if (!ticket) return;

        try {
            await updateDoc(doc(database, 'tickets', ticket.id), {
                status: 'closed',
                closedAt: serverTimestamp(),
                closedBy: 'operator-id',
                updatedAt: serverTimestamp()
            });
            onCloseTicket();
        } catch (error) {
            console.error('Ошибка закрытия заявки:', error);
        }
    };

    if (!ticket) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">👋</div>
                    <h3 className="text-xl font-semibold mb-2">Выберите заявку</h3>
                    <p>Для начала работы выберите заявку из списка слева</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <span className="w-6 h-6">≡</span>
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{ticket.subject}</h2>
                        <p className="text-sm text-gray-500">
                            {ticket.userName} • {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={closeTicket}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Закрыть заявку
                    </button>
                </div>
            </div>

            {/* Messages */}
            {/*<div className="flex-1 overflow-hidden">
                <ChatMessages messages={messages} />
            </div>

             Input
            <div className="p-4 border-t border-gray-200">
                <ChatInput onSendMessage={sendMessage} />
            </div>*/}
        </div>
    );
}