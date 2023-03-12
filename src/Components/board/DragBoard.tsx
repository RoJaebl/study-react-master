import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { boardState, IContent } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import DropContent from "../Content/DropContent";
import React from "react";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const DragArea = styled.div`
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
const Content = styled.div`
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    border-radius: 5px;
`;
const ContentItem = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    justify-items: start;
    align-items: stretch;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.bgColor};
`;
const BoardNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 5px;
`;
interface IDragBoardProps {
    board: {
        id: number;
        name: string;
        index: number;
        contents: IContent[];
    };
}
function DragBoard({ board: { id, name, index, contents } }: IDragBoardProps) {
    const [boards, setBoards] = useRecoilState(boardState);
    const createContent = () => {
        setBoards((allBorads) => {
            let cloneBoard = { ...allBorads[index] };
            const newContent: IContent = {
                id: Date.now(),
                text: Date.now() + "",
                modify: true,
            };
            cloneBoard.contents = [newContent, ...cloneBoard.contents];
            const head = allBorads.slice(0, index);
            const tail = allBorads.slice(index + 1);
            return [...head, cloneBoard, ...tail];
        });
    };
    return (
        <Draggable key={id} draggableId={id + ""} index={index}>
            {(boardDrag) => (
                <DragArea
                    ref={boardDrag.innerRef}
                    {...boardDrag.draggableProps}
                    {...boardDrag.dragHandleProps}
                >
                    <Title>{name}</Title>
                    <Content>
                        {contents.map((content, index) => (
                            <DropContent
                                key={content.id}
                                content={{
                                    id: content.id,
                                    index: index,
                                    text: content.text,
                                    modify: content.modify,
                                }}
                            />
                        ))}
                    </Content>
                    <BoardNav>
                        <div></div>
                        <div>
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#006cbe",
                                    marginRight: "5px",
                                }}
                                icon={faSquarePlus}
                                onClick={() => createContent()}
                            />
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#006cbe",
                                    marginRight: "5px",
                                }}
                                icon={faTrash}
                            />
                        </div>
                    </BoardNav>
                </DragArea>
            )}
        </Draggable>
    );
}

export default DragBoard;
