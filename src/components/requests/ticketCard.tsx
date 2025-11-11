import type {Ticket} from './requestsLayout.tsx';

interface TicketCardProps {
    ticket: Ticket;
    isSelected: boolean;
    onSelect: (ticket: Ticket) => void;
}

export default function TicketCard({ ticket, isSelected, onSelect }: TicketCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'opened': return 'bg-green-100 text-green-600';
            case 'in-process': return 'bg-yellow-100 text-yellow-600';
            case 'closed': return 'bg-gray-100 text-gray-600';
            case 'reopened': return 'bg-orange-100 text-orange-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'urgent': return '🔥';
            case 'high': return '⚠️';
            case 'medium': return '📋';
            case 'low': return '📄';
            default: return '📄';
        }
    };

    return (
        <div
            onClick={() => onSelect(ticket)}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
        >
            <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-gray-900 line-clamp-1">
          {ticket.subject}
        </span>
                <span className="text-lg">{getPriorityIcon(ticket.priority)}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">
          {ticket.userName}
            {ticket.userFaculty && ` • ${ticket.userFaculty}`}
        </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
          {ticket.status === 'opened' && 'Новая'}
                    {ticket.status === 'in-process' && 'В работе'}
                    {ticket.status === 'closed' && 'Закрыта'}
                    {ticket.status === 'reopened' && 'Переоткрыта'}
        </span>
            </div>

            <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
        </span>
                <span className="text-xs text-gray-400">
          {ticket.messages?.length || 0} сообщ.
        </span>
            </div>
        </div>
    );
}