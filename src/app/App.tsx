import ThemeProvider from "@/app/core/components/ThemeProvider/ThemeProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "@/app/routes.ts";
import "@/app/core/styles/_themes.scss"
import {LayoutSelector} from "@/app/core/components/LayoutSelector/LayoutSelector.tsx";

const App = () => {
    return (
        <ThemeProvider>
            <LayoutSelector>
                <BrowserRouter>
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </BrowserRouter>
            </LayoutSelector>
        </ThemeProvider>
    )
}

export default App;