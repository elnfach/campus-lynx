import Text from "@/components/ui/text/text.tsx";
import Modifier from "@/components/ui/modifier/modifier.tsx";

export default function EducationalProgramme()
{
    //const {theme} = useTheme();

    const surfaceStyle = `
        relative
        px-4 
        py-8
    `

    return (
        <div className={surfaceStyle}>
            <Text
                modifier={Modifier.new().margin(0,0,0,8)}
                text={"Программы обучения"}
            />
        </div>
    )
}