import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 15px;
`;

const myVars = {
    start: { scale: 0 },
    end: {
        scale: 1,
        rotateZ: 360,
        borderRadius: 75,
        transition: { type: "spring", duration: 0.5, delay: 0.5, mass: 1 },
    },
};

function App() {
    return <Box variants={myVars} initial="start" animate="end" />;
}

export default App;
