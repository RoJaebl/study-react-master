import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IContent } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const DragArea = styled.div`
    width: 200px;
    height: 400px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 1fr 40px;
    gap: 5px;
    margin: 0 10px 0 10px;
    padding: 20px 5px 5px 5px;
`;
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: 600;
    font-size: 1.5em;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    border-radius: 5px;
`;
const ContentItem = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    justify-items: start;
    align-items: stretch;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.bgColor};
`;
const BoardNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 5px;
`;
interface IDropBoardProps {
    board: {
        id: number;
        name: string;
        index: number;
        contents: IContent[];
    };
}
function DragBoard({ board: { id, name, index, contents } }: IDropBoardProps) {
    return (
        <Draggable key={id} draggableId={id + ""} index={index}>
            {(boardDrag) => (
                <DragArea
                    ref={boardDrag.innerRef}
                    {...boardDrag.draggableProps}
                    {...boardDrag.dragHandleProps}
                >
                    <Title>{name}</Title>
                    <Content>
                        {contents.map((content, index) => (
                            <ContentItem></ContentItem>
                        ))}
                    </Content>
                    <BoardNav>
                        <div></div>
                        <div>
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#006cbe",
                                    marginRight: "5px",
                                }}
                                icon={faSquarePlus}
                            />
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#006cbe",
                                    marginRight: "5px",
                                }}
                                icon={faTrash}
                            />
                        </div>
                    </BoardNav>
                </DragArea>
            )}
        </Draggable>
    );
}

export default DragBoard;
