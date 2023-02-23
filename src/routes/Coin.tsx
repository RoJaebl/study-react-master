import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { intlNumberKo } from "../components/intl";
import { Container, Header, Loader, Title } from "./Coins";

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
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
    const { coinId } = useParams();
    const priceMatch = useMatch(`/:coinId/price`);
    const chartMatch = useMatch(`/:coinId/chart/*`);
    const { isLoading: infoIsLoading, data: infoData } = useQuery(
        ["info", coinId],
        () => fetchCoinInfo(`${coinId}`)
    );
    const { isLoading: tickersIsLoading, data: tickersData } = useQuery(
        ["tickers", coinId],
        () => fetchCoinTickers(`${coinId}`),
        {
            refetchInterval: 5000,
        }
    );
    const isLoading = infoIsLoading || tickersIsLoading;
    const name = infoData?.name || tickersData?.name;
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
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData ? infoData.rank : "-"}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Sumbol:</span>
                            <span>{infoData ? infoData.symbol : "-"}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>
                                {tickersData?.quotes.USD.price.toFixed(8)}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>
                                {tickersData
                                    ? intlNumberKo.format(
                                          tickersData.total_supply
                                      )
                                    : "-"}
                            </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>
                                {tickersData
                                    ? intlNumberKo.format(
                                          tickersData.max_supply
                                      )
                                    : "-"}
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
                        }}
                    />
                </>
            )}
        </Container>
    );
}
export default Coin;
export { Tabs, Tab };
