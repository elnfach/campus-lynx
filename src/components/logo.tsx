import { useStorageUrl } from "@/hooks/useStorageUrl";
import content from "@/config/common.ts";

export default function Logo()
{
    const logoUrl = useStorageUrl("/campus-lynx/assets/logo.svg");
    return(
        <img
            src={logoUrl}
            className="logo"
            alt={content.info.title}
        />
    )
}