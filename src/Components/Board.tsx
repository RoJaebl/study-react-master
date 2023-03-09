import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;
const Wrapper = styled.div`
    width: 200px;
    padding-top: 20px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
`;
interface IAraeProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}
const Area = styled.div<IAraeProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#4f81bd"
            : props.draggingFromThisWith
            ? "pink"
            : "inhert"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px 10px;
    border-radius: 5px;
`;
const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;
interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}
interface IForm {
    toDo: string;
}
function Borad({ toDos, boardId }: IBoardProps) {
    const setTodos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
            isModify: false,
        };
        setTodos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder="Add task on Doing"
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(drops, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(
                            snapshot.draggingFromThisWith
                        )}
                        ref={drops.innerRef}
                        {...drops.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                key={toDo.id}
                                index={index}
                                toDo={toDo}
                                boardId={boardId}
                            ></DragabbleCard>
                        ))}
                        {drops.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default React.memo(Borad);
