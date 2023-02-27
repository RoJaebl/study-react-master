import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ICoinTickers } from "../api";
import { ICoinContext } from "./Coin";
import { intlNumberEn } from "../components/intl";

const CoinItemAnime = keyframes`
  0% {
    transform: translateY(100px);
    opacity:0;
  }
  60% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
    opacity:1;
  }
`;

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 15px 0px;
    gap: 10px;
`;
const CoinPercent = styled.span<{
    isSurplus: boolean;
    anime?: { delay?: string };
}>`
    display: flex;
    justify-content: space-around;
    text-align: center;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px 0px;
    border-radius: 10px;
    color: ${(props) => (props.isSurplus ? "#00b746" : "#ef403c")};
    animation: ${CoinItemAnime} 0.8s ${(props) => props.anime?.delay}
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
const CoinMarket = styled.span<{ anime?: { delay?: string } }>`
    display: flex;
    justify-content: space-around;
    text-align: center;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px 0px;
    border-radius: 10px;
    color: rgb(247, 208, 0);
    animation: ${CoinItemAnime} 0.8s ${(props) => props.anime?.delay}
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

function Price() {
    const { coinId, name } = useOutletContext() as ICoinContext;
    const { isLoading, data: tickers } = useQuery(["tickers", coinId]);
    const {
        quotes: { USD },
    } = tickers as ICoinTickers;
    console.log(USD);

    return (
        <>
            <Items>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_12h}
                    anime={{ delay: "0s" }}
                >
                    <span>15m</span>
                    <span>{`${USD.percent_change_12h}%`}</span>
                </CoinPercent>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_30m}
                    anime={{ delay: "0.05s" }}
                >
                    <span>30m</span>
                    <span>{`${USD.percent_change_30m}%`}</span>
                </CoinPercent>
            </Items>
            <Items>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_1h}
                    anime={{ delay: "0.1s" }}
                >
                    <span>1h</span>
                    <span>{`${USD.percent_change_1h}%`}</span>
                </CoinPercent>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_6h}
                    anime={{ delay: "0.15s" }}
                >
                    <span>6h</span>
                    <span>{`${USD.percent_change_6h}%`}</span>
                </CoinPercent>
            </Items>
            <Items>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_12h}
                    anime={{ delay: "0.2s" }}
                >
                    <span>12h</span>
                    <span>{`${USD.percent_change_12h}%`}</span>
                </CoinPercent>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_24h}
                    anime={{ delay: "0.25s" }}
                >
                    <span>24h</span>
                    <span>{`${USD.percent_change_24h}%`}</span>
                </CoinPercent>
            </Items>
            <Items>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_7d}
                    anime={{ delay: "0.3s" }}
                >
                    <span>7d</span>
                    <span>{`${USD.percent_change_7d}%`}</span>
                </CoinPercent>
                <CoinPercent
                    isSurplus={0 < USD.percent_change_30d}
                    anime={{ delay: "0.35s" }}
                >
                    <span>30d</span>
                    <span>{`${USD.percent_change_30d}%`}</span>
                </CoinPercent>
            </Items>
            <Items>
                <CoinMarket anime={{ delay: "0.4s" }}>
                    <span>Price</span>
                    <span>{intlNumberEn.format(USD.price)}</span>
                </CoinMarket>
                <CoinMarket anime={{ delay: "0.45s" }}>
                    <span>Cap</span>
                    <span>{intlNumberEn.format(USD.market_cap)}</span>
                </CoinMarket>
            </Items>
        </>
    );
}

export default Price;
