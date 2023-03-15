import { motion } from "framer-motion";
import styled from "styled-components";
import "./styles.scss";

const Box = styled.div`
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 30px;
`;
function App() {
    return (
        <>
            <Box></Box>
            <motion.div className="container" />
        </>
    );
}

export default App;
