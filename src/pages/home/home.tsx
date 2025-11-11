import '@styles/home/home.css'
import Articles from "@/components/articles"
import InvitationCard from "@/components/cards/invitationCard.tsx"
import Present from "@/components/present.tsx";
import {Accordion} from "@/components/accordion.tsx";
import EducationalForm from "@/components/educationalForm.tsx";
import EducationalProgramme from "@/components/educationalProgramme.tsx";
import {faqItems} from "@/config/common.tsx";
import Text from "@/components/ui/text/text.tsx";
import Modifier from "@/components/ui/modifier/modifier.tsx";
import ChatFab from "@/pages/home/fab.tsx";
import Button from "@/components/ui/buttons/button.tsx";
import "@/assets/scss/pages/home.scss"
import "@/assets/scss/ui/layout/layout.scss"

function Home() {
    return (
        <main className="main-container row surface-color">
            <InvitationCard/>
            {/*
            <Text
                modifier={Modifier.new().margin(8)}
                text={"Часто задаваемые вопросы"} />
            <Accordion items={faqItems}/>
            <EducationalForm/>
            <div id="college">
                <EducationalProgramme/>
            </div>
            <Articles/>*/}
            {/*<Button onClick={()=>{}} >
                <Text
                    text={"Часто задаваемые вопросы"} />
            </Button>
*/}
            <ChatFab />
        </main>
    );
}

export default Home