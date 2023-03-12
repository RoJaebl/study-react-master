import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DropArea = styled.div``;
interface IDropContentProps {
    content: {
        id: number;
        index: number;
        text: string;
        modify: boolean;
    };
}
function DropContent({
    content: { id, index, text, modify },
}: IDropContentProps) {
    useEffect(() => console.log(1234 + "-" + 5678), []);
    return (
        <Droppable droppableId={id + "" + index}>
            {(dropContent) => (
                <DropArea
                    ref={dropContent.innerRef}
                    {...dropContent.droppableProps}
                >
                    {dropContent.placeholder}
                </DropArea>
            )}
        </Droppable>
    );
}
export default DropContent;
