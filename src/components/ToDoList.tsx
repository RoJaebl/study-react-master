import CreateToDo from "./CreateToDo";
import { useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import { toDoSelector, toDoState } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`;
const HeadLine = styled.h1`
    text-align: center;
    padding: 20px;
    font-size: 2em;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
`;
const Category = styled.h2`
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
    padding: 10px;
`;
const DividLine = styled.hr`
    width: 100%;
    background-color: white;
    border-radius: 2px;
    padding: 1px;
`;
function ToDoList() {
    const { to_do, doing, done } = useRecoilValue(toDoSelector);
    return (
        <Container>
            <HeadLine>To Dos</HeadLine>
            <DividLine />
            <CreateToDo />
            <Category>To Do</Category>
            <ul>
                {to_do.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
            <DividLine />
            <Category>Doing</Category>
            <ul>
                {doing.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
            <DividLine />
            <Category>Done</Category>
            <ul>
                {done.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
            <DividLine />
        </Container>
    );
}

export default ToDoList;
