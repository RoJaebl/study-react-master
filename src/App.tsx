import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;
const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: rgb(238, 0, 153);
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 100px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
    initial: (isBack: boolean) => ({
        opacity: 0,
        scale: 0,
        x: isBack ? -500 : 500,
    }),
    animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
    exit: (isBack: boolean) => ({
        opacity: 0,
        scale: 0,
        x: isBack ? 500 : -500,
        transition: { duration: 1 },
    }),
};
function App() {
    const [visible, setVisible] = useState(1);
    const [isBack, setIsBack] = useState(false);
    const onNext = () => {
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
        setIsBack(false);
    };
    const onPrev = () => {
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
        setIsBack(true);
    };
    return (
        <Wrapper>
            <button onClick={onNext}>next</button>
            <button onClick={onPrev}>prev</button>
            <AnimatePresence custom={isBack}>
                <Box
                    custom={isBack}
                    key={visible}
                    variants={boxVariants}
                    {...boxVariants}
                >
                    {visible}
                </Box>
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;
