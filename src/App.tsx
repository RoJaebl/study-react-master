import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    return (
        <>
            <Header />
            <Outlet />
            <ReactQueryDevtools />
        </>
    );
}
export default App;
