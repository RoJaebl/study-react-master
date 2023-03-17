import {
    motion,
    Variants,
    useMotionValue,
    useTransform,
    useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 200vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Box = styled(motion.div)`
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
`;
const BiggerBox = styled.div`
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const boxVariants: Variants = {
    hover: {
        scale: 1.5,
        rotateZ: 90,
        boxShadow:
            "2px 0px 3px rgba(0, 0, 0, 0.1), 10px 0 20px rgba(0, 0, 0, 0.5)",
    },
    down: { scale: 1, borderRadius: "100px" },
};

function App() {
    const x = useMotionValue(0);
    const rotateZ = useTransform(x, [-750, 750], [-360, 360]);
    const gradient = useTransform(
        x,
        [-750, 0, 750],
        [
            "linear-gradient(135deg, #0ab1d0, #0053ee)",
            "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
            "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
        ]
    );
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
    return (
        <Wrapper style={{ background: gradient }}>
            <BiggerBox>
                <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
            </BiggerBox>
        </Wrapper>
    );
}

export default App;
