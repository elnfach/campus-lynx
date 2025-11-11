import React, {useState} from "react";
import {DarkModeToggle} from "@/components/darkModeToggle.tsx";
import {
    ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import {Bars3Icon} from "@heroicons/react/24/outline";
import Logo from "@/components/logo.tsx";
import Button from "@/components/ui/buttons/button.tsx";
import Text from "@/components/ui/text/text.tsx";
import Modifier from "@/components/ui/modifier/modifier.tsx";
import {Column} from "@/components/ui/layout/column.tsx";
import {Spacer} from "@/components/ui/spacer/spacer.tsx";
import {navItems} from "@/config/common.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {useTheme} from "@/hooks/useTheme.ts";

interface NavPanelProps {
    setActiveTab: (tab: string) => void;
    activeTab?: string;
}

export const NavPanel = (
    {
        setActiveTab,
    }: NavPanelProps
) => {
    const {theme} = useTheme();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen ] = useState<boolean>()
    const handleOverlayClick = () => {
        setIsOpen(false);
    };
    const handleSidebarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const background_style = `
        ${theme.colors.surface}
        ${theme.colors.onSurface}
    `;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-40"
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}

            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                aria-label="Открыть меню"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            <div
                className={`fixed top-0 left-0 h-screen w-64
                shadow-lg transform 
                transition-transform duration-300 
                ${background_style}
                ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:h-screen`}
                onClick={handleSidebarClick}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <Logo/>
                        </div>
                        <DarkModeToggle />
                    </div>
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                        <Column>
                            {navItems.map((item) => (
                                <>
                                    <Button
                                        onClick={() => setActiveTab(item.ref)}
                                        modifier={Modifier.new().fillMaxWidth().margin(8)}

                                        /*className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                            activeTab === item.ref
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}*/
                                    >
                                        <div className="w-5 h-5 mr-3">{item.icon}</div>
                                        <Text text={item.name}/>
                                        <Spacer modifier={Modifier.new().fillMaxWidth()}/>
                                    </Button>

                                </>
                            ))}
                        </Column>
                    </nav>

                    {/* Профиль пользователя */}
                    <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-medium">{user?.display_name}</p>
                                <p className="text-xs">{user?.role.name}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="ml-auto p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                aria-label="Выйти"
                            >
                                <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}