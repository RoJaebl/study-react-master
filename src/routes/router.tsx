import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

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
                children: [
                    {
                        path: "price",
                        element: <Price />,
                    },
                    {
                        path: "chart",
                        element: <Chart />,
                    },
                ],
            },
        ],
    },
]);
export default router;
