import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, contentState, IDnD } from "./atoms";
import DropBoard from "./Components/Board/DropBoard";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    align-items: center;
    height: 100vh;
    overflow: scroll;
    overflow-y: hidden;
`;
const Form = styled.form`
    position: fixed;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    display: flex;
`;

const Input = styled.input``;
const Button = styled.button``;
interface IForm {
    board: string;
}
function App() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const setBoards = useSetRecoilState(boardState);
    const setContents = useSetRecoilState(contentState);
    const onDragEnd = ({
        destination,
        source,
        draggableId,
        type,
    }: DropResult) => {
        console.log(destination, source, draggableId);
        if (!destination) return;
        if (type === "CONTENTS") {
            if (destination.droppableId === source.droppableId) {
                setContents((allContents) => {
                    const cpContents = [...allContents[source.droppableId]];
                    const cpContent = { ...cpContents[source.index] };
                    cpContents.splice(source.index, 1);
                    cpContents.splice(destination.index, 0, cpContent);
                    return { ...allContents, [source.droppableId]: cpContents };
                });
            }
            if (destination.droppableId !== source.droppableId) {
                setContents((allContents) => {
                    const cpContents = [...allContents[source.droppableId]];
                    const distContents = [
                        ...allContents[destination.droppableId],
                    ];
                    const cpContent = { ...cpContents[source.index] };
                    cpContents.splice(source.index, 1);
                    distContents.splice(destination.index, 0, cpContent);
                    return {
                        ...allContents,
                        [source.droppableId]: cpContents,
                        [destination.droppableId]: distContents,
                    };
                });
            }
        }
        if (type === "BOARDS") {
            if (destination.droppableId === source.droppableId) {
                setBoards((allBoards) => {
                    const cpBoards = [...allBoards];
                    const cpBoard = { ...cpBoards[source.index] };
                    cpBoards.splice(source.index, 1);
                    cpBoards.splice(destination.index, 0, cpBoard);
                    return [...cpBoards];
                });
            }
        }
        // const toDo = boards[source.droppableId].find(
        //     (toDo) => toDo.id === +draggableId
        // );
        // if (!destination || typeof toDo === "undefined") return;
        // localStorage.setItem("boards", "{id: 1, text: hello}");
        // JSON.parse(localStorage.getItem("boards") ?? "{}");
        //     if (!destination) return;
        //     if (destination.droppableId === source.droppableId) {
        //         setBoards((allBoards) => {
        //             const cloneBoard = [...allBoards[source.droppableId]];
        //             const toDo = cloneBoard[source.index];
        //             cloneBoard.splice(source.index, 1);
        //             cloneBoard.splice(destination.index, 0, toDo);
        //             return {
        //                 ...allBoards,
        //                 [source.droppableId]: cloneBoard,
        //             };
        //         });
        //     }
        //     if (destination.droppableId !== source.droppableId) {
        //         setToDos((allBoards) => {
        //             const cloneBoard = [...allBoards[source.droppableId]];
        //             const targetBoard = [...allBoards[destination.droppableId]];
        //             const toDo = cloneBoard[source.index];
        //             cloneBoard.splice(source.index, 1);
        //             targetBoard.splice(destination.index, 0, toDo);
        //             return {
        //                 ...allBoards,
        //                 [destination.droppableId]: targetBoard,
        //                 [source.droppableId]: cloneBoard,
        //             };
        //         });
        //     }
    };
    // const onDragStart = (
    //     { source: { droppableId, index } }: DragStart,
    //     provided: ResponderProvided
    // ) => {
    //     setBoards((allBoards) => {
    //         const cloneBoard = [...allBoards[droppableId]];
    //         const cloneToDo = { ...cloneBoard[index] };
    //         cloneToDo.modify = false;
    //         cloneBoard.splice(index, 1);
    //         cloneBoard.splice(index, 0, cloneToDo);
    //         return {
    //             ...allBoards,
    //             [droppableId]: cloneBoard,
    //         };
    //     });
    // };
    const onValid = ({ board }: IForm) => {
        const date = Date.now();
        setBoards((allBoards) => {
            const newBoard = {
                id: date,
                name: board,
                text: board,
                modify: false,
                dropId: "boardDropId",
                dragId: date + "",
            };
            return [newBoard, ...allBoards];
        });
        setContents((allContents) => ({
            ...allContents,
            [date + ""]: [],
        }));
        setValue("board", "");
    };
    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input {...register("board")} type="text" />
                <Button>+</Button>
            </Form>
            <Wrapper>
                <DragDropContext onDragEnd={onDragEnd}>
                    <DropBoard />
                </DragDropContext>
            </Wrapper>
        </>
    );
}

export default App;
