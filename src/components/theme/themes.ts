import type {AppTheme} from "@/components/theme/interface/appTheme.ts";

export const lightTheme: AppTheme = {
    colors: {
        primary: "bg-[#415f91]",
        onPrimary: "text-white",
        onPrimaryHover: "text-white",
        primaryContainer: "bg-[#d6e3ff]",
        onPrimaryContainer: "text-[#284777]",
        inversePrimary: "bg-[#aac7ff]",

        secondary: "bg-[#565f71]",
        onSecondary: "text-white",
        onSecondaryHover: "text-white",
        secondaryContainer: "bg-[#dae2f9]",
        onSecondaryContainer: "text-[#3e4759]",

        tertiary: "bg-[#705575]",
        onTertiary: "text-white",
        onTertiaryHover: "text-white",
        tertiaryContainer: "bg-[#fad8fd]",
        onTertiaryContainer: "text-[#573e5c]",

        background: "bg-white",
        onBackground: "text-black",

        surface: "bg-white",
        onSurface: "text-zinc-900",
        onSurfaceHover: "hover:text-zinc-400",
        surfaceVariant: "",
        onSurfaceVariant: "",
        surfaceTint: "",
        inverseSurface: "bg-[#2e3036]",
        inverseOnSurface: "text-[#f0f0f7]",

        error: "bg-red-500",
        onError: "text-white",
        onErrorHover: "text-white",
        errorContainer: "",
        onErrorContainer: "",

        outline: "",
        onOutline: "",
        onOutlineVariant: "",

        scrim: "",
        surfaceBright: "",
        surfaceContainer: "bg-[#ededf4]",
        surfaceContainerHigh: "",
        surfaceContainerHighest: "",
        surfaceContainerLow: "",
        surfaceContainerLowest: "",
        surfaceDim: "bg-[#d9d9e0]"
    },
    typography: {
        h1: "text-5xl font-bold leading-tight",
        h2: "text-4xl font-bold leading-snug",
        h3: "text-3xl font-bold",
        h4: "text-2xl font-semibold",
        h5: "text-xl font-semibold",
        h6: "text-lg font-medium",

        body: "text-base font-normal leading-relaxed",
        bodyLarge: "text-lg font-normal leading-relaxed",
        bodySmall: "text-sm font-normal",

        caption: "text-sm opacity-75",
        captionLarge: "text-base opacity-75",
        captionSmall: "text-xs opacity-75",

        subtitle: "text-xl font-medium text-gray-600",
        subtitleSmall: "text-base font-medium text-gray-600",

        button: "text-sm font-medium tracking-wide",
        buttonLarge: "text-base font-medium tracking-wide",
        buttonSmall: "font-medium tracking-wide",

        overline: "text-xs font-medium uppercase tracking-widest opacity-75",

        link: "text-base text-blue-600 hover:underline",
        linkSmall: "text-sm text-blue-600 hover:underline",
    },
    shapes: {
        none: "rounded-none",
        small: "rounded",
        medium: "rounded-lg",
        large: "rounded-xl",
        xlarge: "rounded-2xl",
        full: "rounded-full",

        border: "border",
        border0: "border-0",
        border2: "border-2",
        border4: "border-4",
        border8: "border-8",

        borderSolid: "border-solid",
        borderDashed: "border-dashed",
        borderDotted: "border-dotted",

        shadow: "shadow",
        shadowSm: "shadow-sm",
        shadowMd: "shadow-md",
        shadowLg: "shadow-lg",
        shadowXl: "shadow-xl",
        shadow2xl: "shadow-2xl",
        shadowInner: "shadow-inner",
        shadowNone: "shadow-none",

        pill: "rounded-full px-4 py-1",
        card: "rounded-lg shadow-md",
        elevatedCard: "rounded-xl shadow-lg",
    },
};

export const darkTheme: AppTheme = {
    colors: {
        primary: "bg-[#aac7ff]",
        onPrimary: "text-[#0a305f]",
        onPrimaryHover: "hover:text-sky-600",
        primaryContainer: "bg-[#284777]",
        onPrimaryContainer: "text-[#d6e3ff]",
        inversePrimary: "bg-[#2e3036]",

        secondary: "bg-[#bec6dc]",
        onSecondary: "text-[#283141]",
        onSecondaryHover: "",
        secondaryContainer: "bg-[#3e4759]",
        onSecondaryContainer: "text-[#dae2f9]",

        tertiary: "bg-[#ddbce0]",
        onTertiary: "text-[#3f2844]",
        onTertiaryHover: "",
        tertiaryContainer: "bg-[#573e5c]",
        onTertiaryContainer: "text-[#fad8fd]",

        background: "bg-neutral-950",
        onBackground: "text-white",

        surface: "bg-[#111318]",
        onSurface: "text-[#e2e2e9]",
        onSurfaceHover: "hover:text-zinc-600",
        surfaceVariant: "",
        onSurfaceVariant: "",
        surfaceTint: "",
        inverseSurface: "bg-[#e2e2e9]",
        inverseOnSurface: "text-[#2e3036]",

        error: "bg-[#ffb4ab]",
        onError: "text-[#690005]",
        onErrorHover: "",
        errorContainer: "bg-[#93000a]",
        onErrorContainer: "text-[#ffdad6]",

        outline: "",
        onOutline: "",
        onOutlineVariant: "",

        scrim: "",
        surfaceBright: "",
        surfaceContainer: "bg-[#1d2024]",
        surfaceContainerHigh: "",
        surfaceContainerHighest: "",
        surfaceContainerLow: "",
        surfaceContainerLowest: "",
        surfaceDim: ""
    },
    typography: { ...lightTheme.typography },
    shapes: { ...lightTheme.shapes },
};