import React, { useState, useEffect, useRef } from 'react';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { database } from "@/config/firebase.ts";
import { useAuth } from "@/hooks/useAuth.ts";

type Message = {
    id: string;
    content: string;
    sent_at: Timestamp;
    user_id: string;
}

export default function ChatFab() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!isOpen || !user) return;

        const q = query(
            collection(database, 'anonymous', user.id, 'messages'),
            orderBy('sent_at', 'asc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesData: Message[] = [];
            querySnapshot.forEach((doc) => {
                messagesData.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, [isOpen, user]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user || isLoading) return;

        setIsLoading(true);
        try {
            await addDoc(collection(database, 'anonymous', user.id, 'messages'), {
                content: message.trim(),
                sent_at: serverTimestamp(),
                user_id: user.id
            });
            setMessage('');
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    const formatTime = (timestamp: Timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* FAB Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </button>

            {/* Chat Dialog */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 className="font-semibold text-center">Чат с консультантом</h3>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 text-sm py-8">
                                Напишите ваш вопрос, и мы скоро ответим!
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${
                                            msg.user_id === user?.id ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-2 rounded-2xl ${
                                                msg.user_id === user?.id
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}
                                        >
                                            <p className="text-sm">{msg.content}</p>
                                            <p
                                                className={`text-xs mt-1 ${
                                                    msg.user_id === user?.id
                                                        ? 'text-blue-100'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {formatTime(msg.sent_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Введите сообщение..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    '→'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}