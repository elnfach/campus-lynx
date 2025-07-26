import { ThemeContext } from '@/hooks/useTheme.ts';
import {darkTheme, lightTheme} from "@/components/theme/themes.ts";
import React, {useEffect, useState} from 'react';

export const ThemeProvider = (
    props: React.ReactNode
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
            {props}
        </ThemeContext.Provider>
    );
};