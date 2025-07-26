import { ThemeContext } from '@/hooks/useTheme.ts';
import React, {useEffect, useState} from 'react';
import {darkTheme, lightTheme} from "@/components/theme/themes.ts";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = (
    {
        children
    }:  ThemeProviderProps
) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    const theme = isDark ? darkTheme : lightTheme;

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};