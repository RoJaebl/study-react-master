// import React from "react";
// import { Draggable, Droppable } from "react-beautiful-dnd";
// import styled from "styled-components";
// import DraggableCard from "./DraggableCard";
// import { useForm } from "react-hook-form";
// import { IContent, boardState } from "../atoms";
// import { useRecoilState } from "recoil";

import { IContent } from "../atoms";

// const Title = styled.h2`
//     text-align: center;
//     font-weight: 600;
//     margin-bottom: 10px;
//     font-size: 18px;
// `;
// const Wrapper = styled.div`
//     width: 200px;
//     height: 400px;
//     padding-top: 10px;
//     background-color: ${(props) => props.theme.boardColor};
//     border-radius: 5px;
//     margin: 0px 10px;
//     display: flex;
//     flex-direction: column;
// `;
// interface IAraeProps {
//     isDraggingOver: boolean;
//     draggingFromThisWith: boolean;
// }
// const Area = styled.div<IAraeProps>`
//     background-color: ${(props) =>
//         props.isDraggingOver
//             ? "#4f81bd"
//             : props.draggingFromThisWith
//             ? "pink"
//             : "inhert"};
//     height: 100%;
//     transition: background-color 0.3s ease-in-out;
//     padding: 20px 10px 10px 10px;
//     border-radius: 5px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     overflow-y: hidden;
// `;
// const AllDelete = styled.button`
//     height: 40px;
//     align-self: flex-end;
// `;
// const Form = styled.form`
//     width: 100%;
//     input {
//         width: 100%;
//     }
// `;
// const CardWrapper = styled.div`
//     height: 100%;
//     overflow: auto;
//     margin-bottom: 5px;
//     ::-webkit-scrollbar {
//         display: none;
//     }
// `;

interface IBoardProps {
    toDos: IContent[];
    boardId: string;
}
// interface IForm {
//     toDo: string;
// }
function DraggableBoard({ toDos, boardId }: IBoardProps) {
    //     const [toDo, setToDo] = useRecoilState(boardState);
    //     const { register, setValue, handleSubmit } = useForm<IForm>();
    //     const onValid = ({ toDo }: IForm) => {
    //         const newToDo = {
    //             id: Date.now(),
    //             text: toDo,
    //             modify: false,
    //         };
    //         setToDo((allBoards) => {
    //             return {
    //                 ...allBoards,
    //                 [boardId]: [newToDo, ...allBoards[boardId]],
    //             };
    //         });
    //         setValue("toDo", "");
    //     };
    //     const allDeleteContent = () => {
    //         setToDo((allBoards) => {
    //             return {
    //                 ...allBoards,
    //                 [boardId]: [],
    //             };
    //         });
    //     };
    //     return (
    //         <Draggable key="1" draggableId={boardId} index={1}>
    //             {(drags) => (
    //                 <Wrapper
    //                     ref={drags.innerRef}
    //                     {...drags.draggableProps}
    //                     {...drags.dragHandleProps}
    //                 >
    //                     <Title>{boardId}</Title>
    //                     <Form onSubmit={handleSubmit(onValid)}>
    //                         <input
    //                             {...register("toDo", { required: true })}
    //                             type="text"
    //                             placeholder="Add task on Doing"
    //                         />
    //                     </Form>
    //                     <Droppable droppableId={boardId}>
    //                         {(drops, snapshot) => (
    //                             <Area
    //                                 isDraggingOver={snapshot.isDraggingOver}
    //                                 draggingFromThisWith={Boolean(
    //                                     snapshot.draggingFromThisWith
    //                                 )}
    //                                 ref={drops.innerRef}
    //                                 {...drops.droppableProps}
    //                             >
    //                                 <CardWrapper>
    //                                     {toDos.map((toDo, index) => (
    //                                         <DraggableCard
    //                                             key={toDo.id}
    //                                             index={index}
    //                                             toDo={toDo}
    //                                             boardId={boardId}
    //                                         ></DraggableCard>
    //                                     ))}
    //                                 </CardWrapper>
    //                                 <AllDelete
    //                                     onClick={() => allDeleteContent()}
    //                                     style={{
    //                                         display: `${
    //                                             toDo[boardId].length !== 0
    //                                                 ? "inherit"
    //                                                 : "none"
    //                                         }`,
    //                                     }}
    //                                 >
    //                                     {"Delete"}
    //                                 </AllDelete>
    //                             </Area>
    //                         )}
    //                     </Droppable>
    //                 </Wrapper>
    //             )}
    //         </Draggable>
    //     );
}
export default DraggableBoard;
// export default React.memo(DraggableBoard);
