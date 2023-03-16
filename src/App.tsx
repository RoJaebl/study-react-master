import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
`;

const boxVariants: Variants = {
    hover: {
        scale: 1.5,
        rotateZ: 90,
        boxShadow:
            "2px 0px 3px rgba(0, 0, 0, 0.1), 10px 0 20px rgba(0, 0, 0, 0.5)",
    },
    down: { scale: 1, borderRadius: "100px" },
    dragging: {
        backgroundColor: "rgb(46, 204, 133)",
        transition: { duration: 1 },
    },
};

function App() {
    return (
        <Box
            drag
            variants={boxVariants}
            whileHover="hover"
            whileTap="down"
            whileDrag="dragging"
        />
    );
}

export default App;
