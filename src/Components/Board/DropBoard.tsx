import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState } from "../../atoms";
import DragBoard from "./DragBoard";

const DropArea = styled.div`
    display: flex;
    height: 400px;
    margin: 0 10px 0 10px;
    background-color: ${(props) => props.theme.bgColor};
`;
interface IDropBoardProps {
    dropBoardId: string;
}
function DropBoard({ dropBoardId }: IDropBoardProps) {
    const boards = useRecoilValue(boardState);
    return (
        <Droppable
            droppableId={dropBoardId}
            direction="horizontal"
            type={"BOARDS"}
        >
            {(boardDrop) => (
                <DropArea
                    ref={boardDrop.innerRef}
                    {...boardDrop.droppableProps}
                >
                    {boards[dropBoardId].map((board, index) => (
                        <DragBoard
                            key={board.dragId}
                            dropBoardId={dropBoardId}
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
