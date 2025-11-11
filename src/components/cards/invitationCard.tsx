import React, { useState } from "react";
import Button, {ButtonType} from "@/components/ui/buttons/button.tsx";
import Text, {FontWeight, TextAlign} from "@/components/ui/text/text.tsx";
import "@/assets/scss/cards/invitation_card.scss"

export default function InvitationCard() {
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        email: '',
        program: ''
    });
    const [consent, setConsent] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ phone: '', name: '', email: '', program: '' });
            setConsent(false);
        }, 3000);
    };

    const containerStyle = `
    flex flex-col 
    lg:flex-row 
    justify-between 
    items-center 
    gap-10
    max-w-7xl mx-auto overflow-hidden p-8
  `;

    const containerFormStyle = `
    px-10 py-10 w-full lg:w-1/2
    transition-all duration-500
  `;

    const infoStyle = `
    w-full lg:w-1/2 text-center lg:text-left
    transition-all duration-500
  `;

    const titleStyle = `
        text-4xl font-bold mb-6 bg-clip-text
    `;

    const textStyle = `
        flex items-center
    `;

    const textToApplyStyle = `
        ml-3 block text-sm
    `;

    const descStyle = `
        mb-6
    `;

    const listStyle = `
        w-full px-4 py-3 border 
        border-gray-300 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        transition-all
    `;

    /*const sendButtonStyle = `
        w-full py-3 rounded-lg bg-gradient-to-r 
        font-medium 
        transition-all 
        transform 
        hover:-translate-y-0.5
        
        ${theme.colors.primaryContainer}
    `;*/

    return (
        <div className="outer-container surface-container-low-color">
            <div className="outer-content-container">
                <h2 className="content-title-container">
                    Инвестируйте в свое будущее
                </h2>
                <p className="outer-content-subtitle-container">
                    Получите престижное образование в одном из лучших вузов республики Бурятия
                </p>
                <ul>
                    <li>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Современные образовательные программы
                    </li>
                    <li>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Преподаватели-эксперты в своих областях
                    </li>
                    <li>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Современная инфраструктура и оборудование
                    </li>
                </ul>
            </div>

            <div className="inner-container surface-container-color">
                {isSubmitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Заявка отправлена!</h3>
                        <p className="text-gray-600">Наш специалист свяжется с вами в ближайшее время</p>
                    </div>
                ) : (
                    <>
                        <h2 className="content-title-container">
                            Получите консультацию
                        </h2>
                        <p className="inner-subtitle-container">Узнайте подробности о поступлении и программах обучения</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="content-form">
                                <div className="username">
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="ФИО"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="+7 (___) ___-__-__"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="Email"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <select
                                        id="program"
                                        value={formData.program}
                                        onChange={handleChange}
                                        className={listStyle}
                                        required
                                    >
                                        <option value="">Выберите направление</option>
                                        <option value="IT">Информационные технологии</option>
                                        <option value="economics">Экономика</option>
                                        <option value="law">Юриспруденция</option>
                                        <option value="medicine">Медицина</option>
                                        <option value="engineering">Инженерия</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                    required
                                />
                                <label htmlFor="consent" className={textToApplyStyle}>
                                    Отправляя заявку, вы соглашаетесь с политикой конфиденциальности и условиями обработки персональных данных, а также даёте согласие на получение информационных рассылок
                                </label>
                            </div>

                            <Button
                                onClick={()=>{}}
                                type={ButtonType.Submit}

                            >
                                <Text text="Отправить заявку"
                                      fontWeight={FontWeight.Medium}
                                      textAlign={TextAlign.Center} />
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}