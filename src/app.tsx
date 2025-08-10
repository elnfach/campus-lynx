import '@styles/app.css'
import Home from "@/pages/home/home";
import {Route, Routes} from 'react-router-dom';
import About from "@/pages/about/about";
import {ThemeProvider} from "@/components/theme/themeProvider.tsx";
import ProtectedRoute from "@/components/protectedRoute.tsx";
import {AdminPanel} from "@/pages/admin/adminPanel.tsx";
import {Login} from "@/pages/login/login.tsx";
import DefaultLayout from "@/components/layouts/defaultLayout.tsx";
import AdminLayout from "@/components/layouts/adminLayout.tsx";
import NotFound from "@/pages/404/404.tsx";
import EmployeeLayout from "@/components/layouts/employeeLayout.tsx";
import {EmployeePanel} from "@/pages/employee/employeePanel.tsx";
import {AuthRoute} from "@/components/authRoute.tsx";

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
                    path='admin'
                    element={<AdminLayout/>}
                    children={
                        [
                            <Route element={<ProtectedRoute requiredRole="admin" />}>
                                <Route index element={<AdminPanel />} />
                            </Route>
                        ]
                    }
                />
                <Route
                    path='employee'
                    element={<EmployeeLayout/>}
                    children={
                        [
                            <Route element={<ProtectedRoute requiredRole="employee" />}>
                                <Route index element={<EmployeePanel />} />
                            </Route>
                        ]
                    }
                />
            </Routes>
        </ThemeProvider>
    )
}