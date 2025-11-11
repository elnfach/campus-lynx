import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ModernLoader } from '@/components/ui/loading/modernLoader';
import {useTheme} from "@/hooks/useTheme.ts";
import Button, {ButtonType} from "@/components/ui/buttons/button.tsx";
import Text, {FontWeight} from "@/components/ui/text/text.tsx";
import Modifier from "@/components/ui/modifier/modifier.tsx";

export const Login = () => {
    const {theme} = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithUsername, error, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginWithUsername(username, password);
            navigate(`/profile`)
        } catch (err) {
            console.error(err);
        }
    };

    const backgroundStyle = `
        min-h-screen flex items-center justify-center
        ${theme.colors.background}
    `;

    const surfaceStyle = `
        w-full max-w-md px-8 py-12 rounded-2xl shadow-xl
        ${theme.colors.surface}
    `;

    const titleStyle = `
        text-3xl font-bold mb-2
        
        ${theme.colors.onSurface}
    `;

    /*const enterButtonStyle = `
        w-full py-3 px-4 
        font-medium 
        rounded-lg transition 
        flex justify-center items-center
        
        ${theme.colors.primaryContainer}
        ${theme.colors.onPrimaryContainer}
    `;*/

    return (
        <div className={backgroundStyle}>
            <div className={surfaceStyle}>
                <div className="text-center mb-8">
                    <h1 className={titleStyle}>Добро пожаловать</h1>
                    <p className="text-gray-600">Введите свои учетные данные</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Логин
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
                            focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Ваш логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
                            focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={()=>{}}
                        modifier={Modifier.new().fillMaxWidth().padding(12, 16)}
                        enabled={!loading}
                        type={ButtonType.Submit}
                    >
                        <Text
                            fontWeight={FontWeight.Medium}
                            text={loading ? (
                                <>
                                    <ModernLoader />
                                    <span className="ml-2">Вход...</span>
                                </>
                            ) : (
                                'Войти'
                            )} />
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Нет доступа? Обратитесь к администратору</p>
                </div>
            </div>
        </div>
    );
};