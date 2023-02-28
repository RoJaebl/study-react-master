import { useQuery } from "@tanstack/react-query";
import { Outlet, useMatch, useOutletContext } from "react-router-dom";
import { fetchCoinHistory, ICoinHistorical } from "../api";
import { Helmet } from "react-helmet-async";
import { ICoinContext, Tab, Tabs } from "./Coin";
import { Link } from "react-router-dom";
import { IRouterProps } from "./router";

export interface IChartContext extends ICoinContext {
    histories: ICoinHistorical[];
}

function Chart() {
    const { isDark } = useOutletContext<IRouterProps>();
    const { coinId, name } = useOutletContext() as ICoinContext;
    const lineMatch = useMatch("/:coidId/chart/line");
    const candleMatch = useMatch("/:coidId/chart/candle");
    const { isLoading, data: histories } = useQuery(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );
    return (
        <>
            <Helmet>
                <title>{`${name}-chart`}</title>
            </Helmet>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <>
                    <Tabs>
                        <Tab isActive={lineMatch != null}>
                            <Link to="line">Line</Link>
                        </Tab>
                        <Tab isActive={candleMatch != null}>
                            <Link to="candle">Candle</Link>
                        </Tab>
                    </Tabs>
                    <Outlet context={{ coinId, name, histories, isDark }} />
                </>
                // <ApexCharts type={type} series={series} options={options} />
            )}
        </>
    );
}

export default Chart;
export type { ICoinContext };
