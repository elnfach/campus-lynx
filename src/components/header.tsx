import content from "@/config/common";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {useState, useEffect, useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo.tsx";
import {DarkModeToggle} from "@/components/darkModeToggle.tsx";
import Menu from "@/components/menu.tsx";
import ToggleIconButton from "@/components/buttons/toggleIconButton.tsx";
import {useTheme} from "@/hooks/useTheme.ts";
import {SmartLink} from "@/components/link.tsx";

export interface HeaderBaseProps {
    title?:  string;
    navigationActions?: Array<never>,
}

const Header = () => {
    const {theme} = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleResize = () => setIsOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const surfaceStyle = `
        sticky top-0 z-50 shadow-sm
        ${theme.colors.surface}
    `

    const navStyle = `
        mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-4
        
    `

    const navItemsStyle = `
        duration-200
        whitespace-nowrap
        ${theme.colors.onSurface}
        ${theme.colors.onSurfaceHover}
        ${theme.typography.h6}
    `

    return (
        <header className={surfaceStyle}>
            <nav
                ref={headerRef}
                className={navStyle}
            >
                <div className="flex-shrink-0 max-w-[180px] sm:max-w-[220px] md:max-w-none">
                    <Logo/>
                </div>

                <div className="flex-1 hidden md:flex justify-center space-x-6">
                    {content.header.content.map((item) => (
                        <SmartLink
                            to={item.href}
                            className={navItemsStyle}
                        >
                            {item.name}
                        </SmartLink>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <DarkModeToggle/>
                    <ToggleIconButton
                        className="p-2 focus:outline-none touch-target"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? content.aria_label.close_menu : content.aria_label.open_menu}
                        icon={
                            isOpen ?
                                <XMarkIcon className="h-6 w-6" />
                                :
                                <Bars3Icon className="h-6 w-6" />
                        }
                        isActive={false}
                    />
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                        }}
                        className="fixed inset-x-0 bg-white dark:bg-gray-900 z-40 shadow-lg overflow-y-auto"
                        style={{
                            top: `${headerHeight}px`,
                            height: `calc(100vh - ${headerHeight}px)`,
                            borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Menu/>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;