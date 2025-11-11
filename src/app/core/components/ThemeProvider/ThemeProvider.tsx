import React, {useEffect, useState} from "react";
import {type AppTheme, THEME_STORAGE_KEY, ThemeContext} from "./ThemeProvider.types.ts";

const ThemeProvider = (
    {
        children,
    }: { children: React.ReactNode; },
) => {
    const [theme, setThemeState] = useState<AppTheme>('light');

    const getSystemTheme = (): AppTheme => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const getInitialTheme = (): AppTheme => {
        if (typeof window === 'undefined') return 'light';

        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme | null;

        if (savedTheme) {
            return savedTheme;
        }

        return getSystemTheme();
    };

    const setTheme = (newTheme: AppTheme) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        document.documentElement.setAttribute(THEME_STORAGE_KEY, newTheme);
    };

    // Переключаем тему
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    return (
        <ThemeContext.Provider value={
            {
                theme,
                toggleTheme,
                setTheme,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;