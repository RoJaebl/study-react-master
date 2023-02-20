import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ConisList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: black;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
    font-size: 2em;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
    font-size: 2em;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
    display: block;
`;

const coins = [];
interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
function Coins() {
    const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const json = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            ).then((response) => response.json());
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <ConisList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`${coin.id}}`}>{coin.name} &rarr;</Link>
                        </Coin>
                    ))}
                </ConisList>
            )}
        </Container>
    );
}
export default Coins;
