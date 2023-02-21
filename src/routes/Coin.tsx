import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "./Coins";

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation();
    const [coinInfo, setCoinInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState();
    useEffect(() => {
        (async () => {
            const coinData = await fetch(
                `https://api.coinpaprika.com/v1/coins/${coinId}`
            ).then((rep) => rep.json());
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setCoinInfo(coinData);
            setPriceInfo(priceData);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}
export default Coin;
