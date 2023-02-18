import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import About from "./screens/About";
import ErrorComponent from "./screens/components/ErrorComponents";
import Notfoutnd from "./screens/components/Notfound";
import Home from "./screens/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "about",
                element: <About />,
            },
        ],
        errorElement: <Notfoutnd />,
    },
]);

export default router;
