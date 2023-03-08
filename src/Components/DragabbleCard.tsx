import React, { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ICardProps {
    isDragging: boolean;
}
const Card = styled.div<ICardProps>`
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-items: start;
    align-items: stretch;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) =>
        props.isDragging ? "#9fb6d8" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0, 0.5)" : "none"};
`;
const Text = styled.span`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    overflow-y: hidden;
    white-space: pre-wrap;
`;
const Icons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`;
interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}
function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
    const pText = useRef<HTMLSpanElement>(null);
    const onModify = () => {};
    const onTrash = () => {};
    const onBlur = (e: React.FocusEvent<SVGSVGElement>) => {};
    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(drags, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={drags.innerRef}
                    {...drags.draggableProps}
                    {...drags.dragHandleProps}
                >
                    <Text ref={pText}>{toDoText}</Text>
                    <Icons>
                        <FontAwesomeIcon
                            onMouseDown={}
                            onClick={() => onModify()}
                            onBlur={onBlur}
                            icon={faPen}
                        />
                        <FontAwesomeIcon
                            onClick={() => onTrash()}
                            onBlur={onBlur}
                            icon={faTrash}
                        />
                    </Icons>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
