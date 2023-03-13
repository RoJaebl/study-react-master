import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState, contentState } from "../../atoms";
import DragBoard from "./DragBoard";

const DropArea = styled.div`
    display: flex;
    height: 400px;
    margin: 0 10px 0 10px;
    background-color: ${(props) => props.theme.bgColor};
`;

function DropBoard() {
    const boards = useRecoilValue(boardState);
    return (
        <Droppable
            droppableId="boardDropId"
            direction="horizontal"
            type={"BOARDS"}
        >
            {(boardDrop) => (
                <DropArea
                    ref={boardDrop.innerRef}
                    {...boardDrop.droppableProps}
                >
                    {boards.map((board, index) => (
                        <DragBoard
                            key={board.dragId}
                            dragBoardId={board.dragId}
                            index={index}
                        />
                    ))}
                    {boardDrop.placeholder}
                </DropArea>
            )}
        </Droppable>
    );
}

export default DropBoard;
