import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CONTENT, contentState } from "../../atoms";
import DragContent from "./DragContent";

const DropArea = styled.div`
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    border-radius: 5px;
`;
interface IDropContentProps {
    dropContentId: string;
}
function DropContent({ dropContentId }: IDropContentProps) {
    const contents = useRecoilValue(contentState);
    return (
        <Droppable droppableId={dropContentId} type={"CONTENTS"}>
            {(dropContent) => (
                <DropArea
                    ref={dropContent.innerRef}
                    {...dropContent.droppableProps}
                >
                    {contents[CONTENT][dropContentId].map((content, index) => (
                        <DragContent
                            key={content.id}
                            contents={contents[CONTENT][dropContentId]}
                            dropContentId={dropContentId}
                            dragContentId={content.dragId}
                            index={index}
                        />
                    ))}
                    {dropContent.placeholder}
                </DropArea>
            )}
        </Droppable>
    );
}
export default DropContent;
