import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

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
    gap: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, source }: DropResult) => {
        // if (destination) {
        //     setToDos((current) => {
        //         const cloneToDos = [...current];
        //         cloneToDos.splice(
        //             destination.index,
        //             0,
        //             ...cloneToDos.splice(source.index, 1)
        //         );
        //         return cloneToDos;
        //     });
        // }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board
                            boardId={boardId}
                            key={boardId}
                            toDos={toDos[boardId]}
                        />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
