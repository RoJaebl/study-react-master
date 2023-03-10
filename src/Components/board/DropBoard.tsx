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

function DropBoard() {
    const boards = useRecoilValue(boardState);
    return (
        <Droppable droppableId="boardDrop" direction="horizontal">
            {(boardDrop) => (
                <DropArea
                    ref={boardDrop.innerRef}
                    {...boardDrop.droppableProps}
                >
                    {boards.map((board, index) => (
                        <DragBoard
                            key={board.id}
                            board={{
                                id: board.id,
                                index: index,
                                name: board.name,
                                contents: board.contents,
                            }}
                        ></DragBoard>
                    ))}
                    {boardDrop.placeholder}
                </DropArea>
            )}
        </Droppable>
    );
}

export default DropBoard;
