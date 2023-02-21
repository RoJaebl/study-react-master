import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "./Coins";

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation();
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
