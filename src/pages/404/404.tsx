import { useNavigate } from 'react-router-dom'
import {useTheme} from "@/hooks/useTheme.ts";
import Button from "@/components/ui/buttons/button.tsx";
import Text from "@/components/ui/text/text.tsx";

function NotFound() {
    const {theme} = useTheme();
    const navigate = useNavigate()

    const background = `
        min-h-screen bg-gradient-to-b to-zinc-800
        flex flex-col items-center justify-center p-4
        ${theme.colors.background}
    `

    const surfaceStyle = `
        rounded-xl shadow-lg p-8 md:p-12
        ${theme.colors.surface}
        ${theme.colors.onSurface}
    `;

    const titleStyle = `
        text-9xl font-bold mb-4
        
        ${theme.colors.onPrimaryContainer}
    `;

    const onSurface = `
        text-2xl font-semibold mb-2
        
        ${theme.colors.onSurface}
    `;

    const descStyle = `
        mb-8
        ${theme.colors.onSurface}
    `;

   /* const backButtonStyle = `
        ${theme.colors.secondaryContainer}
        ${theme.colors.onSecondaryContainer}
    `;*/

    return (
        <div className={background}>
            <div className="max-w-2xl w-full text-center">
                <div className={surfaceStyle}>
                    <h1 className={titleStyle}>404</h1>
                    <h2 className={onSurface}>
                        Страница не найдена
                    </h2>
                    <p className={descStyle}>
                        Запрошенная вами страница не существует или была перемещена.
                        Пожалуйста, проверьте URL или воспользуйтесь навигацией по сайту.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate(-1)}

                        >
                            <Text text={"Назад"} />
                        </Button>
                        <Button
                            onClick={() => navigate('/')}
                        >
                            <Text text={"На главную"} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;