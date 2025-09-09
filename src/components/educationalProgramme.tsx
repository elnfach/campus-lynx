import H1 from "@/components/text/h1.tsx";


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
            <H1 className="text-left text-university-primary mb-8">Программы обучения</H1>
        </div>
    )
}