import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

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
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
        <BiggerBox ref={biggerBoxRef}>
            <Box
                drag
                dragSnapToOrigin
                dragElastic={0.05}
                dragConstraints={biggerBoxRef}
                variants={boxVariants}
                whileHover="hover"
                whileTap="down"
            />
        </BiggerBox>
    );
}

export default App;
