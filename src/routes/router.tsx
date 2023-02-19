import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Coin from "./Coin";
import Coins from "./Conis";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Coins />,
            },
            {
                path: ":coinId",
                element: <Coin />,
            },
        ],
    },
]);
export default router;
