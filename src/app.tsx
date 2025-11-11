import '@styles/app.css'
import Home from "@/pages/home/home";
import {Route, Routes} from 'react-router-dom';
import About from "@/pages/about/about";
import {ThemeProvider} from "@/components/theme/themeProvider.tsx";
import ProtectedRoute from "@/components/protectedRoute.tsx";
import {Login} from "@/pages/login/login.tsx";
import DefaultLayout from "@/components/layouts/defaultLayout.tsx";
import NotFound from "@/pages/404/404.tsx";
import EmployeeLayout from "@/components/layouts/employeeLayout.tsx";
import {AuthRoute} from "@/components/authRoute.tsx";
import {Profile} from "@/pages/profile/profile.tsx";

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route
                    path='/'
                    element={<DefaultLayout/>}
                    children={
                        [
                            <Route index={true} element={<Home/>}/>,
                            <Route path='about' element={<About/>}/>,
                            <Route
                                path='login'
                                children={
                                    <Route element={<AuthRoute />}>
                                        <Route index element={<Login />} />
                                    </Route>
                                }
                            />,
                            <Route path='*' element={<NotFound/>}/>,
                        ]
                    }
                />
                <Route
                    path='profile'
                    element={<EmployeeLayout/>}
                    children={
                        [
                            <Route element={<ProtectedRoute />}>
                                <Route index element={<Profile />} />
                            </Route>
                        ]
                    }
                />
            </Routes>
        </ThemeProvider>
    )
}