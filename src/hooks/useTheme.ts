import {createContext, useContext} from 'react';
import type {AppTheme} from "@/components/theme/interface/appTheme.ts";

type ThemeContextType = {
    theme: AppTheme;
    isDark: boolean;
    toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};