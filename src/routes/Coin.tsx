import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
    Link,
    useMatch,
    useOutletContext,
    Outlet,
    useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from "../api";
import { intlNumberKo } from "../components/intl";
import { CoinImg, Container, Header, Loader, Title } from "./Coins";
import { IRouterProps } from "./router";

const Overview = styled.div`
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    margin: 25px 0px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 400;
    text-transform: uppercase;
`;
const Description = styled.p`
    margin: 10px 0px;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

export interface ICoinContext {
    coinId: string;
    name: string;
}

function Coin() {
    const { isDark } = useOutletContext<IRouterProps>();
    const { coinId } = useParams();
    const priceMatch = useMatch(`/:coinId/price`);
    const chartMatch = useMatch(`/:coinId/chart/*`);
    const { isLoading: coinsIsLoading, data: coins } = useQuery(
        ["allCoins"],
        fetchCoins
    );
    const { isLoading: infoIsLoading, data: infoData } = useQuery(
        ["info", coinId],
        () => fetchCoinInfo(`${coinId}`)
    );
    const { isLoading: tickersIsLoading, data: tickersData } = useQuery(
        ["tickers", coinId],
        () => fetchCoinTickers(`${coinId}`),
        {
            refetchInterval: 10000,
        }
    );
    const isLoading = infoIsLoading || tickersIsLoading;
    const name = infoData?.name;
    return (
        <Container>
            <Helmet>
                <title>{name || "Loading..."}</title>
            </Helmet>
            <Header>
                <Title>{name || "Loading..."}</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem style={{ flexDirection: "row" }}>
                            <span
                                style={{ fontSize: "2.5em" }}
                            >{`${infoData?.rank}`}</span>
                            <span style={{ alignSelf: "normal" }}>{`${
                                infoData
                                    ? infoData.rank < 2
                                        ? "st"
                                        : infoData.rank < 3
                                        ? "nd"
                                        : infoData.rank < 4
                                        ? "rd"
                                        : "th"
                                    : ""
                            }`}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview style={{ justifyContent: "space-around" }}>
                        <OverviewItem>
                            <CoinImg
                                src={`https://coinicons-api.vercel.app/api/icon/${coins
                                    ?.find((coin) => coin.id === coinId)
                                    ?.symbol.toLowerCase()}`}
                            />
                            <span>{infoData ? infoData.symbol : "Oops!"}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>
                                {`$${tickersData?.quotes.USD.price.toFixed(3)}`}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview style={{ justifyContent: "space-around" }}>
                        <OverviewItem>
                            <span>Suply</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>
                                {tickersData
                                    ? intlNumberKo.format(
                                          tickersData.total_supply
                                      )
                                    : "-"}
                                &nbsp;/
                            </span>
                            <span>
                                &nbsp;
                                {`${
                                    tickersData
                                        ? intlNumberKo.format(
                                              tickersData.max_supply
                                          )
                                        : "-"
                                }`}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to="chart/line">Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to="price">Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet
                        context={{
                            coinId: coinId,
                            name: infoData?.name,
                            isDark,
                        }}
                    />
                </>
            )}
        </Container>
    );
}
export default Coin;
export { Tabs, Tab };
