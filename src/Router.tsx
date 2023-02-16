import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./screens/About";
import Header from "./screens/components/Header";
import Home from "./screens/Home";

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
