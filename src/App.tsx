import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 15px;
`;
function App() {
    return (
        <Box
            initial={{ scale: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5, mass: 1 }}
            animate={{ scale: 1, rotateZ: 360, borderRadius: 75 }}
        />
    );
}

export default App;
