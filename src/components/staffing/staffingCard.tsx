import type {ClientUser} from "@/models/user/User.ts";

interface StaffingCardProps {
    user: ClientUser,
    onClick: () => void,
}

export const StaffingCard = ({ user, onClick }: StaffingCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{user.display_name}</h3>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">{user.role.name}</p>
                <p className="text-gray-600 line-clamp-3 mb-4">{user.role.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                        <p className="font-medium">Изменено: {user.created_at.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};