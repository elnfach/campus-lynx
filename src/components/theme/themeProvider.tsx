import { ThemeContext } from '@/hooks/useTheme.ts';
import React, {useEffect, useState} from 'react';
import type {AppTheme} from "@/components/theme/AppTheme.ts";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = (
    {
        children
    }:  ThemeProviderProps
) => {
    const [theme, setThemeState] = useState<AppTheme>('light');

    const applyTheme = (newTheme: AppTheme) => {
        document.documentElement.classList.remove('theme-light', 'theme-dark');
        document.documentElement.classList.add(`theme-${newTheme}`);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as AppTheme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        setThemeState(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const setTheme = (newTheme: AppTheme) => {
        setThemeState(newTheme);
        applyTheme(newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};