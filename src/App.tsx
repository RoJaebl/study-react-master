import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";

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

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, source }: DropResult) => {
        if (destination) {
            setToDos((current) => {
                const cloneToDos = [...current];
                cloneToDos.splice(
                    destination.index,
                    0,
                    ...cloneToDos.splice(source.index, 1)
                );
                return cloneToDos;
            });
        }
    };
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
                                    <DragabbleCard
                                        key={toDo}
                                        index={idx}
                                        toDo={toDo}
                                    ></DragabbleCard>
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
