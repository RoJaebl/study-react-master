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
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    margin: 0px 10px;
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
                {(drops) => (
                    <div ref={drops.innerRef} {...drops.droppableProps}>
                        {toDos.map((toDo, idx) => (
                            <DragabbleCard
                                key={toDo}
                                index={idx}
                                toDo={toDo}
                            ></DragabbleCard>
                        ))}
                        {drops.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default React.memo(Borad);
