import { useStorageUrl } from "@/hooks/useStorageUrl";
import content from "@/config/common.ts";
import {useTheme} from "@/hooks/useTheme";

export default function Logo()
{
    const { isDark } = useTheme();
    const lightLogoUrl = useStorageUrl("/campus-lynx/assets/light-logo.svg");
    const darkLogoUrl = useStorageUrl("/campus-lynx/assets/dark-logo.svg");
    return(
        <img
            src={isDark ? darkLogoUrl : lightLogoUrl}
            className="h-auto w-full logo"
            alt={content.info.title}
        />
    )
}