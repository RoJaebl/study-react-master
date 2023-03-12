import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const DragArea = styled.div``;
interface IDragContentProps {
    content: {
        id: number;
        index: number;
        text: string;
        modify: boolean;
    };
}
function DragContent({
    content: { id, index, text, modify },
}: IDragContentProps) {
    return (
        <Draggable draggableId={text} index={index}>
            {(dragContent) => (
                <DragArea
                    ref={dragContent.innerRef}
                    {...dragContent.draggableProps}
                    {...dragContent.dragHandleProps}
                ></DragArea>
            )}
        </Draggable>
    );
}
export default DragContent;
