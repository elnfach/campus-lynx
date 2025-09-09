import type {ThemeColors} from "@/components/theme/interface/themeColors.ts";
import type {ThemeTypography} from "@/components/theme/interface/themeTypography.ts";
import type {ThemeShapes} from "@/components/theme/interface/themeShapes.ts";

export interface AppTheme {
    colors: ThemeColors;
    typography: ThemeTypography;
    shapes: ThemeShapes;
}