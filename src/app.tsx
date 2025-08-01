import '@styles/app.css'
import Home from "@/pages/home/home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "@/pages/about/about";
import NotFound from "@/pages/404/404";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {ThemeProvider} from "@/components/theme/themeProvider.tsx";
import Scaffold from "@/components/containers/scaffold.tsx";
import {ProtectedRoute} from "@/components/protectedRoute.tsx";
import {AdminPanel} from "@/pages/admin/adminPanel.tsx";
import {Login} from "@/pages/login/login.tsx";
import {AuthRoute} from "@/components/authRoute.tsx";

function App() {
  return (
    <ThemeProvider>
        <Scaffold
            header={<Header />}
            footer={<Footer />}
            contentColor={""}
            containerColor={""}
        >
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Home/>}
                    />
                    <Route
                        path="/about"
                        element={<About/>}/>
                    <Route
                        path="*"
                        element={<NotFound/>}/>
                    <Route
                        path={"login"}
                        element={
                            <AuthRoute>
                                <Login/>
                            </AuthRoute>
                        }
                    />
                    <Route
                        path={"/admin"}
                        element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        }/>
                </Routes>
            </Router>
        </Scaffold>
    </ThemeProvider>
  )
}

export default App
