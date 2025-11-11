import {useTheme} from "@/hooks/useTheme";
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";

export const DarkModeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    const styles = `
        rounded-full focus:outline-none
        p-1 h-8 w-8 ml-3
    `

    return (
        <button
            onClick={toggleTheme}
            className={styles}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};