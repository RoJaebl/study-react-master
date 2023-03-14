import {
    DragDropContext,
    Draggable,
    DragStart,
    Droppable,
    DropResult,
    ResponderProvided,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, contentState } from "./atoms";
import DropBoard from "./Components/Board/DropBoard";
import { DragArea as BoardDragArea } from "./Components/Board/DragBoard";
import { useState } from "react";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    align-items: center;
    height: 100vh;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: auto;
`;
const BoardTrash = styled.div`
    position: fixed;
    top: 93%;
    left: 50%;
    transform: translate(-50%);
    max-width: 480px;
    height: 300px;
    width: 100%;
    border-radius: 20px;
    background-color: #dadfe9;
    transition: 0.2s all ease-in;
    &:hover {
        top: 85%;
    }
`;
const DropArea = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 20px;
`;
const Form = styled.form`
    position: fixed;
    z-index: 1;
    top: 20px;
    left: 20px;
    display: flex;
`;
const Input = styled.input`
    font-size: 1.3em;
    font-weight: 400;
    font-family: inherit;
    width: 200px;
    height: 30px;
    margin-right: 20px;
`;
const Button = styled.button`
    width: 30px;
    height: 30px;
`;
interface IForm {
    board: string;
}
function App() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const [boards, setBoards] = useRecoilState(boardState);
    const setContents = useSetRecoilState(contentState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onDragEnd = async ({
        destination,
        source,
        draggableId,
        type,
    }: DropResult) => {
        if (!destination || isLoading) return;
        setIsLoading(true);
        if (
            destination.droppableId === source.droppableId &&
            type === "CONTENTS"
        ) {
            setContents((allContents) => {
                const cpContents = [...allContents[source.droppableId]];
                const cpContent = { ...cpContents[source.index] };
                cpContents.splice(source.index, 1);
                cpContents.splice(destination.index, 0, cpContent);
                return { ...allContents, [source.droppableId]: cpContents };
            });
        }
        if (
            destination.droppableId !== source.droppableId &&
            type === "CONTENTS"
        ) {
            setContents((allContents) => {
                const cpContents = [...allContents[source.droppableId]];
                const distContents = [...allContents[destination.droppableId]];
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
        if (destination.droppableId === "boardDropId" && type === "BOARDS") {
            setBoards((allBoards) => {
                const cpBoards = [...allBoards[source.droppableId]];
                const cpBoard = { ...cpBoards[source.index] };
                cpBoards.splice(source.index, 1);
                cpBoards.splice(destination.index, 0, cpBoard);
                return { ...allBoards, [source.droppableId]: cpBoards };
            });
        }
        if (destination.droppableId === "trashDropId" && type === "BOARDS") {
            const cpBoards = [...boards[source.droppableId]];
            cpBoards.splice(source.index, 1);
            setBoards({ [source.droppableId]: cpBoards });
            setContents((allContents) => {
                const cpContents = { ...allContents };
                delete cpContents[draggableId];
                return { ...cpContents };
            });
        }
        setTimeout(() => setIsLoading(false), 600);
    };
    const onDragStart = (
        { source }: DragStart,
        provided: ResponderProvided
    ) => {
        // all content focus out
        setContents((allContents) => {
            let newContetns = {};
            const cpContents = { ...allContents };
            const modContents = Object.keys(cpContents).map((key) =>
                cpContents[key].map((content) => ({
                    ...content,
                    modify: false,
                }))
            );
            Object.keys(cpContents).map(
                (key, index) =>
                    (newContetns = {
                        ...newContetns,
                        [key]: modContents[index],
                    })
            );
            return { ...newContetns };
        });
    };
    const onValid = ({ board }: IForm) => {
        const date = Date.now();
        setBoards((allBoards) => {
            const newBoard = [
                ...allBoards["boardDropId"],
                {
                    id: date,
                    name: board,
                    text: board,
                    modify: false,
                    dragId: date + "",
                },
            ];
            return {
                ...allBoards,
                boardDropId: newBoard,
            };
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
                <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                >
                    <DropBoard dropBoardId={"boardDropId"} />
                    <BoardTrash>
                        <Droppable
                            droppableId="trashDropId"
                            type="BOARDS"
                            direction="vertical"
                        >
                            {(trashDrop) => (
                                <DropArea
                                    ref={trashDrop.innerRef}
                                    {...trashDrop.droppableProps}
                                >
                                    <Draggable
                                        key={0}
                                        draggableId={`fakeTrashDragId0`}
                                        index={0}
                                    >
                                        {(trashDrag) => (
                                            <BoardDragArea
                                                ref={trashDrag.innerRef}
                                                {...trashDrag.draggableProps}
                                                {...trashDrag.dragHandleProps}
                                                style={{
                                                    transform:
                                                        "translate(50%, 50%)",
                                                }}
                                            ></BoardDragArea>
                                        )}
                                    </Draggable>
                                    {trashDrop.placeholder}
                                </DropArea>
                            )}
                        </Droppable>
                    </BoardTrash>
                </DragDropContext>
            </Wrapper>
        </>
    );
}

export default App;
