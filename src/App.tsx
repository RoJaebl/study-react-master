import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
        // const toDo = toDos[source.droppableId].find(
        //     (toDo) => toDo.id === +draggableId
        // );
        // if (!destination || typeof toDo === "undefined") return;
        // localStorage.setItem("toDos", "{id: 1, text: hello}");
        // JSON.parse(localStorage.getItem("toDos") ?? "{}");
        if (!destination) return;
        if (destination.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const cloneBoard = [...allBoards[source.droppableId]];
                const toDo = cloneBoard[source.index];
                cloneBoard.splice(source.index, 1);
                cloneBoard.splice(destination.index, 0, toDo);
                return {
                    ...allBoards,
                    [source.droppableId]: cloneBoard,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            setToDos((allBoards) => {
                const cloneBoard = [...allBoards[source.droppableId]];
                const targetBoard = [...allBoards[destination.droppableId]];
                const toDo = cloneBoard[source.index];
                cloneBoard.splice(source.index, 1);
                targetBoard.splice(destination.index, 0, toDo);
                return {
                    ...allBoards,
                    [destination.droppableId]: targetBoard,
                    [source.droppableId]: cloneBoard,
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                {Object.keys(toDos).map((boardId) => (
                    <Board
                        boardId={boardId}
                        key={boardId}
                        toDos={toDos[boardId]}
                    />
                ))}
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
