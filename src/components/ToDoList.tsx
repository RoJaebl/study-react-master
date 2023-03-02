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
const ToDoSelector = styled.select`
    border: 1px solid #cccccc;
    outline: 0;
    height: 20px;
    width: 160px;
    border-radius: 4px;
    box-sizing: border-box;
    font-weight: 600;
`;
function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as ECategories);
    };
    return (
        <Container>
            <HeadLine>To Do List</HeadLine>
            <DividLine />
            <ToDoSelector value={category} onInput={onInput} name="" id="">
                <option value={ECategories.TO_DO}>To Do</option>
                <option value={ECategories.DOING}>Doing</option>
                <option value={ECategories.DONE}>Done</option>
            </ToDoSelector>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </Container>
    );
}

export default ToDoList;
