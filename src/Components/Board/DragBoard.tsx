import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { boardState, contentState } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import DropContent from "../Content/DropContent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";

export const DragArea = styled.div`
    width: 200px;
    height: 400px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 1fr 40px;
    gap: 5px;
    margin: 0 10px 0 10px;
    padding: 20px 5px 5px 5px;
`;
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: 600;
    font-size: 1.5em;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
`;

const BoardNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 5px;
`;
interface IDragBoardProps {
    dropBoardId: string;
    dragBoardId: string;
    index: number;
}
function DragBoard({ dropBoardId, dragBoardId, index }: IDragBoardProps) {
    const boards = useRecoilValue(boardState);
    const setContents = useSetRecoilState(contentState);
    const createContent = () => {
        setContents((allContents) => {
            const cpContent = [...allContents[dragBoardId]];
            const newContent = {
                id: Date.now(),
                name: "",
                text: "",
                modify: true,
                dropId: dragBoardId,
                dragId: Date.now() + "",
            };
            return {
                ...allContents,
                [dragBoardId]: [newContent, ...cpContent],
            };
        });
    };
    const allTrash = () =>
        setContents((allContents) => ({
            ...allContents,
            [dragBoardId]: [],
        }));
    return (
        <Draggable draggableId={dragBoardId} index={index}>
            {(boardDrag) => (
                <DragArea
                    ref={boardDrag.innerRef}
                    {...boardDrag.draggableProps}
                    {...boardDrag.dragHandleProps}
                >
                    <Title>{boards[dropBoardId][index].name}</Title>
                    <DropContent dropContentId={dragBoardId} />
                    <BoardNav>
                        <div></div>
                        <div>
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#337ea9",
                                    marginRight: "5px",
                                }}
                                icon={faSquarePlus}
                                onClick={createContent}
                            />
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#337ea9",
                                    marginRight: "5px",
                                }}
                                onClick={allTrash}
                                icon={faTrash}
                            />
                        </div>
                    </BoardNav>
                </DragArea>
            )}
        </Draggable>
    );
}

export default React.memo(DragBoard);
