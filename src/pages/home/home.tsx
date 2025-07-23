import '@styles/home/home.css'
import Articles from "@/components/articles"
import InvitationForm from "@/components/invitationForm"
//import {DarkModeToggle} from "../../components/darkModeToggle.tsx";

function Home() {
    return (
        <div className="w-full h-full bg-gray-50">
            <main className="container mx-auto px-6 py-12">
                <InvitationForm/>
                <Articles/>
            </main>
        </div>
    );
}

export default Home