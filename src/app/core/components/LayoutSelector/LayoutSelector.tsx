import type {ReactNode} from "react";
import {matchPath, useLocation} from "react-router-dom";
import routes from "@/app/routes.ts";

export const LayoutSelector = (
    {
        children,
    }: { children: ReactNode },
) => {
    const location = useLocation();

    const matchedRoute = routes.find(route =>
        matchPath({ path: route.path, end: true }, location.pathname)
    );

    const LayoutComponent = matchedRoute?.layout || DefaultLayout;

    return (
        <LayoutComponent>
            {children}
        </LayoutComponent>
    )
}