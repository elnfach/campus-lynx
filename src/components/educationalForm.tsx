import Carousel from "@/components/carousel/carousel.tsx";
import EducationalFormCard from "@/components/cards/educationalForm/educationalFormCard.tsx";
import type EducationalFormItem from "@/components/cards/educationalForm/educationalFormItem.ts";
import {AcademicCapIcon, ClockIcon, ComputerDesktopIcon, MoonIcon, SunIcon, UserIcon} from "@heroicons/react/16/solid";
import H1 from "@/components/text/h1.tsx";


export default function EducationalForm()
{
    //const {theme} = useTheme();

    const surfaceStyle = `
        relative
        px-4 
        py-8
    `

    const educationItems: EducationalFormItem[] =
    [
        {
            title: "Очное",
            icon: <AcademicCapIcon/>,
            description: "Посещаете лекции и семинары днём 5−6 раз в неделю, сдаёте зачёты и экзамены. Учебный год начинается 1 сентября и разделён на 2 семестра."
        },
        {
            title: "Заочное",
            icon: <UserIcon/>,
            description: "Большую часть программы вы изучаете самостоятельно. Дважды в год приезжаете в Университет на практику и закрытие экзаменационной сессии."
        },
        {
            title: "Очно-Заочное",
            icon: <ClockIcon/>,
            description: "Посещаете Университет 2−3 раза в неделю и, кроме того, удалённо подключаетесь к занятиям через приложение Synergy Online."
        },
        {
            title: "Дистанционное",
            icon: <ComputerDesktopIcon/>,
            description: "Занимаетесь через интернет в удобное для вас время с помощью учебной системы. Обучение модульное: проходите один учебный модуль, сдаёте тест и переходите на следующий. По окончании вы получите диплом государственного образца."
        },
        {
            title: "Вечерняя",
            icon: <MoonIcon/>,
            description: "Посещаете занятия вечером 2 раза в неделю в будние дни. Занятия проходят на протяжении всего учебного года. Зачёты и экзамены сдаются очно."
        },
        {
            title: "Выходного дня",
            icon: <SunIcon/>,
            description: "Обучение проходит в субботу и воскресенье. Объём занятий соответствует количеству часов, предусмотренных образовательной программой."
        },
    ]

    return (
        <div className={surfaceStyle}>
            <H1 className="text-left text-university-primary mb-8">Формы обучения</H1>
            <Carousel items={educationItems} Card={EducationalFormCard}/>
        </div>
    )
}