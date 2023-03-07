import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

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
interface IBoardProps {
    toDos: string[];
    boardId: string;
}
function Borad({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
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
                        {toDos.map((toDo, idx) => (
                            <DragabbleCard
                                key={toDo}
                                index={idx}
                                toDo={toDo}
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
