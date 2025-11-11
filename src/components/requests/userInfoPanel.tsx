import type {Ticket} from './requestsLayout.tsx';

interface UserInfoPanelProps {
    ticket: Ticket;
}

export default function UserInfoPanel({ ticket }: UserInfoPanelProps) {
    const userInfo = [
        { label: 'ФИО', value: ticket.userName },
        { label: 'Email', value: ticket.userEmail || 'Не указан' },
        { label: 'Факультет', value: ticket.userFaculty || 'Не указан' },
        { label: 'Курс', value: ticket.userCourse ? `${ticket.userCourse} курс` : 'Не указан' },
        { label: 'Статус', value: ticket.userId.includes('anonymous') ? 'Анонимный' : 'Авторизованный' }
    ];

    return (
        <div className="h-full p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Информация о студенте</h3>

            <div className="space-y-3">
                {userInfo.map((info, index) => (
                    <div key={index}>
                        <p className="text-sm text-gray-500">{info.label}</p>
                        <p className="text-sm font-medium text-gray-800">{info.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Категория обращения</h4>
                <p className="text-sm text-blue-600 capitalize">{ticket.category}</p>
            </div>

            {ticket.assignedOperator && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Назначено</h4>
                    <p className="text-sm text-gray-600">{ticket.assignedOperator}</p>
                    <p className="text-xs text-gray-400">
                        {new Date(ticket.updatedAt).toLocaleString('ru-RU')}
                    </p>
                </div>
            )}
        </div>
    );
}