import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;
const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;
function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = () => {};
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(drops) => (
                            <Board
                                ref={drops.innerRef}
                                {...drops.droppableProps}
                            >
                                {toDos.map((toDo, idx) => (
                                    <Draggable draggableId={toDo} index={idx}>
                                        {(drags) => (
                                            <Card
                                                ref={drags.innerRef}
                                                {...drags.draggableProps}
                                                {...drags.dragHandleProps}
                                            >
                                                {toDo}
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {drops.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
