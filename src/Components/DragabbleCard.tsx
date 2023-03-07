import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
    isDragging: boolean;
}
const Card = styled.div<ICardProps>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) =>
        props.isDragging ? "#9fb6d8" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0, 0.5)" : "none"};
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}
function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(drags, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={drags.innerRef}
                    {...drags.draggableProps}
                    {...drags.dragHandleProps}
                >
                    {toDoText}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
