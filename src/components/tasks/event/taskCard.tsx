import {ArchiveBoxIcon, ArrowRightIcon, CheckCircleIcon, PauseIcon} from "@heroicons/react/24/outline";
import type {Task} from "@/components/tasks/event/model/task.ts";
import {useTheme} from "@/hooks/useTheme.ts";

interface TaskCardProps {
    task: Task,
    onClick: () => void,
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
    const {theme} = useTheme();
    const statusIcon = {
        'opened': <CheckCircleIcon className="h-5 w-5 text-green-500" />,
        'in-process': <ArrowRightIcon className="h-5 w-5 text-yellow-500" />,
        'paused': <PauseIcon className="h-5 w-5 text-red-500" />,
        'closed': <ArchiveBoxIcon className="h-5 w-5 text-gray-500" />,
    }[task.status]

    const card_style = `
        rounded-xl shadow-lg overflow-hidden hover:shadow-xl 
        transition-all duration-300 cursor-pointer
        ${theme.colors.surface}
        ${theme.colors.onSurface}  
    `;

    return (
        <div
            onClick={onClick}
            className={card_style}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                        {statusIcon}
                    </div>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">{task.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                        {task.changelog.length > 1 ? (
                            <p className="font-medium">Изменено: {task.created_at.toLocaleDateString()}</p>
                        ) : (
                            <p className="font-medium">{task.author.display_name} разместил(а) в {task.created_at.toLocaleDateString()}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};