import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, ICoin } from "../api";

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
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
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
const CoinImg = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
function Coins() {
    const { isLoading, data: coins } = useQuery(["allCoins"], fetchCoins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <ConisList>
                    {coins?.map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`${coin.id}`} state={{ name: coin.name }}>
                                <CoinImg
                                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </ConisList>
            )}
        </Container>
    );
}
export default Coins;
export { Container, Header, Title, Loader };
