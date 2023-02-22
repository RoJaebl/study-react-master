import { useQuery } from "@tanstack/react-query";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
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
function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation();
    const priceMatch = useMatch(`/:coinId/price`);
    const chartMatch = useMatch(`/:coinId/chart`);
    const { isLoading: infoIsLoading, data: infoData } = useQuery(
        ["info", coinId],
        () => fetchCoinInfo(`${coinId}`)
    );
    const { isLoading: tickersIsLoading, data: tickersData } = useQuery(
        ["tickers", coinId],
        () => fetchCoinTickers(`${coinId}`)
    );
    const isLoading = infoIsLoading || tickersIsLoading;
    const formatter = new Intl.NumberFormat("ko", {
        notation: "compact",
        compactDisplay: "long",
    });
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
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
                            <span>Open source:</span>
                            <span>
                                {infoData
                                    ? `${infoData.open_source ? "Yes" : "No"}`
                                    : "-"}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>
                                {tickersData
                                    ? formatter.format(tickersData.total_supply)
                                    : "-"}
                            </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>
                                {tickersData
                                    ? formatter.format(tickersData.max_supply)
                                    : "-"}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to="chart" state={{ coinId }}>
                                Chart
                            </Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to="price" state={{ coinId }}>
                                Price
                            </Link>
                        </Tab>
                    </Tabs>
                    <Outlet context={{ coinId: coinId }} />
                </>
            )}
        </Container>
    );
}
export default Coin;
