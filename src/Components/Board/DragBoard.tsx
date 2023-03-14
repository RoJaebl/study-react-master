import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BOARD, CONTENT, contentState, IContent } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import DropContent from "../Content/DropContent";
import { useRecoilState, useSetRecoilState } from "recoil";

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

const BoardNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 5px;
`;
interface IDragBoardProps {
    dragBoardId: string;
    index: number;
}
function DragBoard({ dragBoardId, index }: IDragBoardProps) {
    const [contents, setContents] = useRecoilState(contentState);
    const createContent = () => {
        const date = Date.now();
        setContents((allContents) => {
            let cpContents = { ...allContents[CONTENT] };
            const cpContent = [...cpContents[dragBoardId]];
            const newContent = {
                id: date,
                name: "",
                text: "",
                modify: true,
                dragId: date + "",
            };
            cpContent.push(newContent);
            cpContents = { ...cpContents, [dragBoardId]: cpContent };
            return {
                ...allContents,
                [CONTENT]: cpContents,
            };
        });
    };
    const allTrash = () => {
        setContents((allContents) => {
            let cpContents = { ...allContents[CONTENT] };
            cpContents = { ...cpContents, [dragBoardId]: [] };
            return {
                ...allContents,
                [CONTENT]: cpContents,
            };
        });
    };
    return (
        <Draggable draggableId={dragBoardId} index={index}>
            {(boardDrag) => (
                <DragArea
                    ref={boardDrag.innerRef}
                    {...boardDrag.draggableProps}
                    {...boardDrag.dragHandleProps}
                >
                    <Title>{contents[BOARD].boardContent[index].name}</Title>
                    <DropContent dropContentId={dragBoardId} />
                    <BoardNav>
                        <div></div>
                        <div>
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#337ea9",
                                    marginRight: "5px",
                                }}
                                icon={faSquarePlus}
                                onClick={createContent}
                            />
                            <FontAwesomeIcon
                                style={{
                                    fontSize: "32px",
                                    color: "#337ea9",
                                    marginRight: "5px",
                                }}
                                onClick={allTrash}
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
