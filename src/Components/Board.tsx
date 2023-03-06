import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}
function Borad({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(drops) => (
                <Wrapper ref={drops.innerRef} {...drops.droppableProps}>
                    {toDos.map((toDo, idx) => (
                        <DragabbleCard
                            key={toDo}
                            index={idx}
                            toDo={toDo}
                        ></DragabbleCard>
                    ))}
                    {drops.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}
export default React.memo(Borad);
