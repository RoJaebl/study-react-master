import React, { useRef, useState } from "react";
import { Draggable, DraggableRubric } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IBoardKey, IToDo } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface ICardProps {
    isDragging: boolean;
}
const Card = styled.div<ICardProps>`
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
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
    height: 16px;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    overflow-y: hidden;
    white-space: pre-wrap;
    font-size: 1em;
`;
const TextInput = styled(Text)`
    border: 0;
    text-decoration: none;
    font-family: inherit;
    padding: 0px;
    :focus {
        outline: 0;
    }
`;
interface IDragabbleCardProps {
    toDo: IToDo;
    index: number;
    boardId: IBoardKey;
}
function DragabbleCard({ index, toDo, boardId }: IDragabbleCardProps) {
    const pText = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");
    const setToDos = useSetRecoilState(toDoState);
    const onModify = () => {
        setToDos((allBoards) => {
            const cloneBoard = [...allBoards[boardId]];
            const cloneToDo = { ...cloneBoard[index] };
            cloneToDo.isModify = !cloneToDo.isModify;
            cloneBoard.splice(index, 1);
            cloneBoard.splice(index, 0, cloneToDo);
            return {
                ...allBoards,
                [boardId]: cloneBoard,
            };
        });
        setTimeout(() => {
            pText.current?.focus();
        }, 10);
    };
    const onTrash = () => {};
    const onCancel = () => {
        setToDos((allBoards) => {
            const cloneBoard = [...allBoards[boardId]];
            const cloneToDo = { ...cloneBoard[index] };
            cloneToDo.isModify = false;
            cloneBoard.splice(index, 1);
            cloneBoard.splice(index, 0, cloneToDo);
            return {
                ...allBoards,
                [boardId]: cloneBoard,
            };
        });
        setText("");
    };
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e);
        onCancel();
    };
    const onBlur = (e: React.FormEvent<HTMLInputElement>) => onCancel();
    const onChange = (e: React.FormEvent<HTMLInputElement>) =>
        setText(e.currentTarget.value);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToDos((allBoards) => {
            const cloneBoard = [...allBoards[boardId]];
            const cloneToDo = { ...cloneBoard[index] };
            cloneToDo.text = text;
            cloneBoard.splice(index, 1);
            cloneBoard.splice(index, 0, cloneToDo);
            return {
                ...allBoards,
                [boardId]: cloneBoard,
            };
        });
        onCancel();
    };
    return (
        <Draggable key={toDo.id} draggableId={toDo.id + ""} index={index}>
            {(drags, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={drags.innerRef}
                    {...drags.draggableProps}
                    {...drags.dragHandleProps}
                    onBlur={() => console.log("Card Clicked")}
                >
                    <form
                        onSubmit={onSubmit}
                        style={{
                            display: `${toDo.isModify ? "inherit" : "none"}`,
                        }}
                    >
                        <TextInput
                            as="input"
                            type="text"
                            ref={pText}
                            placeholder={toDo.text}
                            onBlur={onBlur}
                            value={text}
                            onChange={onChange}
                        />
                    </form>
                    <Text
                        style={{
                            display: `${!toDo.isModify ? "inherit" : "none"}`,
                        }}
                    >
                        {toDo.text}
                    </Text>
                    <FontAwesomeIcon onClick={() => onModify()} icon={faPen} />
                    <FontAwesomeIcon onClick={() => onTrash()} icon={faTrash} />
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
