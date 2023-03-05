import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import { categoryState, ECategories, toDoSelector } from "../atoms";
import styled from "styled-components";
import React from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    max-width: 480px;
    margin: 0 auto;
`;
const HeadLine = styled.h1`
    text-align: center;
    padding: 20px;
    font-size: 2em;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
`;
const DividLine = styled.hr`
    width: 100%;
    background-color: white;
    border-radius: 2px;
    padding: 1px;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    return (
        <Container>
            <HeadLine>To Do List</HeadLine>
            <DividLine />

            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </Container>
    );
}

export default ToDoList;
