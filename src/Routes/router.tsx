import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "tv",
                element: <Tv />,
            },
            {
                path: "serch",
                element: <Search />,
            },
        ],
    },
]);
export default router;
