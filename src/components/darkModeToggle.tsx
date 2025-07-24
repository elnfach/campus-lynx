import {useTheme} from "@/hooks/useTheme";

export const DarkModeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <span className="text-yellow-300">☀️</span>
            ) : (
                <span className="text-gray-700">🌙</span>
            )}
        </button>
    );
};