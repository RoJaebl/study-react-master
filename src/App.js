import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;
const Btn = styled.button`
    color: white;
    background-color: tomato;
    border: 0;
    border-radius: 15px;
`;
const Input = styled.input.attrs({ required: true, minength: 10 })`
    background-color: tomato;
`;
function App() {
    return (
        <Father as="header">
            <Btn>Log In</Btn>
            <Btn as="a">Log In</Btn>
            <Input />
            <Input />
            <Input />
        </Father>
    );
}

export default App;
