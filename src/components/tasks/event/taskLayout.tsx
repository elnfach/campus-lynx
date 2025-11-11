import {useEffect, useState} from "react";
import {TaskCard} from "@/components/tasks/event/taskCard.tsx";
import {collection, type DocumentData, getDocs, onSnapshot, QueryDocumentSnapshot} from "firebase/firestore";
import {database} from "@/config/firebase.ts";
import type {Task} from "@/components/tasks/event/model/task.ts";
import {ModernLoader} from "@/components/ui/loading/modernLoader.tsx";

export const TaskLayout = () => {
    const [, setSelectedTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const processDocument = (doc:  QueryDocumentSnapshot<DocumentData, DocumentData>): Task => {
            const data = doc.data();
            return {
                id: doc.id,
                author: data.author,
                created_at: data.created_at?.toDate(),

                changelog: data.changelog,
                status: data.status,

                title: data.title,
                description: data.description,
            } as Task;
        };

        const fetchDocuments = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'tasks'));
                setTasks(querySnapshot.docs.map(processDocument));
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onSnapshot(collection(database, 'tasks'), (snapshot) => {
            setTasks(snapshot.docs.map(processDocument));
        });

        fetchDocuments();
        return () => unsubscribe();
    }, []);

    if (loading) return <ModernLoader />;

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                    />
                ))) : (
                <p className="text-gray-500">Нет запланированных мероприятий</p>)
            }
        </div>
    )
}