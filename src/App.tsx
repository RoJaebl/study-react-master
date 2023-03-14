import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BOARD, CONTENT, contentState, IBoardConent } from "./atoms";
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
    const setContents = useSetRecoilState(contentState);
    const onDragEnd = ({
        destination,
        source,
        draggableId,
        type,
    }: DropResult) => {
        if (!destination) return;
        if (type === "CONTENTS") {
            if (destination.droppableId === source.droppableId) {
                setContents((allContents) => {
                    let cpContents = { ...allContents[CONTENT] };
                    const cpContent = [...cpContents[source.droppableId]];
                    const cpValue = { ...cpContent[source.index] };
                    cpContent.splice(source.index, 1);
                    cpContent.splice(destination.index, 0, cpValue);
                    cpContents = {
                        ...cpContents,
                        [source.droppableId]: cpContent,
                    };
                    return {
                        ...allContents,
                        [CONTENT]: cpContents,
                    };
                });
            }
            if (destination.droppableId !== source.droppableId) {
                setContents((allContents) => {
                    let cpContents = { ...allContents[CONTENT] };
                    const cpContent = [...cpContents[source.droppableId]];
                    const distContents = [
                        ...cpContents[destination.droppableId],
                    ];
                    const cpValue = { ...cpContent[source.index] };
                    cpContent.splice(source.index, 1);
                    distContents.splice(destination.index, 0, cpValue);
                    cpContents = {
                        ...cpContents,
                        [source.droppableId]: cpContent,
                        [destination.droppableId]: distContents,
                    };
                    return {
                        ...allContents,
                        [CONTENT]: cpContents,
                    };
                });
            }
        }
        if (type === "BOARDS") {
            if (destination.droppableId === source.droppableId) {
                setContents((allContents) => {
                    let cpContents = { ...allContents[BOARD] };
                    const cpContent = [...cpContents[`${source.droppableId}`]];
                    const cpValue = { ...cpContent[source.index] };
                    cpContent.splice(source.index, 1);
                    cpContent.splice(destination.index, 0, cpValue);
                    cpContents = {
                        ...cpContents,
                        [source.droppableId]: cpContent,
                    };
                    return {
                        ...allContents,
                        [BOARD]: cpContents,
                    };
                });
            }
        }
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
        setContents((allContents) => {
            const newBoard = [
                ...allContents[BOARD]["boardContent"],
                {
                    id: date,
                    name: board,
                    text: board,
                    modify: false,
                    dragId: date + "",
                },
            ];
            const newContent = { ...allContents[CONTENT], [`${date}`]: [] };
            return {
                ...allContents,
                [BOARD]: {
                    boardContent: newBoard,
                },
                [CONTENT]: newContent,
            };
        });
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
