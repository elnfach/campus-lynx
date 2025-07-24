import '@styles/app.css'
import Home from "@/pages/home/home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "@/pages/about/about";
import NotFound from "@/pages/404/404";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {ThemeProvider} from "@/components/theme/themeProvider.tsx";

function App() {
  return (
    <ThemeProvider>
        <Header/>
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
            </Routes>
        </Router>
        <Footer/>
    </ThemeProvider>
  )
}

export default App
