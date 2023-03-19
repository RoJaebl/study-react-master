import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;
const Box = styled(motion.div)`
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba("0, 0, 0, 0."), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 50vw;
    gap: 10px;
    div:last-child,
    div:first-child {
        grid-column: span 2;
    }
`;
const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;
function App() {
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={toggleClicked}>
            <Grid>
                <Box layoutId="hello" />
                <Box />
                <Box />
                <Box />
            </Grid>
            <AnimatePresence>
                {clicked ? (
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Box
                            layoutId="hello"
                            style={{ width: "400px", height: "200px" }}
                        />
                    </Overlay>
                ) : null}
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;
