import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Страница не найдена
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Запрошенная вами страница не существует или была перемещена.
                        Пожалуйста, проверьте URL или воспользуйтесь навигацией по сайту.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition duration-200"
                        >
                            Назад
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                        >
                            На главную
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;