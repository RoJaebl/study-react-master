import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CandleChart from "./CandleChart";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import LineChart from "./LineChart";
import Price from "./Price";

export interface IRouterProps {
    isDark: boolean;
}
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
                path: ":coinId/*",
                element: <Coin />,
                children: [
                    {
                        path: "price",
                        element: <Price />,
                    },
                    {
                        path: "chart",
                        element: <Chart />,
                        children: [
                            {
                                path: "line",
                                element: <LineChart />,
                            },
                            {
                                path: "candle",
                                element: <CandleChart />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
export default router;
