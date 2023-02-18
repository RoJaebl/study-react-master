import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import About from "./screens/About";
import ErrorComponent from "./screens/components/ErrorComponents";
import Notfound from "./screens/components/Notfound";
import Home from "./screens/Home";
import User from "./screens/users/User";

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
            {
                path: "users/:userid",
                element: <User />,
            },
        ],
        errorElement: <Notfound />,
    },
]);

export default router;
