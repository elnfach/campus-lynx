import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, Timestamp, type DocumentData } from 'firebase/firestore';
import { database } from '@/config/firebase';
import { Status } from "@/pages/employee/status.ts";

// Типы и интерфейсы
export type EducationLevel = 'higher' | 'secondary';

export interface Task {
    id: string;
    title: string;
    status: Status;
    author: string;
    createdAt: Date;
    goal: string;
    lastModifiedAt: Date;
    lastModifiedBy: string;
}

export interface FirestoreTask {
    title: string;
    status: Status;
    author: string;
    createdAt: Timestamp;
    goal: string;
    lastModifiedAt: Timestamp;
    lastModifiedBy: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    date: Date;
    educationLevel: EducationLevel;
    author: string;
    createdAt: Date;
    tasks: Task[];
    status: Status;
}

export interface FirestoreCalendarEvent {
    title: string;
    description: string;
    date: Timestamp;
    educationLevel: EducationLevel;
    author: string;
    createdAt: Timestamp;
    tasks: FirestoreTask[];
    status: Status;
}

// Вспомогательные функции преобразования
// const convertToFirestoreTask = (task: Task): FirestoreTask => ({
//     ...task,
//     createdAt: Timestamp.fromDate(task.createdAt),
//     lastModifiedAt: Timestamp.fromDate(task.lastModifiedAt),
// });

const convertFromFirestoreTask = (task: FirestoreTask): Task => ({
    ...task,
    id: '', // будет заполнено позже
    createdAt: task.createdAt.toDate(),
    lastModifiedAt: task.lastModifiedAt.toDate(),
});

const createEvent = async (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'tasks'>): Promise<string> => {
    const eventData: Omit<FirestoreCalendarEvent, 'id'> = {
        ...event,
        date: Timestamp.fromDate(event.date),
        createdAt: Timestamp.now(),
        tasks: [], // начальный пустой массив задач
        status: 'in-progress' as Status, // дефолтный статус
    };

    const docRef = await addDoc(collection(database, 'events'), eventData);
    return docRef.id;
};

const AdmissionCalendar = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id' | 'createdAt' | 'tasks'>>({
        title: '',
        description: '',
        date: new Date(),
        educationLevel: 'higher',
        author: 'currentUser', // здесь должна быть логика получения текущего пользователя
        status: 'in-progress' as Status,
    });

    // Загрузка событий
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'events'), (snapshot) => {
            const loadedEvents: CalendarEvent[] = snapshot.docs.map(doc => {
                const data = doc.data() as FirestoreCalendarEvent & DocumentData;
                return {
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    date: data.date.toDate(),
                    educationLevel: data.educationLevel,
                    author: data.author,
                    createdAt: data.createdAt.toDate(),
                    tasks: data.tasks?.map((task, index) => ({
                        ...convertFromFirestoreTask(task),
                        id: `${doc.id}-task-${index}`, // генерация ID для задачи
                    })) || [],
                    status: data.status,
                };
            });
            setEvents(loadedEvents);
        });

        return () => unsubscribe();
    }, []);

    const addEvent = async () => {
        if (!newEvent.title.trim()) {
            alert('Пожалуйста, введите название мероприятия');
            return;
        }

        try {
            await createEvent(newEvent);
            // Сброс формы
            setNewEvent({
                title: '',
                description: '',
                date: new Date(),
                educationLevel: 'higher',
                author: 'currentUser',
                status: 'in-progress' as Status,
            });
        } catch (error) {
            console.error("Ошибка при добавлении мероприятия:", error);
            alert('Не удалось добавить мероприятие');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Производственный календарь приёмной комиссии</h1>

            {/* Форма добавления нового события */}
            <div className="mb-6 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Добавить новое мероприятие</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Дата</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={newEvent.date.toISOString().split('T')[0]}
                            onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Уровень образования</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={newEvent.educationLevel}
                            onChange={(e) => setNewEvent({...newEvent, educationLevel: e.target.value as EducationLevel})}
                        >
                            <option value="higher">Высшее образование</option>
                            <option value="secondary">Среднее проф. образование</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Название мероприятия</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Описание</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                </div>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={addEvent}
                    disabled={!newEvent.title.trim()}
                >
                    Добавить мероприятие
                </button>
            </div>

            {/* Список мероприятий */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Предстоящие мероприятия</h2>
                {events.length > 0 ? (
                    <ul className="space-y-4">
                        {events.map(event => (
                            <li key={event.id} className="p-4 border rounded-lg">
                                <h3 className="font-bold">{event.title}</h3>
                                <p className="text-gray-600">{event.description}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span>{event.date.toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <span>{event.educationLevel === 'higher' ? 'Высшее' : 'Среднее'} образование</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Нет запланированных мероприятий</p>
                )}
            </div>
        </div>
    );
};

export default AdmissionCalendar;