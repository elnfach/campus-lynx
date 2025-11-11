import {createContext} from "react";

export type LightTheme = 'light';
export type DarkTheme = 'dark';

export type AppTheme = LightTheme | DarkTheme;

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeContextType {
    theme: AppTheme;
    toggleTheme: () => void;
    setTheme: (theme: AppTheme) => void;
}

export const THEME_STORAGE_KEY = 'theme';