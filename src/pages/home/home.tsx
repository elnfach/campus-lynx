import '@styles/home/home.css'
import Articles from "@/components/articles"
import InvitationForm from "@/components/invitationForm"
import Present from "@/components/present.tsx";
import {useTheme} from "@/hooks/useTheme.ts";
import {Accordion} from "@/components/accordion.tsx";
import H3 from "@/components/text/h3.tsx";
import EducationalForm from "@/components/educationalForm.tsx";
import EducationalProgramme from "@/components/educationalProgramme.tsx";
import {faqItems} from "@/config/common.ts";

function Home() {
    const {theme} = useTheme();

    const baseClasses = 'w-full h-full mx-auto px-6 py-12';
    const homeClasses = `
    ${baseClasses}
    ${theme.colors.background}
    `;

    return (
        <main className={homeClasses}>
            <Present/>
            <InvitationForm/>
            <H3 className="text-center text-university-primary m-8">Часто задаваемые вопросы</H3>
            <Accordion items={faqItems}/>
            <EducationalForm/>
            <div id="college">
                <EducationalProgramme/>
            </div>
            <Articles/>
        </main>
    );
}

export default Home